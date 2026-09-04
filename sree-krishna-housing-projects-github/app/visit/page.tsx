import Link from "next/link";
import SiteVisitForm from "../components/SiteVisitForm";

export default function VisitPage() {
  return (
    <main className="visitPage">
      {/* HEADER */}
      <header className="nav visitNav">
        <Link href="/" className="brand">
          <span>SK</span>

          <div>
            <b>SREE KRISHNA</b>
            <small>HOUSING PROJECTS</small>
          </div>
        </Link>

        <nav>
          <Link href="/">Home</Link>

          <Link href="/properties">Properties</Link>

          <Link href="/#services">Services</Link>

          <Link href="/#testimonials">Testimonials</Link>

          <Link href="/#contact">Contact</Link>
        </nav>

        <Link href="/visit" className="btn dark">
          Book Site Visit
        </Link>
      </header>

      {/* VISIT CONTENT */}
      <section className="visitPageContent">
        <h1>Schedule Your Visit</h1>

        <SiteVisitForm />
      </section>
    </main>
  );
}