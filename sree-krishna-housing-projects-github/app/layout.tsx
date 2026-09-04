import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Sree Krishna Housing Projects",
  description: "Trusted Real Estate & Construction Experts in Tirupati"
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}