interface Props {
  params: { id: string };
}
export default function BookingID({ params: { id } }: Props) {
  return <div>{id}</div>;
}
