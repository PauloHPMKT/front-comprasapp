interface ErrorProps {
  message: string | undefined;
}


export function ErrorComponent({ message }: ErrorProps) {
  return <p className="text-red-500 text-sm mt-1">{message}</p>;
}