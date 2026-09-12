import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties for Sale in Tirupati",
  description:
    "Explore residential plots, villas, apartments and other properties for sale in Tirupati from Sree Krishna Housing Projects.",

  keywords: [
    "properties for sale in Tirupati",
    "properties in Tirupati",
    "plots for sale in Tirupati",
    "residential plots Tirupati",
    "villas for sale in Tirupati",
    "apartments for sale in Tirupati",
    "real estate properties Tirupati",
    "Sree Krishna Housing Projects",
  ],

  alternates: {
    canonical:
      "https://www.sreekrishnahousingprojects.com/properties",
  },

  openGraph: {
    title: "Properties for Sale in Tirupati",
    description:
      "Explore residential plots, villas, apartments and other properties for sale in Tirupati.",
    url: "https://www.sreekrishnahousingprojects.com/properties",
    siteName: "Sree Krishna Housing Projects",
    type: "website",
    locale: "en_IN",
  },
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}