"use client";

import InputFieldContainer from "@/src/app/_components/auth/InputFieldContainer";
import { Eye } from "lucide-react";
import { useEffect } from "react";

export default function Signup() {
  useEffect(() => {}, []);
  return (
    <form action="" autoComplete="on">
      <InputFieldContainer label="Name" htmlFor="name" error="">
        <input
          type="text"
          name="name"
          id="name"
          defaultValue=""
          autoComplete="name"
          placeholder="Name"
        />
      </InputFieldContainer>

      <InputFieldContainer label="Email Address" htmlFor="email" error="">
        <input
          type="text"
          name="email"
          id="email"
          defaultValue=""
          autoComplete="email"
          placeholder="Email Address"
        />
      </InputFieldContainer>

      <InputFieldContainer label="Password" htmlFor="password" error="">
        <input
          type="password"
          name="password"
          id="password"
          defaultValue=""
          autoComplete="password"
          placeholder="********"
        />
        <Eye className="size-[19px]" />
      </InputFieldContainer>
    </form>
  );
}
