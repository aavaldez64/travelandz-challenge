"use client";

import { ActionLogin } from "@/actions";
import { useState } from "react";
import Swal from "sweetalert2";

export function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await ActionLogin(formData);
    } catch (error) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 w-96 mx-auto bg-blue-400 p-5"
    >
      <label className="flex flex-col gap-y-2">
        <span>Nombre de usuario</span>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleOnChange}
        />
      </label>
      <label className="flex flex-col gap-y-2">
        <span>Contraseña</span>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleOnChange}
        />
      </label>

      <button type="submit">Enviar</button>
    </form>
  );
}
