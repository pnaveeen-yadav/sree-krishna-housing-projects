import Link from "next/link";
import SiteVisitForm from "../components/SiteVisitForm";

export default function VisitPage() {
  return (
    <main className="visitPage">
      {/* HEADER */}
      <header className="visitHeader">
        <nav className="visitNavLinks">
          <Link href="/">Home</Link>
          <Link href="/properties">Properties</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#testimonials">Testimonials</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>

      {/* PAGE CONTENT */}
      <section className="visitPageContent">
        <h1>Schedule Your Visit</h1>

        <SiteVisitForm />
      </section>
    </main>
  );
}