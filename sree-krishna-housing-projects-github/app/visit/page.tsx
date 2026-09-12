import type { Metadata } from "next";
import Link from "next/link";
import SiteVisitForm from "../components/SiteVisitForm";

export const metadata: Metadata = {
  title: "Book a Site Visit in Tirupati",

  description:
    "Schedule a site visit with Sree Krishna Housing Projects in Tirupati to explore properties and discuss your real estate requirements.",

  keywords: [
    "site visit Tirupati",
    "book site visit Tirupati",
    "property site visit Tirupati",
    "real estate Tirupati",
    "Sree Krishna Housing Projects",
  ],

  alternates: {
    canonical:
      "https://www.sreekrishnahousingprojects.com/visit",
  },

  openGraph: {
    title: "Book a Site Visit in Tirupati",

    description:
      "Schedule a site visit with Sree Krishna Housing Projects in Tirupati.",

    url: "https://www.sreekrishnahousingprojects.com/visit",

    siteName: "Sree Krishna Housing Projects",

    type: "website",

    locale: "en_IN",
  },
};

export default function VisitPage() {
  return (
    <main className="visitPage">
      {/* HEADER - SAME AS HOME PAGE */}
      <header className="nav visitNav">
        <Link href="/" className="brand">
          <img
            src="/logo.webp"
            alt="Sree Krishna Housing Projects"
          />
        </Link>

        <nav className="visitNavLinks">
          <Link href="/">Home</Link>

          <Link href="/properties">
            Properties
          </Link>

          <Link href="/#services">
            Services
          </Link>

          <Link href="/#contact">
            Contact
          </Link>
        </nav>

        <Link
          href="/visit"
          className="btn gold"
        >
          Book Site Visit
        </Link>
      </header>

      {/* PAGE CONTENT */}
      <section className="visitPageContent">
        <h1>Book a Site Visit in Tirupati</h1>

        <SiteVisitForm />
      </section>
    </main>
  );
}