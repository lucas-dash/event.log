import React from "react";
import Header from "@/components/header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="min-h-[calc(100vh-72px)] bg-fuchsia-500">
        {children}
      </main>
    </div>
  );
}
