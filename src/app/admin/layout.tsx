"use client";
import React, { PropsWithChildren, Suspense } from "react";
import { AdminLayout } from "./components/admin-layout";
import { SessionProvider } from "next-auth/react";
import { Loader } from "lucide-react";

export default function Layout(props: PropsWithChildren) {
  return (
      <SessionProvider>
        <AdminLayout>{props.children}</AdminLayout>
      </SessionProvider>
  );
}


