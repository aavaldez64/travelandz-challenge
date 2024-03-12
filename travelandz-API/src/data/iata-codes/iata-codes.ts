import fs from "fs";
import { chromium } from "playwright";
import { MongoDatabase } from "../mongodb";
import { envs } from "../../config";
import { IATACodeModel } from "../mongodb/models/iata-codes.model";

interface DataCode {
  cityAirport: string;
  country: string;
  code: string;
}

const SOURCE_URL =
  "https://www.nationsonline.org/oneworld/IATA_Codes/airport_code_list.htm";
const COUNTRY = "Spain";
const EXCLUDED_COUNTRY = "Teneriffa";

class IATACodesBot {
  constructor() {}
  private findCodes = async (): Promise<DataCode[]> => {
    console.log("Searching codes...");
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage({ viewport: null });
    try {
      await page.goto(SOURCE_URL);
      await page.waitForLoadState("networkidle");
      await page.waitForSelector(".border1");
      const results = await page.$eval("body", () => {
        const iataCodesFound: DataCode[] = [];
        const tables = document.querySelectorAll("table");
        tables.forEach(table => {
          const tbody = table.querySelector("tbody");
          if (tbody) {
            const rows = tbody.querySelectorAll("tr");
            rows.forEach(element => {
              const [cityAirportHTML, countryHTML, codeHTML] =
                element.querySelectorAll("td");
              if (cityAirportHTML.getAttribute("colspan") === "3") return;
              const cityAirport = cityAirportHTML?.textContent;
              const country = countryHTML?.textContent;
              const code = codeHTML?.textContent;
              if (!cityAirport || !country || !code) return;
              // if (country.includes(COUNTRY)) {
              iataCodesFound.push({
                cityAirport: cityAirport,
                country: country,
                code: code,
              });
              // }
            });
          }
        });
        return iataCodesFound;
      });
      await browser.close();

      const SpainResults = results.filter(
        element =>
          element.country.includes(COUNTRY) &&
          !element.country.includes(EXCLUDED_COUNTRY),
      );

      console.log("Codes found.");
      return SpainResults;
    } catch (error) {
      await page.screenshot({ path: "screenshot.png" });
      throw error;
    }
  };
  private MongoConnect = async () => {
    await MongoDatabase.connect({
      mongoUri: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
      auth: {
        password: envs.MONGO_PASSWORD,
        username: envs.MONGO_USERNAME,
      },
    });
  };
  private exportJSON = async (iataCodes: DataCode[]) => {
    await new Promise((resolve, reject) => {
      fs.writeFile(
        "./src/data/iata-codes/iata-codes.json",
        JSON.stringify({ iataCodes: iataCodes }),
        err => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log("JSON file exported successfully");
            resolve(true);
          }
        },
      );
    });
  };
  private saveInMongoDatabase = async (iataCodes: DataCode[]) => {
    try {
      await IATACodeModel.deleteMany({});
      await IATACodeModel.insertMany(iataCodes);
      console.log("Codes saved successfully");
      return;
    } catch (error) {
      console.log("Unexpected error");
      throw error;
    }
  };

  testBot = async () => {
    return this.findCodes();
  };
  findAndSaveInMongoDatabase = async () => {
    await this.MongoConnect();
    const iataCodes = await this.findCodes();

    await this.exportJSON(iataCodes);
    await this.saveInMongoDatabase(iataCodes);
  };
  saveAsJson = async () => {
    const iataCodes = await this.findCodes();
    await this.exportJSON(iataCodes);
  };
  seedDatabaseFromJSON = async () => {
    await this.MongoConnect();
    try {
      const dataCodes: { iataCodes: DataCode[] } =
        await require("./iata-codes.json");
      await this.saveInMongoDatabase(dataCodes.iataCodes);
    } catch (error: any) {
      if (error.code === "MODULE_NOT_FOUND") {
        throw new Error(
          "iata-codes.json not found. Please generate running `pnpm iata-codes` script",
        );
      }
      throw error;
    }
  };
}

(async (): Promise<boolean> => {
  const flag = process.argv[2];
  const iataCodesBot = new IATACodesBot();
  if (flag === "--test") {
    console.log("Test mode");
    const codes = await iataCodesBot.testBot();
    console.log(codes);
    return true;
  }

  if (flag === "--mongo") {
    console.log("Save in mongodb mode");
    await iataCodesBot.findAndSaveInMongoDatabase();
    return true;
  }
  if (flag === "--seed") {
    console.log("Seed database mode");
    await iataCodesBot.seedDatabaseFromJSON();
    return true;
  }

  console.log("Save in fs mode");
  await iataCodesBot.saveAsJson();
  return true;
})();
