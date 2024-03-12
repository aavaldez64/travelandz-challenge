export function Footer() {
  return (
    <footer className="w-full bg-slate-500 text-white">
      <div className="mx-auto w-full max-w-[1600px] p-8 text-white">
        <p className="text-center w-full">
          <strong className="font-bold text-base">Travelandz Web.</strong>{" "}
          <small className="text-base">
            Aplicación desarrollada por{" "}
            <a
              className="font-bold hover:underline"
              target="_blank"
              href="https://github.com/aavaldez64"
            >
              aavaldez64
            </a>{" "}
            para el Travelandz - Desafío Técnico
          </small>
        </p>
      </div>
    </footer>
  );
}
