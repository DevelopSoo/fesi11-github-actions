import { useState } from "react";

// 제네릭타입

export const useInputs = <T extends Record<string, unknown>>(
  initialValues: T,
) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (field: keyof typeof values) => {
    setValues((prev) => ({ ...prev, [field]: "" }));
  };

  return {
    values,
    handleChange,
    handleDelete,
  };
};
