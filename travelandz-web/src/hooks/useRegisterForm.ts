"use client";

import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import { ActionRegister } from "@/actions";

export function useRegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSending, setIsSending] = useState(false);
  const passwordsMatch = useMemo(() => {
    return formData.password === formData.confirmPassword;
  }, [formData.password, formData.confirmPassword]);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;
    if (!passwordsMatch) return;
    setIsSending(true);
    try {
      await new Promise((resolve) => {
        setTimeout(() => resolve(true), 3000);
      });

      await ActionRegister({
        ...formData,
        phone:
          formData.phone[0] === "+" ? formData.phone : `+${formData.phone}`,
      });
    } catch (error: any) {
      setIsSending(false);
      return Swal.fire({
        icon: "error",
        title: error.message || "Unknown Error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  return { formData, isSending, passwordsMatch, handleOnChange, handleSubmit };
}
