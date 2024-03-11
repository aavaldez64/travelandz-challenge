"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { ActionLogin } from "@/actions";

export function useLoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isSending, setIsSending] = useState(false);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;
    setIsSending(true);
    try {
      await ActionLogin(formData);
    } catch (error) {
      setIsSending(false);
      return Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  return {
    formData,
    isSending,
    handleOnChange,
    handleSubmit,
  };
}
