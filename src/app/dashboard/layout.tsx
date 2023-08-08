"use client";
import Provider from "@/hoc/SessionProvider";
import { ToastContainer } from "@/hoc/ToastContainerProvder";
import Sidebar from "@/components/partials/Sidebar";
import { Header } from "@/components/partials/Header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  return (
    <html lang="en">
      {/* <body className="dark text-bodydark bg-boxdark-2"> */}
      <body>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header />
            <Provider>{children}</Provider>
          </div>

          <ToastContainer />
        </div>
      </body>
    </html>
  );
}
