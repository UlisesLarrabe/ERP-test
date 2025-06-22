import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { OrdersProvider } from "@/context/OrdersContext";
import { MovementsProvider } from "@/context/MovementsContext";
import { DateFilterProvider } from "@/context/DateFilterContext";
import { FlavoursProvider } from "@/context/FlavoursContext";
import { LocalFilterProvider } from "@/context/LocalFilterContext";
import { UserProvider } from "@/context/UserContext";

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
      <UserProvider>
        <LocalFilterProvider>
          <OrdersProvider>
            <MovementsProvider>
              <DateFilterProvider>
                <FlavoursProvider>
                  <body className={`${onest.variable} bg-snow `}>
                    {children}
                  </body>
                </FlavoursProvider>
              </DateFilterProvider>
            </MovementsProvider>
          </OrdersProvider>
        </LocalFilterProvider>
      </UserProvider>
    </html>
  );
}
