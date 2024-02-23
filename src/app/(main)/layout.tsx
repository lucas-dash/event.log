import React from "react";
import Header from "@/components/header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <main className="min-h-screen flex flex-col pt-[76px] w-full">
        {children}
      </main>
    </>
  );
}
