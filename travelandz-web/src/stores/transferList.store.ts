import { create } from "zustand";
import { TransferAvailabilityDetails } from "@/interfaces";

type Store = {
  transferList: TransferAvailabilityDetails[];
  setTransferList: (data: TransferAvailabilityDetails[]) => void;
  searchMade: boolean;
  isSearching: boolean;
  setIsSearching: (state: boolean) => void;
};

export const useTransferListStore = create<Store>()((set) => ({
  transferList: [],
  setTransferList: (data) => {
    set(() => ({ transferList: data, searchMade: true }));
  },
  searchMade: false,
  isSearching: false,
  setIsSearching: (state) => {
    set(() => ({ isSearching: state }));
  },
}));
