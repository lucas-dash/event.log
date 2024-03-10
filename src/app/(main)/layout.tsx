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
      <main className="min-h-main px-2 py-5 sm:container">{children}</main>
    </>
  );
}
