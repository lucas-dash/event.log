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
      <main className="min-h-[calc(100vh-72px)] px-2 sm:container">
        {children}
      </main>
    </>
  );
}
