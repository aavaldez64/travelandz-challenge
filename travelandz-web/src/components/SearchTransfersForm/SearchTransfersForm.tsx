"use client";

import clsx from "clsx";
import { Icons } from "@/icons";
import type { IATACode } from "@/interfaces";
import { SelectDropdown, SelectDropdownWithTextBox } from "@/components";
import { useSearchTransfersForm } from "@/hooks";

interface Props {
  airportCodes: IATACode[];
}

export function SearchTransfersForm({ airportCodes }: Props) {
  const {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Dirección:</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <label className="flex flex-col gap-2">
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
        </label>
        <label className="flex flex-col gap-2">
          Hotel *
          <SelectDropdownWithTextBox
            placeholder="Seleccione un hotel"
            value={formBody.hotelName}
            inputText={hotelCodeKeyword}
            handleOnChange={handleOnChangeHotelKeyword}
            resetFunction={resetHotelKeyword}
          >
            <>
              {hotelCodes.map((item) => (
                <li
                  key={item.code}
                  className={clsx({
                    "bg-gray-500 text-white": item.code === formBody.hotelCode,
                  })}
                  onClick={() => handleOnChangeHotel(item)}
                >
                  {item.name}
                </li>
              ))}
            </>
          </SelectDropdownWithTextBox>
        </label>
        <label className="flex flex-col gap-2">
          Fecha de salida *
          <input
            type="date"
            name="outBound"
            value={formBody.outBound}
            onChange={handleOnChange}
          />
        </label>
        <label className="flex flex-col gap-2">
          Fecha de regreso (opcional)
          <input
            type="date"
            name="inBound"
            value={formBody.inBound}
            disabled={formBody.outBound === ""}
            onChange={handleOnChange}
          />
        </label>
      </div>
      <h2 className="text-lg font-semibold">Pasajeros:</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <label className="w-auto flex flex-col gap-2">
          Adultos
          <input
            type="number"
            name="adults"
            min={0}
            max={10}
            value={formBody.adults}
            onChange={handleOnChangePassengers}
          />
        </label>
        <label className="w-auto flex flex-col gap-2">
          Niños
          <input
            type="number"
            name="children"
            min={0}
            max={10}
            value={formBody.children}
            onChange={handleOnChangePassengers}
          />
        </label>
        <label className="w-auto flex flex-col gap-2">
          Infantes
          <input
            type="number"
            name="infants"
            min={0}
            max={10}
            value={formBody.infants}
            onChange={handleOnChangePassengers}
          />
        </label>
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
        type="submit"
        className="button flex gap-2 items-center justify-center mt-4"
      >
        Buscar
        <Icons.Search className="text-lg" />
      </button>
    </form>
  );
}
