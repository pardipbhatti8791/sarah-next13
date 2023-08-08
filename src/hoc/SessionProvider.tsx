"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

interface ReactProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ReactProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default Provider;
