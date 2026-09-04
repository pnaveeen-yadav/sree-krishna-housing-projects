import SiteVisitForm from "../components/SiteVisitForm";

const properties = [
  {
    name: "Premium Open Plots",
    location: "Tirupati",
    type: "Open Plots"
  },
  {
    name: "Krishna Enclave",
    location: "Tirupati",
    type: "Residential"
  },
  {
    name: "Modern Villas",
    location: "Tirupati",
    type: "Villas"
  }
];

export default function Home() {
  return (
    <main>
      {/* ================= HEADER ================= */}

      <header className="nav">
        <a href="/" className="brand">
          <span>SK</span>

          <div>
            <b>SREE KRISHNA</b>
            <small>HOUSING PROJECTS</small>
          </div>
        </a>

        <nav>
          <a href="/">Home</a>
          <a href="/properties">Properties</a>
          <a href="#services">Services</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* BOOK SITE VISIT */}
        <a className="btn gold" href="/visit">
          Book Site Visit
        </a>
      </header>

      {/* ================= HERO ================= */}

      <section className="hero">
        <div className="heroOverlay">
          <p className="eyebrow">
            TIRUPATI • REAL ESTATE • CONSTRUCTION
          </p>

          <h1>
            Find a Place You’ll Love to Call <em>Home.</em>
          </h1>

          <p>
            Discover quality open plots, residential properties and
            construction opportunities with Sree Krishna Housing Projects.
          </p>

          <div className="actions">
            <a className="btn gold" href="/properties">
              Explore Properties
            </a>

            <a className="btn outline" href="/visit">
              Book a Site Visit
            </a>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section id="about" className="section split">
        <div>
          <p className="eyebrow dark">ABOUT US</p>

          <h2>Your Trusted Property Partner in Tirupati</h2>

          <p>
            We help customers explore carefully selected property
            opportunities with a focus on transparency, quality and
            customer support.
          </p>

          <div className="checks">
            <span>✓ Transparent Process</span>
            <span>✓ Prime Locations</span>
            <span>✓ Customer Support</span>
            <span>✓ Investment Guidance</span>
          </div>
        </div>

        <div className="stats">
          <div>
            <b>10+</b>
            <span>Years Experience</span>
          </div>

          <div>
            <b>100+</b>
            <span>Happy Customers</span>
          </div>

          <div>
            <b>25+</b>
            <span>Projects</span>
          </div>

          <div>
            <b>100%</b>
            <span>Commitment</span>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROPERTIES ================= */}

      <section className="section muted">
        <div className="sectionHead">
          <div>
            <p className="eyebrow dark">FEATURED</p>
            <h2>Explore Our Properties</h2>
          </div>

          <a href="/properties">View All →</a>
        </div>

        <div className="grid">
          {properties.map((property, index) => (
            <article className="card" key={property.name}>
              <div
                className={"propertyImage img" + index}
              ></div>

              <div className="cardBody">
                <span className="tag">
                  {property.type}
                </span>

                <h3>{property.name}</h3>

                <p>
                  📍 {property.location}
                </p>

                <a href="/properties">
                  View Details →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section id="services" className="section">
        <p className="eyebrow dark">WHAT WE DO</p>

        <h2>Complete Real Estate Services</h2>

        <div className="services">
          {[
            "Open Plot Development",
            "Residential Properties",
            "Construction Services",
            "Property Consultation"
          ].map((service, index) => (
            <div className="service" key={service}>
              <b>0{index + 1}</b>

              <h3>{service}</h3>

              <p>
                Professional support to help you make confident
                property decisions.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}

      <section
        id="testimonials"
        className="section muted"
      >
        <p className="eyebrow dark">
          TESTIMONIALS
        </p>

        <h2>What Our Customers Say</h2>

        <div className="services">
          <div className="service testimonialCard">
            <div className="stars">
              ★★★★★
            </div>

            <p>
              Excellent support and transparent guidance
              throughout the property selection process.
            </p>

            <b>— Happy Customer</b>
          </div>

          <div className="service testimonialCard">
            <div className="stars">
              ★★★★★
            </div>

            <p>
              The team helped us find the right property
              and explained everything clearly.
            </p>

            <b>— Property Buyer</b>
          </div>

          <div className="service testimonialCard">
            <div className="stars">
              ★★★★★
            </div>

            <p>
              Professional service and great support
              from beginning to end.
            </p>

            <b>— Investor</b>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}

      <section
        id="contact"
        className="section contactSection"
      >
        <div className="contactGrid">

          {/* CONTACT INFORMATION */}

          <div className="contactInfo">
            <p className="eyebrow dark">
              GET IN TOUCH
            </p>

            <h2>Direct Contact</h2>

            {/* CALL */}

            <a
              href="tel:+919494444818"
              className="contactBox"
            >
              <div className="contactIcon">
                📞
              </div>

              <div>
                <small>Call Us</small>

                <h3>+91 9494444818</h3>
              </div>
            </a>

            {/* WHATSAPP */}

            <a
              href="https://wa.me/919494444818"
              target="_blank"
              rel="noopener noreferrer"
              className="contactBox"
            >
              <div className="contactIcon">
                💬
              </div>

              <div>
                <small>WhatsApp</small>

                <h3>Chat With Us</h3>
              </div>
            </a>

            {/* EMAIL */}

            <a
              href="mailto:sreekrishna.housingprojects@gmail.com"
              className="contactBox"
            >
              <div className="contactIcon">
                ✉️
              </div>

              <div>
                <small>Email Us</small>

                <h3>
                  sreekrishna.housingprojects@gmail.com
                </h3>
              </div>
            </a>

            {/* OFFICE LOCATION */}

            <div className="officeLocation">
              <h2>Office Location</h2>

              <p>
                📍 <b>Sree Krishna Housing Projects</b>
              </p>

              <p>
                2nd Floor, American Towers,
                <br />
                Opp. Ruchi Medicals,
                <br />
                Leela Mahal Circle,
                <br />
                Tirupati, Andhra Pradesh
              </p>

              <a
                className="navigateBtn"
                href="https://www.google.com/maps/search/?api=1&query=Sree+Krishna+Housing+Projects+American+Towers+Leela+Mahal+Circle+Tirupati"
                target="_blank"
                rel="noopener noreferrer"
              >
                🧭 Navigate
              </a>
            </div>
          </div>

          {/* CONTACT FORM */}

          <div className="contactForm">
            <p className="eyebrow dark">
              CONTACT FORM
            </p>

            <h2>Send us a Message</h2>

            <p>
              Interested in a property? Have a question?
              Fill out the form below and our team will contact you.
            </p>

            <form>
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Your Name"
              />

              <label>Phone Number</label>

              <input
                type="tel"
                placeholder="+91 9494444818"
              />

              <label>Email (Optional)</label>

              <input
                type="email"
                placeholder="you@example.com"
              />

              <label>Message</label>

              <textarea
                placeholder="How can we help you?"
                rows={5}
              />

              <button
                className="btn gold"
                type="submit"
              >
                Send Message →
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ================= BOOK SITE VISIT SECTION ================= */}

      <section id="visit" className="visit">
        <div>
          <p className="eyebrow">
            BOOK A VISIT
          </p>

          <h2>
            See Your Future Property in Person
          </h2>

          <p>
            Submit your details and our team can contact you
            regarding a site visit.
          </p>

          <a
            className="btn gold"
            href="/visit"
          >
            Schedule Your Visit
          </a>
        </div>

        <SiteVisitForm />
      </section>

      {/* ================= FOOTER ================= */}

      <footer>
        <div className="brand">
          <span>SK</span>

          <div>
            <b>SREE KRISHNA</b>
            <small>HOUSING PROJECTS</small>
          </div>
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