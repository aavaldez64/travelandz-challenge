import { TRAVELANDZ_API } from "@/adapters/fetch-api/server";
import { SearchTransfersForm, SearchTransfersResults } from "@/components";
import { TransfersService } from "@/services";

export default async function Dashboard() {
  const { iataCodes } = await TransfersService.getAirportCodes(TRAVELANDZ_API);
  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-8 p-2 sm:p-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center md:text-start">
        Encuentra tu traslado ideal en minutos!
      </h1>
      <SearchTransfersForm airportCodes={iataCodes ?? []} />
      <SearchTransfersResults />
    </div>
  );
}
