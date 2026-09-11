import Link from "next/link";

const services = [
  {
    title: "Property Buying Assistance",
    description:
      "Support in understanding available properties, comparing options and moving through the purchase process with greater clarity.",
  },
  {
    title: "Property Selling Assistance",
    description:
      "Practical assistance for property owners looking to present, position and sell their property efficiently.",
  },
  {
    title: "Documentation Guidance",
    description:
      "Guidance on the key documents and information that should be understood during a property transaction.",
  },
  {
    title: "Transaction Coordination",
    description:
      "Support in coordinating important stages of the transaction between customers and relevant parties.",
  },
  {
    title: "Property Consultation",
    description:
      "Clear guidance on property-related decisions so buyers and sellers can move forward with greater confidence.",
  },
];

export default function PropertyTransactionsServicesPage() {
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
            <p
              className="eyebrow dark"
              style={{
                marginBottom: "6px",
              }}
            >
              PROPERTY BUYING & SELLING
            </p>

            <h1
              style={{
                fontSize: "42px",
                lineHeight: "1.15",
                margin: "0 0 10px",
              }}
            >
              Property Transactions
            </h1>

            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.6",
                maxWidth: "1100px",
                margin: 0,
              }}
            >
              Reliable support for buying and selling property,
              with clear communication and practical assistance
              throughout the transaction process.
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
              Making Property Transactions Clearer & Easier
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
              Buying or selling property involves several important
              decisions and stages. Clear information and proper
              coordination can make the process much smoother.
            </p>

            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.65",
              }}
            >
              Our team works with customers to understand their
              requirements and provide practical support throughout
              the transaction journey.
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
              Professional Support At Every Stage
            </h2>
          </div>

          <div
            className="checks"
            style={{
              fontSize: "17px",
            }}
          >
            <span>✓ Clear communication</span>
            <span>✓ Customer-focused assistance</span>
            <span>✓ Practical transaction guidance</span>
            <span>✓ Reliable support</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="visit">
        <div>
          <p className="eyebrow">
            PLANNING A PROPERTY TRANSACTION?
          </p>

          <h2
            style={{
              fontSize: "36px",
              lineHeight: "1.2",
            }}
          >
            Let&apos;s Make Your Next Move Easier
          </h2>

          <p
            style={{
              fontSize: "17px",
              lineHeight: "1.65",
            }}
          >
            Talk to our team about buying or selling property and
            understand the next steps with confidence.
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