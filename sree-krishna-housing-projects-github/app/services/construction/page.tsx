import Link from "next/link";

const services = [
  {
    title: "Property Selection & Guidance",
    description:
      "Understand your requirements, budget and priorities and get practical guidance while choosing a suitable property.",
  },
  {
    title: "Investment Consultation",
    description:
      "Evaluate property opportunities with a focus on location, budget, future potential and long-term investment considerations.",
  },
  {
    title: "Property Due Diligence Guidance",
    description:
      "Get practical support in understanding property documents, approvals and important checks before moving forward.",
  },
  {
    title: "Market & Location Consultation",
    description:
      "Make better property decisions with guidance on locations, surrounding development and important market considerations.",
  },
  {
    title: "Buying & Selling Assistance",
    description:
      "Professional support through the buying or selling process, helping make property transactions clearer and more convenient.",
  },
];

export default function ConsultingServicesPage() {
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
            <Link
              href="/#services"
              style={{
                display: "inline-block",
                marginBottom: "10px",
                fontSize: "16px",
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
              PROPERTY CONSULTING
            </p>

            <h1
              style={{
                fontSize: "42px",
                lineHeight: "1.15",
                margin: "0 0 10px",
              }}
            >
              Consulting
            </h1>

            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.6",
                maxWidth: "1100px",
                margin: 0,
              }}
            >
              Practical property consultation to help you make
              confident decisions. From choosing the right property
              to understanding locations, documents and investment
              considerations, we provide clear guidance at every
              stage.
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
              Clear Advice. Better Property Decisions.
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
              Property decisions involve more than price. Location,
              purpose, documentation, future potential and personal
              requirements all need to be considered.
            </p>

            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.65",
              }}
            >
              We aim to make the process easier by understanding your
              needs first and then providing practical,
              straightforward guidance.
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
              Guidance Built Around Your Requirements
            </h2>
          </div>

          <div
            className="checks"
            style={{
              fontSize: "17px",
            }}
          >
            <span>✓ Clear and practical guidance</span>
            <span>✓ Customer-focused consultation</span>
            <span>✓ Location and property insights</span>
            <span>✓ Transparent communication</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="visit">
        <div>
          <p className="eyebrow">
            MAKE YOUR NEXT PROPERTY DECISION WITH CONFIDENCE
          </p>

          <h2
            style={{
              fontSize: "36px",
              lineHeight: "1.2",
            }}
          >
            Need Property Guidance?
          </h2>

          <p
            style={{
              fontSize: "17px",
              lineHeight: "1.65",
            }}
          >
            Tell us what you are looking for and our team will help
            you understand the available options.
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