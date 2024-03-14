"use client";

import { ActionCancelBook } from "@/actions/transfer.actions";
import { BookingListItem } from "@/interfaces";
import { useMemo } from "react";
import Swal from "sweetalert2";

export function SavedBookingItem(props: BookingListItem) {
  const transfer = props.transfers[0]!;
  const image = useMemo(() => {
    return (
      transfer.content.images.find((img: any) => img.type === "MEDIUM") ||
      transfer.content.images[0]
    );
  }, [transfer.content.images.length]);

  const { passengers, bags, duration } = useMemo(() => {
    const passengers: string[] = [];
    const duration = transfer.content.transferDetailInfo.find((item: any) =>
      item.name.includes("Duracion estimada")
    )?.description;
    const bags = transfer.content.transferDetailInfo.find((item: any) =>
      item.name.includes("maletas")
    )?.description;
    const minPassengers = transfer.content.transferDetailInfo.find(
      (item: any) => item.name.includes("pasajero(s) minimo")
    );
    const maxPassengers = transfer.content.transferDetailInfo.find(
      (item: any) => item.name.includes("pasajero(s) maximo")
    );
    if (minPassengers) passengers.push(minPassengers.description);
    if (maxPassengers) passengers.push(maxPassengers.description);
    return {
      duration,
      bags,
      passengers: passengers.join(" - "),
    };
  }, [transfer.content.transferDetailInfo.length]);

  const requestCancelBooking = async () => {
    const result = await Swal.fire({
      icon: "question",
      title: `¿Desea cancelar el traslado reservado?`,
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      Swal.fire({
        didOpen: () => Swal.showLoading(),
      });
      const response = await ActionCancelBook(props.reference);
      if (response.ok) {
        Swal.fire({
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: response.data?.message || "Unknown error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    // <li className="flex items-center justify-between p-4 sm:p-8 shadow-lg shadow-black/20 rounded-xl clickable">
    <li className="flex flex-col lg:flex-row items-center lg:justify-between p-4 sm:p-8 shadow-lg shadow-black/20 rounded-xl">
      <div className="flex flex-col gap-4">
        <p>
          <strong>Estado:</strong>{" "}
          {props.status === "CANCELLED" ? (
            <span className="text-red-500 font-bold">Cancelado</span>
          ) : (
            <span className="text-green-500 font-bold">Confirmado</span>
          )}
        </p>
        <p>
          <strong>Salida:</strong>{" "}
          {new Date(
            `${transfer.pickupInformation.date} ${transfer.pickupInformation.time}`
          ).toLocaleString()}
        </p>
        <p>
          <strong>Tipo de vehiculo:</strong> {transfer.vehicle.name}{" "}
          {transfer.category.name}
        </p>
        {duration && (
          <p>
            <strong>Tiempo estimado:</strong> {duration}
          </p>
        )}
        {passengers && (
          <p>
            <strong>Pasajeros:</strong> {passengers}
          </p>
        )}
        {bags && (
          <p>
            <strong>Equipaje:</strong> {bags}
          </p>
        )}
        <button type="button" className="button" onClick={requestCancelBooking}>
          Cancelar
        </button>
      </div>
      <img src={image.url} alt="image" className="w-full max-w-[400px]" />
    </li>
  );
}
