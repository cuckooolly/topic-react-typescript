"use client";



// TODO-6: props 타입을 정의하세요. interface 사용하세요.
// type 은 union type 으로 "text" | "number" | "email" | "password" 으로 정의하세요.
// ref 는 React.Ref<HTMLInputElement> 으로 정의하세요.
import React from "react";

interface InputProps {
  type: "text" | "number" | "email" | "password";
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required: boolean;
  name: string;
  className: string;
  ref: React.Ref<HTMLInputElement>;
}

export default function Input({
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  name,
  className = "",
  ref,
  ...props
}: InputProps) {
  const baseStyles =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <input
      ref={ref}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      name={name}
      className={`${baseStyles} ${className}`}
      {...props}
    />
  );
}
