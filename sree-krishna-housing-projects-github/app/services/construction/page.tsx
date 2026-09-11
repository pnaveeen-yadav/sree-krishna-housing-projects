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
          paddingTop: "30px",
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
              CONSTRUCTION
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
              Premium residential and commercial construction with
              uncompromising quality assurance. From foundation to
              finish, we focus on structural integrity, practical
              planning and a high standard of workmanship.
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
              Built With Quality From Foundation to Finish
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
              Every construction project needs careful planning,
              reliable execution and attention to detail. We work to
              understand the customer's requirements before moving
              into execution.
            </p>

            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.65",
              }}
            >
              Our focus is on practical construction, quality
              workmanship, clear communication and timely progress
              throughout the project.
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
              Quality Construction You Can Rely On
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

          <h2
            style={{
              fontSize: "36px",
              lineHeight: "1.2",
            }}
          >
            Planning Your Construction Project?
          </h2>

          <p
            style={{
              fontSize: "17px",
              lineHeight: "1.65",
            }}
          >
            Talk to our team about your requirements and get
            professional guidance for your construction project.
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
