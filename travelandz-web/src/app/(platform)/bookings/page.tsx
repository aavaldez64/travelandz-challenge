import { TRAVELANDZ_API } from "@/adapters/fetch-api/server";
import { SavedBookingItem } from "@/components";
import { TransfersService } from "@/services";

export default async function BookingsListPage() {
  const { data, currentPage, totalPages } = await TransfersService.getBookings(
    TRAVELANDZ_API,
    {
      fromDate: "",
      toDate: "",
    }
  );

  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-8 p-2 sm:p-8">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center md:text-start">
          Mi agenda:
        </h1>
        <hr />
      </div>
      <ul className="flex flex-col gap-8">
        {data.map((item) => {
          return <SavedBookingItem key={item._id} {...item} />;
        })}
      </ul>
    </div>
  );
}
