import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://www.sreekrishnahousingprojects.com"
  ),

  title: {
    default:
      "Sree Krishna Housing Projects | Real Estate & Construction in Tirupati",
    template: "%s | Sree Krishna Housing Projects",
  },

  description:
    "Sree Krishna Housing Projects provides real estate, property consultation, construction and land development services in Tirupati.",

  keywords: [
    "real estate in Tirupati",
    "real estate company in Tirupati",
    "real estate developers in Tirupati",
    "property consultant in Tirupati",
    "construction company in Tirupati",
    "construction services in Tirupati",
    "land development in Tirupati",
    "properties in Tirupati",
    "plots for sale in Tirupati",
    "Sree Krishna Housing Projects",
  ],

  authors: [
    {
      name: "Sree Krishna Housing Projects",
    },
  ],

  creator: "Sree Krishna Housing Projects",
  publisher: "Sree Krishna Housing Projects",

  alternates: {
    canonical:
      "https://www.sreekrishnahousingprojects.com/",
  },

  openGraph: {
    type: "website",

    url: "https://www.sreekrishnahousingprojects.com/",

    siteName: "Sree Krishna Housing Projects",

    title:
      "Sree Krishna Housing Projects | Real Estate & Construction in Tirupati",

    description:
      "Real estate, property consultation, construction and land development services in Tirupati.",

    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Sree Krishna Housing Projects | Real Estate & Construction in Tirupati",

    description:
      "Real estate, property consultation, construction and land development services in Tirupati.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://www.sreekrishnahousingprojects.com/#business",
  name: "Sree Krishna Housing Projects",
  url: "https://www.sreekrishnahousingprojects.com/",
  logo: "https://www.sreekrishnahousingprojects.com/logo.webp",
  image: "https://www.sreekrishnahousingprojects.com/logo.webp",
  email: "housingprojects@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Saideep Towers, 20-03-131, B4, Leela Mahal Road, Srinivasa Nagar, Akkarampalle",
    addressLocality: "Tirupati",
    addressRegion: "Andhra Pradesh",
    postalCode: "517501",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
