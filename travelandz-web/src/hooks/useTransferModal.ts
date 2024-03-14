"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { parseCurrencyAmount } from "@/utils";
import type { TransferAvailabilityDetails } from "@/interfaces";
import { ActionBookTransfer } from "@/actions/transfer.actions";

interface Props {
  data: TransferAvailabilityDetails | null;
  onClose: () => void;
}
export function useTransferModal({ data, onClose }: Props) {
  const router = useRouter();
  const transferPrice: string = useMemo(() => {
    if (!data) return "";
    return parseCurrencyAmount(data.price.totalAmount, data.price.currencyId);
  }, [data]);
  const requestBookTransfer = async (data: TransferAvailabilityDetails) => {
    const result = await Swal.fire({
      icon: "question",
      title: `¿Desea reservar el traslado seleccionado por ${transferPrice}?`,
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      Swal.fire({
        didOpen: () => Swal.showLoading(),
      });
      try {
        const response = await ActionBookTransfer({
          language: "es",
          rateKey: data.rateKey,
          // @ts-ignore
          // transferType: data.transferType,
          transferType: "FLIGHT",
          transferDirection: data.direction,
          welcomeMessage: "",
          remark: "",
        });
        if (response.ok) {
          onClose();
          await Swal.fire({
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          router.push("/bookings");
        } else {
          throw new Error(response.data?.message || "Unknown error");
        }
      } catch (error: any) {
        await Swal.fire({
          icon: "error",
          title: error.message || "Unknown error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };
  return { transferPrice, requestBookTransfer };
}
