const properties = [
  {
    name: "Premium Open Plots",
    type: "Open Plots",
    location: "Tirupati",
    description:
      "Premium open plots in a developing location with good investment potential."
  },
  {
    name: "Krishna Enclave",
    type: "Residential",
    location: "Tirupati",
    description:
      "A residential property opportunity designed for comfortable living."
  },
  {
    name: "Modern Villas",
    type: "Villas",
    location: "Tirupati",
    description:
      "Modern villa options with spacious layouts and quality surroundings."
  },
  {
    name: "Residential Plots",
    type: "Residential Plots",
    location: "Tirupati",
    description:
      "Residential plots suitable for building your dream home."
  },
  {
    name: "Commercial Property",
    type: "Commercial",
    location: "Tirupati",
    description:
      "Commercial property opportunities in promising locations."
  },
  {
    name: "New Project",
    type: "Upcoming Project",
    location: "Tirupati",
    description:
      "Explore our upcoming real estate development opportunities."
  }
];

export default function Properties() {
  return (
    <main className="propertiesPage">

      {/* HEADER */}

      <header className="nav">

        <div className="brand">
          <span>SK</span>

          <div>
            <b>SREE KRISHNA</b>
            <small>HOUSING PROJECTS</small>
          </div>
        </div>


        <nav>
          <a href="/">Home</a>
          <a href="/properties">Properties</a>
          <a href="/#services">Services</a>
          <a href="/#testimonials">Testimonials</a>
          <a href="/#contact">Contact</a>
        </nav>


        <a className="btn gold" href="/visit">
          Book Site Visit
        </a>

      </header>


      {/* PAGE HEADING */}

      <section className="propertiesHero">

        <p className="eyebrow dark">
          OUR PROPERTIES
        </p>

        <h1>
          Find Your Ideal Property
        </h1>

        <p>
          Explore our available property opportunities in and around
          Tirupati. Find the right property based on your needs and
          investment goals.
        </p>

      </section>


      {/* PROPERTIES GRID */}

      <section className="propertiesContent">

        <div className="propertyGrid">

          {properties.map((property, i) => (

            <article
              className="card"
              key={property.name}
            >

              <div
                className={
                  "propertyImage img" + (i % 3)
                }
              ></div>


              <div className="cardBody">

                <span className="tag">
                  {property.type}
                </span>


                <h3>
                  {property.name}
                </h3>


                <p>
                  📍 {property.location}
                </p>


                <p className="propertyDescription">
                  {property.description}
                </p>


                {/* VIEW DETAILS */}

                <button
                  className="detailsBtn"
                  type="button"
                >
                  View Details
                </button>


                {/* ENQUIRE NOW */}

                <a
                  className="enquireBtn"
                  href="/visit"
                >
                  Enquire Now →
                </a>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* CTA */}

      <section className="propertyCTA">

        <div>

          <p className="eyebrow">
            NEED HELP?
          </p>

          <h2>
            Not Sure Which Property Is Right for You?
          </h2>

          <p>
            Talk to our team and schedule a visit to explore the
            available properties.
          </p>

        </div>


        <a
          href="/visit"
          className="btn gold"
        >
          Book a Site Visit
        </a>

      </section>


      {/* FOOTER */}

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