import { TRAVELANDZ_API } from "@/adapters/fetch-api/server";
import { SearchTransfersForm } from "@/components";
import { Icons } from "@/icons";
// import { auth } from "@/auth.config";
import { TransfersService } from "@/services";

export default async function Dashboard() {
  // const session = (await auth())!;

  const { iataCodes } = await TransfersService.getAirportCodes(TRAVELANDZ_API);
  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-8 p-8">
      <h1 className="text-3xl font-semibold">
        Encuentra tu traslado ideal en minutos!
      </h1>
      <SearchTransfersForm airportCodes={iataCodes ?? []} />
    </div>
  );
}
