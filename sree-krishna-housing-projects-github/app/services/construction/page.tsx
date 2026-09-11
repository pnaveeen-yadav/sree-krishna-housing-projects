import Link from "next/link";

const services = [
  {
    title: "Residential Home Construction",
    description:
      "Custom-built villas and independent houses designed to reflect your lifestyle, using quality materials and experienced craftsmanship.",
  },
  {
    title: "Commercial Building Construction",
    description:
      "Functional and well-planned commercial spaces, offices, retail buildings and other projects delivered with attention to quality and timelines.",
  },
  {
    title: "Turnkey Project Execution",
    description:
      "End-to-end construction support covering planning, execution, coordination and finishing, so your project is handled with greater convenience.",
  },
  {
    title: "Renovation & Structural Modifications",
    description:
      "Modernizing existing spaces through renovation, layout improvements, structural modifications and practical design upgrades.",
  },
  {
    title: "Quality & Stage-wise Inspection",
    description:
      "Quality-focused checks throughout construction to help maintain material standards, workmanship and overall project quality.",
  },
];

export default function ConstructionServicesPage() {
  return (
    <main className="propertyDetailsPage">
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

      {/* INTRO */}
      <section className="section">
        <div className="sectionHead">
          <div>
            <p className="eyebrow dark">CONSTRUCTION</p>

            <h1>Construction</h1>

            <p>
              Premium residential and commercial construction with
              uncompromising quality assurance. From foundation to finish,
              we focus on structural integrity, practical planning and a
              high standard of workmanship.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div
          className="services"
          style={{
            display: "grid",
            gap: "30px",
          }}
        >
          {services.map((service) => (
            <div
              className="service"
              key={service.title}
              style={{
                position: "relative",
                minHeight: "180px",
              }}
            >
              <h2>{service.title}</h2>

              <p>{service.description}</p>

              <Link
                href="/#contact"
                style={{
                  position: "absolute",
                  right: "32px",
                  bottom: "28px",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Enquire Now&nbsp; →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="section muted">
        <div className="split">
          <div>
            <p className="eyebrow dark">OUR APPROACH</p>

            <h2>
              Built With Quality From Foundation to Finish
            </h2>
          </div>

          <div>
            <p>
              Every construction project needs careful planning,
              reliable execution and attention to detail. We work to
              understand the customer's requirements before moving into
              execution.
            </p>

            <p>
              Our focus is on practical construction, quality
              workmanship, clear communication and timely progress
              throughout the project.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="split">
          <div>
            <p className="eyebrow dark">WHY CHOOSE US</p>

            <h2>
              Quality Construction You Can Rely On
            </h2>
          </div>

          <div className="checks">
            <span>✓ Quality-focused workmanship</span>
            <span>✓ Practical project planning</span>
            <span>✓ Transparent communication</span>
            <span>✓ Reliable customer support</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="visit">
        <div>
          <p className="eyebrow">
            LET&apos;S BUILD TOGETHER
          </p>

          <h2>
            Planning Your Construction Project?
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

      {/* FOOTER */}
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

        <p>Tirupati, Andhra Pradesh</p>

        <small>
          © {new Date().getFullYear()} Sree Krishna Housing
          Projects. All Rights Reserved.
        </small>
      </footer>
    </main>
  );
}