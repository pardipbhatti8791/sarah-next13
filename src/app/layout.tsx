import Provider from "@/hoc/SessionProvider";
import "./globals.css";
import type { Metadata } from "next";
import { ToastContainer } from "@/hoc/ToastContainerProvder";

export const metadata: Metadata = {
  title: "Login",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
        <ToastContainer />
      </body>
    </html>
  );
}
