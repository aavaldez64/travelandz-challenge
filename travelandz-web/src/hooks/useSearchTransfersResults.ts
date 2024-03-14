"use client";
import { useCallback, useState } from "react";
import { useTransferListStore } from "@/stores";
import type { TransferAvailabilityDetails } from "@/interfaces";

export function useSearchTransfersResults() {
  const transferList = useTransferListStore((state) => state.transferList);
  const searchMade = useTransferListStore((state) => state.searchMade);
  const isSearching = useTransferListStore((state) => state.isSearching);

  const [transferModal, setTransferModal] =
    useState<TransferAvailabilityDetails | null>(null);

  const handleClick = useCallback((transfer: TransferAvailabilityDetails) => {
    setTransferModal(transfer);
  }, []);
  const onCloseModal = () => {
    setTransferModal(null);
  };
  return {
    transferList,
    searchMade,
    isSearching,
    transferModal,
    handleClick,
    onCloseModal,
  };
}
