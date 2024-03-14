"use client";

import { AvailableTransferCard } from "@/components";
import { AvailableTransferModal } from "../AvailableTransferModal/AvailableTransferModal";
import { useSearchTransfersResults } from "@/hooks";

export function SearchTransfersResults() {
  const {
    transferList,
    searchMade,
    isSearching,
    transferModal,
    handleClick,
    onCloseModal,
  } = useSearchTransfersResults();

  if (isSearching) {
    return (
      <>
        <hr />
        <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl">
          Buscando...
        </h2>
      </>
    );
  }
  if (!searchMade && transferList.length === 0) return null;
  if (transferList.length === 0)
    return (
      <>
        <hr />
        <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl">
          No se encontraron resultados...
        </h2>
      </>
    );
  return (
    <>
      <hr />
      <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl">
        Resultados:
      </h2>
      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-[900px] xl:max-w-full mx-auto xl:mx-0">
        {transferList.map((element) => (
          <AvailableTransferCard
            key={element.id}
            {...element}
            handleClick={() => {
              handleClick(element);
            }}
          />
        ))}
      </section>
      <AvailableTransferModal data={transferModal} onClose={onCloseModal} />
    </>
  );
}
