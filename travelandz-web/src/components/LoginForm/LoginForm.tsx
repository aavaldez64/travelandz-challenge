"use client";
import { useLoginForm } from "@/hooks";

export function LoginForm() {
  const { formData, isSending, handleOnChange, handleSubmit } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full mb-8">
      <label className="flex flex-col gap-y-2 font-semibold text-normal sm:text-lg">
        <span>Nombre de usuario:</span>
        <input
          required
          type="text"
          name="username"
          value={formData.username}
          onChange={handleOnChange}
        />
      </label>
      <label className="flex flex-col gap-y-2 font-semibold text-normal sm:text-lg">
        <span>Contraseña:</span>
        <input
          required
          type="password"
          name="password"
          value={formData.password}
          onChange={handleOnChange}
        />
      </label>

      <button
        className="button text-normal sm:text-lg mt-4"
        type="submit"
        disabled={isSending}
      >
        {isSending ? "Enviando..." : "Iniciar Sesión"}
      </button>
    </form>
  );
}
