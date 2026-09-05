import SiteVisitForm from "./components/SiteVisitForm";

const properties = [
  {
    name: "Premium Open Plots",
    location: "Tirupati",
    type: "Open Plots",
    image: "/property1.png",
  },
  {
    name: "Krishna Enclave",
    location: "Tirupati",
    type: "Residential",
    image: "/property2.png",
  },
  {
    name: "Modern Villas",
    location: "Tirupati",
    type: "Villas",
    image: "/property3.png",
  },
];

export default function Home() {
  return (
    <main>
      {/* ================= HEADER ================= */}

      <header className="nav">
        <a href="/" className="brand">
          <img
            src="/logo.webp"
            alt="Sree Krishna Housing Projects"
          />
        </a>

        <nav>
          <a href="/">Home</a>
          <a href="/properties">Properties</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>

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
          {properties.map((property) => (
            <article className="card" key={property.name}>

              {/* PROPERTY IMAGE */}

              <div className="propertyImage">
                <img
                  src={property.image}
                  alt={property.name}
                />
              </div>

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
            "Property Consultation",
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

      {/* ================= CONTACT ================= */}

      <section
        id="contact"
        className="section contactSection"
      >

        {/* CONTACT HEADING */}

        <div className="contactSectionHeading">
          <h2>Get in Touch</h2>

          <p>
            We are here to answer your questions and guide you home.
          </p>
        </div>


        <div className="contactGrid">

          {/* ================= LEFT SIDE ================= */}

          <div className="contactInfo">

            <h2>Direct Contact</h2>


            {/* CALL US */}

            <a
              href="tel:+916303688516"
              className="contactBox"
            >
              <div className="contactIcon">
                📞
              </div>

              <div>
                <small>Call Us</small>

                <h3>+91 6303688516</h3>
              </div>
            </a>


            {/* WHATSAPP */}

            <a
              href="https://wa.me/916303688516"
              target="_blank"
              rel="noopener noreferrer"
              className="contactBox"
            >
              <div className="contactIcon">
                💬
              </div>

              <div>
                <small>WhatsApp</small>

                <h3>Chat Now</h3>
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

            <div className="contactDetailsBlock">

              <div className="contactDetailsIcon">
                📍
              </div>

              <div>
                <h3>Sree Krishna Housing Projects</h3>

                <p>
                  2nd Floor, American Towers,
                  <br />
                  Opp. Ruchi Medicals,
                  Leela Mahal Circle,
                  <br />
                  TML By Pass Road,
                  Tirupati - 517501
                </p>
              </div>

            </div>


            {/* BUSINESS HOURS */}

            <div className="contactDetailsBlock">

              <div className="contactDetailsIcon">
                ◷
              </div>

              <div>
                <h3>Business Hours</h3>

                <p>
                  Mon - Sat: 9:00 AM - 6:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>

            </div>


            {/* GOOGLE MAP */}

            <div className="contactMap">

              <iframe
                title="Sree Krishna Housing Projects Location"
                src="https://www.google.com/maps/search/?api=1&query=Saideep+Towers%2C+20-03%2C131%2C+B4%2C+Leela+Mahal+Rd%2C+Srinivasa+Nagar%2C+Akkarampalle%2C+Tirupati%2C+Andhra+Pradesh+517501&utm_source=chatgpt.com"
                width="100%"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

            </div>

          </div>


          {/* ================= RIGHT SIDE - CONTACT FORM ================= */}

          <div className="contactForm">

            <h2>Send us a Message</h2>

            <p>
              Interested in a property? Have a question?
              Fill out the form below.
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
                placeholder="+91 6303688516"
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

      {/* ================= BOOK SITE VISIT ================= */}

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