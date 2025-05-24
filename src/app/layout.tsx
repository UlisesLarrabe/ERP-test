import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { OrdersProvider } from "@/context/OrdersContext";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cabo Frío - Heladería",
  description: "Heladería Cabo Frío",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <OrdersProvider>
        <body className={`${onest.variable} bg-snow `}>{children}</body>
      </OrdersProvider>
    </html>
  );
}
