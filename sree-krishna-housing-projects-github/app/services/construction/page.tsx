import Link from "next/link";

export default function ConstructionServicesPage() {
  return (
    <main className="propertyDetailsPage">
      {/* ================= HEADER ================= */}
      <header className="nav propertyDetailsNav">
        <Link href="/" className="brand">
          <img
            src="/logo.webp"
            alt="Sree Krishna Housing Projects"
          />
        </Link>

        <nav>
          <Link href="/">Home</Link>
          <Link href="/properties">Properties</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        <Link href="/visit" className="btn gold">
          Book Site Visit
        </Link>
      </header>

      {/* ================= HERO ================= */}
      <section className="section">
        <div className="sectionHead">
          <div>
            <p className="eyebrow dark">
              CONSTRUCTION SERVICES
            </p>

            <h1>
              Quality Construction,
              <br />
              Built With Confidence
            </h1>

            <p>
              Reliable construction solutions focused on quality
              workmanship, practical planning and timely completion.
              We help you turn your property plans into well-built
              spaces with professional support at every stage.
            </p>
          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="section muted">
        <div className="split">
          <div>
            <p className="eyebrow dark">
              OUR APPROACH
            </p>

            <h2>
              Construction Solutions You Can Rely On
            </h2>
          </div>

          <div>
            <p>
              At Sree Krishna Housing Projects, we understand that
              construction is more than simply building a structure.
              It requires proper planning, quality materials,
              experienced workmanship and attention to detail.
            </p>

            <p>
              Our team works closely with customers to understand
              their requirements and provide practical construction
              solutions that match their needs and budget.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="section">
        <p className="eyebrow dark">
          WHAT WE OFFER
        </p>

        <h2>
          Our Construction Services
        </h2>

        <div className="services">
          <div className="service">
            <h3>
              Residential Construction
            </h3>

            <p>
              Complete construction support for residential
              projects, with attention to quality, functionality
              and comfortable living spaces.
            </p>
          </div>

          <div className="service">
            <h3>
              Project Planning
            </h3>

            <p>
              Practical planning and guidance to help you organise
              your construction requirements before work begins.
            </p>
          </div>

          <div className="service">
            <h3>
              Quality Workmanship
            </h3>

            <p>
              A strong focus on workmanship, finishing and
              construction quality throughout the project.
            </p>
          </div>

          <div className="service">
            <h3>
              End-to-End Support
            </h3>

            <p>
              Professional assistance throughout the construction
              journey, from initial planning to project completion.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="section muted">
        <div className="split">
          <div>
            <p className="eyebrow dark">
              WHY CHOOSE US
            </p>

            <h2>
              Built Around Quality & Trust
            </h2>
          </div>

          <div className="checks">
            <span>
              ✓ Quality-focused construction
            </span>

            <span>
              ✓ Transparent communication
            </span>

            <span>
              ✓ Practical project planning
            </span>

            <span>
              ✓ Reliable customer support
            </span>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="visit">
        <div>
          <p className="eyebrow">
            LET'S BUILD TOGETHER
          </p>

          <h2>
            Planning Your Next Construction Project?
          </h2>

          <p>
            Talk to our team about your requirements and get
            professional guidance for your construction project.
          </p>
        </div>

        <div className="actions">
          <Link href="/visit" className="btn gold">
            Book a Site Visit
          </Link>

          <Link href="/#contact" className="btn outline">
            Contact Us
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="brand">
          <img
            src="/logo.webp"
            alt="Sree Krishna Housing Projects"
          />
        </div>

        <p>
          Trusted Real Estate & Construction Experts in Tirupati.
        </p>

        <p>
          Tirupati, Andhra Pradesh
        </p>

        <small>
          © {new Date().getFullYear()} Sree Krishna Housing Projects.
          All Rights Reserved.
        </small>
      </footer>
    </main>
  );
}