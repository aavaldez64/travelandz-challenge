import { RegisterForm } from "@/components";
import Link from "next/link";

export default async function RegisterPage() {
  return (
    <main className="relative flex flex-col lg:flex-row gap-8 w-full min-h-screen lg:h-screen">
      <section className="w-full lg:w-1/2 flex h-full items-center z-10 p-2 sm:p-5 lg:p-0">
        <div className="w-full max-w-4xl p-4 py-8 lg:py-8 lg:p-8 flex flex-col justify-center bg-white">
          <h1 className="font-semibold text-2xl sm:text-3xl mb-5 sm:mb-8">
            Registrarse
          </h1>
          <RegisterForm />
          <p className="text-slate-600">
            Ya tienes cuenta?{" "}
            <Link
              href="/"
              className="hover:underline text-sky-800 font-semibold"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </section>
      <picture
        className="w-full lg:w-1/2 h-screen fixed lg:relative"
        style={{
          backgroundImage: "url('/assets/login-register-background-image.jpg')",
          backgroundSize: "cover",
          backgroundPositionX: "right",
        }}
      ></picture>
    </main>
  );
}
