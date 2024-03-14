"use client";

import { useState, useMemo, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  ActionGetHotelCodes,
  ActionGetTransfersAvailability,
} from "@/actions/transfer.actions";
import { useTransferListStore } from "@/stores";
import type {
  HotelCode,
  IATACode,
  TransfersAvailabilityProps,
} from "@/interfaces";
import Swal from "sweetalert2";

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
  const isSearching = useTransferListStore((store) => store.isSearching);
  const setIsSearching = useTransferListStore((store) => store.setIsSearching);
  const setTransferList = useTransferListStore(
    (store) => store.setTransferList
  );
  const [searchingHotels, setSearchingHotels] = useState(false);
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
  const [hotelCodeKeyword, setHotelCodeKeyword] = useState<null | string>(null);
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

  const getHotelCodes = useDebouncedCallback(() => {
    if (hotelCodeKeyword === null) return;
    setSearchingHotels(true);
    ActionGetHotelCodes(formBody.airportCode, hotelCodeKeyword).then(
      (response) => {
        setHotelCodes(response.data);
        setSearchingHotels(false);
      }
    );
  }, 300);

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
    setHotelCodeKeyword(null);
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
      hotelCode: "",
      hotelName: "",
    }));
    resetHotelKeyword();
  };
  const handleOnChangeHotel = (data: HotelCode) => {
    const { code, name } = data;
    resetHotelKeyword();
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
    if (isSearching) return;
    if (!formBody.airportCode) {
      Swal.fire({
        icon: "error",
        title: "Debes seleccionar un aeropuerto",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (!formBody.hotelCode) {
      Swal.fire({
        icon: "error",
        title: "Debes seleccionar un hotel",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (
      formBody.adults === 0 &&
      formBody.children === 0 &&
      formBody.infants === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Debes añadir al menos 1 pasajero",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (formBody.outBound === "") {
      Swal.fire({
        icon: "error",
        title: "Fecha inválida",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (new Date(formBody.outBound + " 23:59").getTime() < Date.now()) {
      Swal.fire({
        icon: "error",
        title: "La fecha de salida no puede ser anterior a la de hoy",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
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
      if (
        new Date(formBody.outBound).getTime() >
        new Date(formBody.inBound).getTime()
      ) {
        Swal.fire({
          icon: "error",
          title: "La fecha de regreso no puede ser anterior a la de salida",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }
      queryData.inBound = new Date(formBody.inBound).toISOString();
    }
    setIsSearching(true);
    const response = await ActionGetTransfersAvailability(queryData);
    setTransferList(response.data);
    setIsSearching(false);
  };

  useEffect(() => {
    if (!formBody.airportCode) return;
    if (hotelCodeKeyword === null || hotelCodeKeyword.length <= 3) return;
    if (hotelCodeKeyword === formBody.hotelName) return;
    getHotelCodes();
  }, [formBody.airportCode, , formBody.hotelName, hotelCodeKeyword]);

  return {
    isSearching,
    searchingHotels,
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
