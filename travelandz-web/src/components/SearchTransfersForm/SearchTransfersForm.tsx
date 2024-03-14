"use client";

import clsx from "clsx";
import { Icons } from "@/icons";
import type { IATACode } from "@/interfaces";
import {
  AvailableTransferCard,
  SelectDropdown,
  SelectDropdownWithTextBox,
} from "@/components";
import { useSearchTransfersForm } from "@/hooks";

interface Props {
  airportCodes: IATACode[];
}

export function SearchTransfersForm({ airportCodes }: Props) {
  const {
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
  } = useSearchTransfersForm();

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <h2 className="text-base sm:text-lg font-semibold">Dirección:</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FormLabel>
            Aeropuerto *
            <SelectDropdown
              label={formBody.airportName || "Seleccione un aeropuerto"}
            >
              <>
                {airportCodes.map((item) => (
                  <li
                    key={item.code}
                    className={clsx({
                      "bg-gray-500 text-white":
                        item.code === formBody.airportCode,
                    })}
                    onClick={() => handleOnChangeAirport(item)}
                  >
                    {item.cityAirport}
                  </li>
                ))}
              </>
            </SelectDropdown>
          </FormLabel>
          <FormLabel>
            Hotel *
            <SelectDropdownWithTextBox
              placeholder="Seleccione un hotel"
              value={formBody.hotelName}
              inputText={hotelCodeKeyword}
              handleOnChange={handleOnChangeHotelKeyword}
              resetFunction={resetHotelKeyword}
            >
              <>
                {searchingHotels && <li>Buscando...</li>}
                {hotelCodes.map((item) => (
                  <li
                    key={item.code}
                    className={clsx({
                      "bg-gray-500 text-white":
                        item.code === formBody.hotelCode,
                    })}
                    onClick={() => handleOnChangeHotel(item)}
                  >
                    {item.name}
                  </li>
                ))}
              </>
            </SelectDropdownWithTextBox>
          </FormLabel>
          <FormLabel>
            Fecha de salida *
            <input
              required
              type="date"
              name="outBound"
              value={formBody.outBound}
              onChange={handleOnChange}
            />
          </FormLabel>
          <FormLabel>
            Fecha de regreso (opcional)
            <input
              type="date"
              name="inBound"
              value={formBody.inBound}
              disabled={formBody.outBound === ""}
              onChange={handleOnChange}
            />
          </FormLabel>
        </div>
        <h2 className="text-base sm:text-lg font-semibold">Pasajeros:</h2>
        <div className="flex flex-col lg:flex-row gap-6">
          <FormLabel className="w-auto">
            Adultos
            <input
              required
              type="number"
              name="adults"
              min={0}
              max={10}
              value={formBody.adults}
              onChange={handleOnChangePassengers}
            />
          </FormLabel>
          <FormLabel className="w-auto">
            Niños
            <input
              required
              type="number"
              name="children"
              min={0}
              max={10}
              value={formBody.children}
              onChange={handleOnChangePassengers}
            />
          </FormLabel>
          <FormLabel className="w-auto">
            Infantes
            <input
              required
              type="number"
              name="infants"
              min={0}
              max={10}
              value={formBody.infants}
              onChange={handleOnChangePassengers}
            />
          </FormLabel>
        </div>
        {routeData.fromName && routeData.toName && (
          <>
            <h2 className="text-lg font-semibold">Ruta:</h2>
            <div className="flex items-center gap-6">
              <input
                className="w-full"
                type="text"
                readOnly
                value={routeData.fromName}
              />
              <Icons.RightArrow className="w-10 text-lg text-gray-500" />
              <input
                className="w-full"
                type="text"
                readOnly
                value={routeData.toName}
              />
              <button
                type="button"
                className="button"
                onClick={InterchangeRouteType}
              >
                <Icons.Exchange className="text-lg" />
              </button>
            </div>
          </>
        )}
        <button
          disabled={isSearching}
          type="submit"
          className="button flex gap-2 items-center justify-center mt-4"
        >
          {isSearching ? "Buscando..." : "Buscar"}
          <Icons.Search className="text-lg" />
        </button>
      </form>
    </div>
  );
}

function FormLabel({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>) {
  return (
    <label className={className + " flex flex-col gap-2 text-base"} {...props}>
      {children}
    </label>
  );
}
