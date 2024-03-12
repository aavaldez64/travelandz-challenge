"use client";

import { useState, useMemo, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  ActionGetHotelCodes,
  ActionGetTransfersAvailability,
} from "@/actions/transfer.actions";
import { HotelCode, IATACode, TransfersAvailabilityProps } from "@/interfaces";

interface Props {
  airportCodes: IATACode[];
}
enum RouteType {
  airportToHotel = "AIRPORT_TO_HOTEL",
  hotelToAirport = "HOTEL_TO_AIRPORT",
}
interface FormBodyProps {
  airportCode: string;
  airportName: string;
  hotelCode: string;
  hotelName: string;
  outBound: string;
  inBound: string;
  adults: number;
  children: number;
  infants: number;
  routeType: RouteType;
}

export function useSearchTransfersForm() {
  const [formBody, setFormBody] = useState<FormBodyProps>({
    airportCode: "",
    airportName: "",
    hotelCode: "",
    hotelName: "",
    outBound: "",
    inBound: "",
    adults: 0,
    children: 0,
    infants: 0,
    routeType: RouteType.airportToHotel,
  });
  const [hotelCodes, setHotelCodes] = useState<HotelCode[]>([]);
  const [hotelCodeKeyword, setHotelCodeKeyword] = useState("");
  const routeData = useMemo(() => {
    if (formBody.routeType === RouteType.airportToHotel) {
      return {
        fromType: "IATA",
        fromCode: formBody.airportCode,
        fromName: formBody.airportName,
        toType: "ATLAS",
        toCode: formBody.hotelCode,
        toName: formBody.hotelName,
      };
    }
    return {
      fromType: "ATLAS",
      fromCode: formBody.hotelCode,
      fromName: formBody.hotelName,
      toType: "IATA",
      toCode: formBody.airportCode,
      toName: formBody.airportName,
    };
  }, [
    formBody.routeType,
    formBody.airportCode,
    formBody.airportName,
    formBody.hotelCode,
    formBody.hotelName,
  ]);

  const getHotelCodes = useDebouncedCallback(async () => {
    const hotelCodesResponse = await ActionGetHotelCodes(
      formBody.airportCode,
      hotelCodeKeyword
    );
    setHotelCodes(hotelCodesResponse.data);
  }, 400);

  const InterchangeRouteType = () => {
    if (formBody.routeType === RouteType.airportToHotel) {
      setFormBody({ ...formBody, routeType: RouteType.hotelToAirport });
    } else {
      setFormBody({ ...formBody, routeType: RouteType.airportToHotel });
    }
  };

  const handleOnChangeHotelKeyword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setHotelCodeKeyword(event.target.value);
  };
  const resetHotelKeyword = () => {
    setHotelCodeKeyword(formBody.hotelName);
  };
  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormBody((prev) => ({ ...prev, [name]: value }));
  };
  const handleOnChangeAirport = (data: IATACode) => {
    const { cityAirport, code } = data;
    setFormBody((prev) => ({
      ...prev,
      airportCode: code,
      airportName: cityAirport,
    }));
  };
  const handleOnChangeHotel = (data: HotelCode) => {
    const { code, name } = data;
    setHotelCodeKeyword(name);
    setFormBody((prev) => ({
      ...prev,
      hotelCode: code,
      hotelName: name,
    }));
    setHotelCodes([]);
  };
  const handleOnChangePassengers = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    if (+value > 10) return;
    if (+value < 0) return;
    setFormBody((prev) => ({ ...prev, [name]: +value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const queryData: TransfersAvailabilityProps = {
      fromType: routeData.fromType,
      fromCode: routeData.fromCode,
      toType: routeData.toType,
      toCode: routeData.toCode,

      outBound: new Date(formBody.outBound).toISOString(),
      // inBound: new Date(formBody.inBound).toISOString(),
      adults: formBody.adults,
      children: formBody.children,
      infants: formBody.infants,
    };
    if (formBody.inBound) {
      queryData.inBound = new Date(formBody.inBound).toISOString();
    }
    // console.log(queryData);
    const response = await ActionGetTransfersAvailability(queryData);
    console.log(response);
  };

  useEffect(() => {
    if (!formBody.airportCode) return;
    if (hotelCodeKeyword.length <= 3) return;
    if (hotelCodeKeyword === formBody.hotelName) return;
    getHotelCodes();
  }, [formBody.airportCode, , formBody.hotelName, hotelCodeKeyword]);
  return {
    formBody,
    hotelCodes,
    hotelCodeKeyword,
    routeData,
    InterchangeRouteType,
    handleOnChangeHotelKeyword,
    resetHotelKeyword,
    handleOnChange,
    handleOnChangeAirport,
    handleOnChangeHotel,
    handleOnChangePassengers,
    handleSubmit,
  };
}
