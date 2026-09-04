import Link from "next/link";
import SiteVisitForm from "../components/SiteVisitForm";

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
          <Link href="/properties">Properties</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#testimonials">Testimonials</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        <Link href="/visit" className="btn gold">
          Book Site Visit
        </Link>
      </header>

      {/* PAGE CONTENT */}
      <section className="visitPageContent">
        <h1>Schedule Your Visit</h1>

        <SiteVisitForm />
      </section>
    </main>
  );
}