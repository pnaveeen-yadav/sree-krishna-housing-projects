import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Land Development Services in Tirupati",
  description:
    "Land development services in Tirupati including feasibility planning, layout development, infrastructure development, approvals coordination and site execution.",
  keywords: [
    "land development in Tirupati",
    "land development services Tirupati",
    "land development company Tirupati",
    "layout development Tirupati",
    "residential layout development Tirupati",
    "site development Tirupati",
    "infrastructure development Tirupati",
    "land feasibility Tirupati",
    "Sree Krishna Housing Projects",
  ],
  alternates: {
    canonical:
      "https://sreekrishnahousingprojects.com/services/land-development",
  },
  openGraph: {
    title: "Land Development Services in Tirupati",
    description:
      "Professional land development, layout planning, infrastructure and site development support in Tirupati.",
    url: "https://sreekrishnahousingprojects.com/services/land-development",
    siteName: "Sree Krishna Housing Projects",
    type: "website",
    locale: "en_IN",
  },
};

const services = [
  {
    title: "Land Feasibility & Planning",
    description:
      "Practical assessment of land requirements, development possibilities and planning considerations before starting a project.",
  },
  {
    title: "Layout & Development Support",
    description:
      "Guidance for developing land into well-planned residential layouts with attention to access, usability and overall planning.",
  },
  {
    title: "Infrastructure Development",
    description:
      "Support for essential development requirements such as internal roads, drainage, utilities and other site infrastructure.",
  },
  {
    title: "Approvals & Development Coordination",
    description:
      "Assistance in understanding development requirements and coordinating the important stages of the development process.",
  },
  {
    title: "Site Development & Execution",
    description:
      "Professional support for site preparation and development work with a focus on quality, planning and timely execution.",
  },
];

export default function LandDevelopmentServicesPage() {
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
              LAND DEVELOPMENT
            </p>

            <h1
              style={{
                fontSize: "42px",
                lineHeight: "1.15",
                margin: "0 0 10px",
              }}
            >
              Land Development
            </h1>

            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.6",
                maxWidth: "1100px",
                margin: 0,
              }}
            >
              Transforming land into thoughtfully planned and usable
              developments through practical planning, infrastructure
              support and quality-focused execution.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="section"
        style={{
          paddingTop: "5px",
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
              Planned Development With Long-Term Value in Mind
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
              Successful land development starts with understanding
              the site, its requirements and the intended use of the
              property.
            </p>

            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.65",
              }}
            >
              We focus on practical planning and coordinated
              execution so that development work is organised,
              useful and aligned with the project&apos;s objectives.
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
              Development Focused On Quality & Practicality
            </h2>
          </div>

          <div
            className="checks"
            style={{
              fontSize: "17px",
            }}
          >
            <span>✓ Practical development planning</span>
            <span>✓ Quality-focused execution</span>
            <span>✓ Coordinated project support</span>
            <span>✓ Clear customer communication</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="visit">
        <div>
          <p className="eyebrow">
            READY TO DEVELOP YOUR LAND?
          </p>

          <h2
            style={{
              fontSize: "36px",
              lineHeight: "1.2",
            }}
          >
            Let&apos;s Discuss Your Development Plan
          </h2>

          <p
            style={{
              fontSize: "17px",
              lineHeight: "1.65",
            }}
          >
            Share your land development requirements with our team
            and get practical guidance for the next steps.
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