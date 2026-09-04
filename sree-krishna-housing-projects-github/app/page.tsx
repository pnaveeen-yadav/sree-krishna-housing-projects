import SiteVisitForm from "../components/SiteVisitForm";

const properties = [
  {
    name: "Premium Open Plots",
    location: "Tirupati",
    type: "Open Plots",
  },
  {
    name: "Krishna Enclave",
    location: "Tirupati",
    type: "Residential",
  },
  {
    name: "Modern Villas",
    location: "Tirupati",
    type: "Villas",
  },
];

export default function Home() {
  return (
    <main>

      {/* NAVIGATION */}
      <header className="nav">
        <div className="brand">
          <span>SK</span>

          <div>
            <b>SREE KRISHNA</b>
            <small>HOUSING PROJECTS</small>
          </div>
        </div>

        <nav>
          <a href="#about">About</a>

          <a href="/properties">
            Properties
          </a>

          <a href="#services">
            Services
          </a>

          <a href="#contact">
            Contact
          </a>
        </nav>

        <a
          className="btn gold"
          href="#visit"
        >
          Book Site Visit
        </a>
      </header>


      {/* HERO SECTION */}
      <section className="hero">
        <div className="heroOverlay">

          <p className="eyebrow">
            TIRUPATI • REAL ESTATE • CONSTRUCTION
          </p>

          <h1>
            Find a Place You’ll Love to Call{" "}
            <em>Home.</em>
          </h1>

          <p>
            Discover quality open plots, residential properties and
            construction opportunities with Sree Krishna Housing Projects.
          </p>

          <div className="actions">

            <a
              className="btn gold"
              href="/properties"
            >
              Explore Properties
            </a>

            <a
              className="btn outline"
              href="#visit"
            >
              Book a Site Visit
            </a>

          </div>
        </div>
      </section>


      {/* ABOUT SECTION */}
      <section
        id="about"
        className="section split"
      >

        <div>
          <p className="eyebrow dark">
            ABOUT US
          </p>

          <h2>
            Your Trusted Property Partner in Tirupati
          </h2>

          <p>
            We help customers explore carefully selected property
            opportunities with a focus on transparency, quality and
            customer support.
          </p>

          <div className="checks">

            <span>
              ✓ Transparent Process
            </span>

            <span>
              ✓ Prime Locations
            </span>

            <span>
              ✓ Customer Support
            </span>

            <span>
              ✓ Investment Guidance
            </span>

          </div>
        </div>


        {/* STATS */}
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


      {/* FEATURED PROPERTIES */}
      <section className="section muted">

        <div className="sectionHead">

          <div>
            <p className="eyebrow dark">
              FEATURED
            </p>

            <h2>
              Explore Our Properties
            </h2>
          </div>

          <a href="/properties">
            View All →
          </a>

        </div>


        <div className="grid">

          {properties.map((p, i) => (

            <article
              className="card"
              key={p.name}
            >

              <div
                className={"propertyImage img" + i}
              />

              <div className="cardBody">

                <span className="tag">
                  {p.type}
                </span>

                <h3>
                  {p.name}
                </h3>

                <p>
                  📍 {p.location}
                </p>

                <a href="/properties">
                  View Details →
                </a>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* SERVICES */}
      <section
        id="services"
        className="section"
      >

        <p className="eyebrow dark">
          WHAT WE DO
        </p>

        <h2>
          Complete Real Estate Services
        </h2>


        <div className="services">

          {[
            "Open Plot Development",
            "Residential Properties",
            "Construction Services",
            "Property Consultation",
          ].map((service, i) => (

            <div
              className="service"
              key={service}
            >

              <b>
                0{i + 1}
              </b>

              <h3>
                {service}
              </h3>

              <p>
                Professional support to help you make confident
                property decisions.
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="section contactSection"
      >

        <div className="contactGrid">


          {/* LEFT SIDE - CONTACT INFO */}
          <div className="contactInfo">

            <h2>
              Direct Contact
            </h2>


            {/* PHONE */}
            <a
              href="tel:+919494444818"
              className="contactBox"
            >

              <div className="contactIcon">
                📞
              </div>

              <div>
                <small>
                  Call Us
                </small>

                <h3>
                  +91 9494444818
                </h3>
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
                <small>
                  WhatsApp
                </small>

                <h3>
                  Chat Now
                </h3>
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
                <small>
                  Email Us
                </small>

                <h3>
                  sreekrishna.housingprojects@gmail.com
                </h3>
              </div>

            </a>


            {/* OFFICE LOCATION */}
            <div className="officeLocation">

              <h2>
                Office Location
              </h2>

              <p>
                📍{" "}
                <b>
                  Sree Krishna Housing Projects
                </b>
              </p>

              <p>
                2nd Floor, American Towers,
                <br />

                Opp. Ruchi Medicals,
                Leela Mahal Circle,
                <br />

                Tirupati, Andhra Pradesh
              </p>

            </div>

          </div>


          {/* RIGHT SIDE - CONTACT FORM */}
          <div className="contactForm">

            <h2>
              Send us a Message
            </h2>

            <p>
              Interested in a property? Have a question?
              Fill out the form below.
            </p>


            <form>

              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="Your Name"
                required
              />


              <label>
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="+91 9494444818"
                required
              />


              <label>
                Email (Optional)
              </label>

              <input
                type="email"
                placeholder="you@example.com"
              />


              <label>
                Message
              </label>

              <textarea
                placeholder="How can we help you?"
                rows={5}
                required
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


      {/* SITE VISIT SECTION */}
      <section
        id="visit"
        className="visit"
      >

        <div>

          <p className="eyebrow">
            BOOK A VISIT
          </p>

          <h2>
            See Your Future Property in Person
          </h2>

          <p>
            Submit your details and our team can contact you regarding
            a site visit.
          </p>

        </div>


        <SiteVisitForm />

      </section>


      {/* FOOTER */}
      <footer>

        <div className="brand">

          <span>
            SK
          </span>

          <div>

            <b>
              SREE KRISHNA
            </b>

            <small>
              HOUSING PROJECTS
            </small>

          </div>

        </div>


        <p>
          Trusted Real Estate & Construction Experts in Tirupati.
        </p>


        <small>
          © {new Date().getFullYear()} Sree Krishna Housing Projects
        </small>

      </footer>

    </main>
  );
}