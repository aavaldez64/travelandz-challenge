"use client";
import clsx from "clsx";
import { useRegisterForm } from "@/hooks";

export function RegisterForm() {
  const { formData, isSending, passwordsMatch, handleOnChange, handleSubmit } =
    useRegisterForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full mb-8">
      <InputLabel>
        <span>Nombre de usuario:</span>
        <input
          required
          type="text"
          name="username"
          value={formData.username}
          onChange={handleOnChange}
        />
      </InputLabel>
      <div className="w-full flex flex-col lg:flex-row gap-y-2 gap-x-6">
        <InputLabel>
          <span>Nombre:</span>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleOnChange}
          />
        </InputLabel>
        <InputLabel>
          <span>Apellido:</span>
          <input
            required
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleOnChange}
          />
        </InputLabel>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-y-2 gap-x-6">
        <InputLabel>
          <span>E-mail:</span>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            placeholder="ejemplo@email.com"
            onChange={handleOnChange}
          />
        </InputLabel>
        <InputLabel>
          <span>Teléfono:</span>
          <input
            required
            type="tel"
            name="phone"
            placeholder="+15551234567"
            pattern="^\+?([0-9]{1,2})\)?([0-9]{10})$"
            value={formData.phone}
            onChange={handleOnChange}
          />
        </InputLabel>
      </div>
      <InputLabel>
        <span>Contraseña:</span>
        <input
          required
          type="password"
          name="password"
          value={formData.password}
          onChange={handleOnChange}
        />
      </InputLabel>
      <InputLabel>
        <span>Confirmar Contraseña:</span>
        <input
          required
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          className={clsx({
            "border-2 border-red-500 outline-red-500": !passwordsMatch,
          })}
          onChange={handleOnChange}
        />
        {!passwordsMatch && (
          <small className="text-red-500">Las contraseñas no coinciden</small>
        )}
      </InputLabel>

      <button
        className="button text-normal sm:text-lg mt-4"
        type="submit"
        disabled={isSending || !passwordsMatch}
      >
        {isSending ? "Enviando..." : "Registrarse"}
      </button>
    </form>
  );
}

function InputLabel({ children }: React.PropsWithChildren) {
  return (
    <label className="w-full flex flex-col gap-y-2 font-semibold text-normal sm:text-lg">
      {children}
    </label>
  );
}
