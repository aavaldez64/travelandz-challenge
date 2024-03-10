import mongoose from "mongoose";

interface Options {
  mongoUri: string;
  dbName: string;
  auth: {
    username: string;
    password: string;
  };
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { mongoUri, dbName, auth } = options;
    try {
      await mongoose.connect(mongoUri, {
        dbName: dbName,
        auth: auth,
      });
      console.log("Mongo database connected");
    } catch (error) {
      console.error("Mongo databace connection failed");
      throw error;
    }
  }
}
