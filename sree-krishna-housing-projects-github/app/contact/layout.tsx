import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sree Krishna Housing Projects in Tirupati",
  description:
    "Contact Sree Krishna Housing Projects in Tirupati for property consultation, construction services, land development and property buying or selling assistance.",

  keywords: [
    "Sree Krishna Housing Projects contact",
    "real estate contact Tirupati",
    "property consultant Tirupati contact",
    "construction company Tirupati contact",
    "Sree Krishna Housing Projects Tirupati",
  ],

  alternates: {
    canonical:
      "https://www.sreekrishnahousingprojects.com/contact",
  },

  openGraph: {
    title: "Contact Sree Krishna Housing Projects in Tirupati",
    description:
      "Get in touch with Sree Krishna Housing Projects for real estate, construction and property services in Tirupati.",
    url: "https://www.sreekrishnahousingprojects.com/contact",
    siteName: "Sree Krishna Housing Projects",
    type: "website",
    locale: "en_IN",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}