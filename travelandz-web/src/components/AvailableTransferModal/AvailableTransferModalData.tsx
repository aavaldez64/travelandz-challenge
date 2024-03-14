"use client";
import { useMemo } from "react";
import Image from "next/image";
import type { TransferAvailabilityDetails } from "@/interfaces";

export function AvailableTransferModalData({
  cancellationPolicies,
  category,
  content,
  direction,
  factsheetId,
  id,
  links,
  maxPaxCapacity,
  minPaxCapacity,
  pickupInformation,
  price,
  rateKey,
  transferType,
  vehicle,
}: TransferAvailabilityDetails) {
  const {
    customerTransferTimeInfo,
    images,
    supplierTransferTimeInfo,
    transferDetailInfo,
    transferRemarks,
  } = content;
  const image = useMemo(() => {
    return images.find((img) => img.type === "MEDIUM") || images[0];
  }, [images.length]);
  const { passengers, bags, duration } = useMemo(() => {
    const passengers: string[] = [];
    const duration = content.transferDetailInfo.find((item) =>
      item.name.includes("Duracion estimada")
    )?.description;
    const bags = content.transferDetailInfo.find((item) =>
      item.name.includes("maletas")
    )?.description;
    const minPassengers = content.transferDetailInfo.find((item) =>
      item.name.includes("pasajero(s) minimo")
    );
    const maxPassengers = content.transferDetailInfo.find((item) =>
      item.name.includes("pasajero(s) maximo")
    );
    if (minPassengers) passengers.push(minPassengers.description);
    if (maxPassengers) passengers.push(maxPassengers.description);
    return {
      duration,
      bags,
      passengers: passengers.join(" - "),
    };
  }, [content.transferDetailInfo.length]);
  return (
    <article className="flex flex-col p-0 sm:p-8">
      <p>
        <strong>Salida:</strong>{" "}
        {new Date(
          `${pickupInformation.date} ${pickupInformation.time}`
        ).toLocaleString()}
      </p>
      <p>
        <strong>Tipo de vehiculo:</strong> {vehicle.name} {category.name}
      </p>
      <p>
        <strong>Tipo de traslado:</strong>{" "}
        {transferType === "PRIVATE" ? "Privado" : "Compartido"}
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
      <p>
        <strong>Descripción:</strong> {pickupInformation.pickup.description}
      </p>
      <div className="flex-1" />
      {image && (
        <Image
          src={image.url}
          alt=""
          width={400}
          height={250}
          className="w-full mx-auto h-auto"
        />
      )}
    </article>
  );
}
