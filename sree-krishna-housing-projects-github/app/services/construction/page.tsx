import Link from "next/link";

const services = [
  {
    title: "Residential Construction",
    description:
      "Quality residential construction services planned and executed with attention to structure, materials, workmanship and finishing.",
  },
  {
    title: "Commercial Construction",
    description:
      "Reliable construction solutions for commercial spaces with practical planning, quality execution and timely project coordination.",
  },
  {
    title: "Renovation & Remodeling",
    description:
      "Upgrade and improve existing properties with renovation and remodeling solutions tailored to your requirements and budget.",
  },
  {
    title: "Construction Project Management",
    description:
      "Professional coordination of construction activities, materials, workers and timelines to help ensure smooth project execution.",
  },
  {
    title: "Site Development & Infrastructure",
    description:
      "Supporting site preparation, basic infrastructure and development works required to make a property ready for construction or use.",
  },
];

export default function ConstructionServicesPage() {
  return (
    <main className="propertyDetailsPage">
      {/* HEADER */}
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
      <section
        className="section"
        style={{
          paddingTop: "45px",
          paddingBottom: "5px",
        }}
      >
        <div className="sectionHead">
          <div>
            {/* BACK TO SERVICES */}
            <Link
              href="/#services"
              style={{
                display: "inline-block",
                marginBottom: "14px",
                fontSize: "15px",
                fontWeight: 600,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ← Back to Services
            </Link>

            <p
              className="eyebrow dark"
              style={{
                marginBottom: "6px",
              }}
            >
              CONSTRUCTION SERVICES
            </p>

            <h1
              style={{
                fontSize: "42px",
                lineHeight: "1.15",
                margin: "0 0 10px",
              }}
            >
              Construction
            </h1>

            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.6",
                maxWidth: "1100px",
                margin: 0,
              }}
            >
              Reliable construction solutions focused on quality
              workmanship, practical planning and timely completion.
              From residential construction to renovation and site
              development, we provide dependable support throughout
              the construction process.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="section"
        style={{
          paddingTop: "15px",
          paddingBottom: "45px",
        }}
      >
        <div
          className="services"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {services.map((service) => (
            <div
              className="service"
              key={service.title}
              style={{
                width: "100%",
                minHeight: "175px",
                padding: "32px 40px",
                position: "relative",
                boxSizing: "border-box",
              }}
            >
              <h2
                style={{
                  fontSize: "30px",
                  lineHeight: "1.25",
                  margin: "0 0 12px",
                  maxWidth: "78%",
                }}
              >
                {service.title}
              </h2>

              <p
                style={{
                  fontSize: "17px",
                  lineHeight: "1.65",
                  margin: 0,
                  maxWidth: "78%",
                }}
              >
                {service.description}
              </p>

              <Link
                href="/#contact"
                style={{
                  position: "absolute",
                  right: "38px",
                  bottom: "28px",
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Enquire Now&nbsp; →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* OUR APPROACH */}
      <section
        className="section muted"
        style={{
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        <div className="split">
          <div>
            <p className="eyebrow dark">
              OUR APPROACH
            </p>

            <h2
              style={{
                fontSize: "36px",
                lineHeight: "1.2",
                marginTop: "6px",
              }}
            >
              Quality Work. Reliable Execution.
            </h2>
          </div>

          <div>
            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.65",
                marginTop: 0,
              }}
            >
              Every construction project requires proper planning,
              quality materials, skilled workmanship and effective
              coordination. We focus on maintaining these standards
              throughout the project.
            </p>

            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.65",
              }}
            >
              Our approach is practical and transparent, helping
              customers understand the work involved while keeping
              the project focused on quality and timely completion.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section
        className="section"
        style={{
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        <div className="split">
          <div>
            <p className="eyebrow dark">
              WHY CHOOSE US
            </p>

            <h2
              style={{
                fontSize: "36px",
                lineHeight: "1.2",
                marginTop: "6px",
              }}
            >
              Construction Support You Can Rely On
            </h2>
          </div>

          <div
            className="checks"
            style={{
              fontSize: "17px",
            }}
          >
            <span>✓ Quality-focused workmanship</span>
            <span>✓ Practical project planning</span>
            <span>✓ Transparent communication</span>
            <span>✓ Timely project coordination</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="visit">
        <div>
          <p className="eyebrow">
            PLAN YOUR CONSTRUCTION PROJECT WITH CONFIDENCE
          </p>

          <h2
            style={{
              fontSize: "36px",
              lineHeight: "1.2",
            }}
          >
            Need Construction Services?
          </h2>

          <p
            style={{
              fontSize: "17px",
              lineHeight: "1.65",
            }}
          >
            Tell us about your construction requirements and our team
            will help you understand the available options and next
            steps.
          </p>
        </div>

        <div
          className="actions"
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
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