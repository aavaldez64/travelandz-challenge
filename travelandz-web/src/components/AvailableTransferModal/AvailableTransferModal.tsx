import { useTransferModal } from "@/hooks";
import { AvailableTransferModalData, Modal } from "@/components";
import type { TransferAvailabilityDetails } from "@/interfaces";

interface Props {
  data: TransferAvailabilityDetails | null;
  onClose: () => void;
}
export function AvailableTransferModal({ data, onClose }: Props) {
  const { transferPrice, requestBookTransfer } = useTransferModal({
    data,
    onClose,
  });

  return (
    <Modal
      title="Traslado Disponible"
      open={data !== null}
      size="md"
      onClose={() => {
        onClose();
      }}
      Footer={
        data && (
          <div className="w-full flex justify-center">
            <button
              type="button"
              className="button"
              onClick={() => requestBookTransfer(data)}
            >
              Reservar por {transferPrice}
            </button>
          </div>
        )
      }
    >
      {data !== null && <AvailableTransferModalData {...data} />}
    </Modal>
  );
}
