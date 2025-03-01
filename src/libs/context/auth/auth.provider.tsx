"use client";
import { type PropsWithChildren } from "react";
import { AuthContext } from "./auth";
import { useAuthProvider } from "@/libs/hooks/use-auth-provider";

export default function AuthProvider(props: PropsWithChildren) {
  const { user } = useAuthProvider()
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
