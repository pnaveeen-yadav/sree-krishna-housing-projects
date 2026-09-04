"use client";

import { useState } from "react";

const properties = [
  {
    id: 1,
    name: "Sree Krishna Heights",
    location: "Tirupati Central",
    propertyType: "Residential",
    category: "Apartment",
    status: "READY TO MOVE",
    price: "₹ 85 Lakhs",
    size: "1850 Sq.Ft",
    details: "3 BHK",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Green Valley Plots",
    location: "Renigunta Road",
    propertyType: "Land",
    category: "Land",
    status: "NEW LAUNCH",
    price: "₹ 45 Lakhs",
    size: "2400 Sq.Ft",
    details: "Plot",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Royal Commercial Complex",
    location: "Chandragiri",
    propertyType: "Commercial",
    category: "Commercial",
    status: "UNDER CONSTRUCTION",
    price: "₹ 2.5 Cr",
    size: "3500 Sq.Ft",
    details: "Office Space",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    name: "Sree Krishna Villas",
    location: "Tirupati",
    propertyType: "Residential",
    category: "Villa",
    status: "READY TO MOVE",
    price: "₹ 1.2 Cr",
    size: "2200 Sq.Ft",
    details: "4 BHK",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    name: "Krishna Enclave",
    location: "Renigunta",
    propertyType: "Residential",
    category: "Apartment",
    status: "READY TO MOVE",
    price: "₹ 65 Lakhs",
    size: "1450 Sq.Ft",
    details: "2 BHK",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    name: "Modern Business Park",
    location: "Chandragiri",
    propertyType: "Commercial",
    category: "Commercial",
    status: "NEW LAUNCH",
    price: "₹ 1.8 Cr",
    size: "2800 Sq.Ft",
    details: "Commercial Space",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Properties() {
  const [location, setLocation] = useState("All Locations");
  const [propertyType, setPropertyType] = useState("All");
  const [budget, setBudget] = useState("Any Budget");

  const filteredProperties = properties.filter((property) => {
    const locationMatch =
      location === "All Locations" ||
      property.location.toLowerCase().includes(location.toLowerCase());

    const typeMatch =
      propertyType === "All" ||
      property.propertyType === propertyType;

    let budgetMatch = true;

    if (budget === "Less than 50L") {
      budgetMatch = property.price.includes("45");
    }

    if (budget === "50L - 1Cr") {
      budgetMatch =
        property.price.includes("65") ||
        property.price.includes("85");
    }

    if (budget === "1 Cr+") {
      budgetMatch =
        property.price.includes("Cr") &&
        !property.price.includes("₹ 2.5 Cr");
    }

    return locationMatch && typeMatch && budgetMatch;
  });

  function clearFilters() {
    setLocation("All Locations");
    setPropertyType("All");
    setBudget("Any Budget");
  }

  return (
    <main className="propertiesPage">

      {/* HEADER */}
      <header className="nav propertiesNav">
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
          <a href="/#services">Services</a>
          <a href="/#testimonials">Testimonials</a>
          <a href="/#contact">Contact</a>
        </nav>

        <a href="/visit" className="btn darkBtn">
          Book Site Visit
        </a>
      </header>


      {/* PAGE HEADER */}
      <section className="propertiesHero">

        <p className="eyebrow dark">
          OUR PROPERTIES
        </p>

        <h1>Find Your Ideal Property</h1>

        <p>
          Explore our available property opportunities in and around Tirupati.
          Find the right property based on your needs and investment goals.
        </p>

      </section>


      {/* PROPERTIES CONTENT */}
      <section className="propertiesLayout">

        {/* FILTER SIDEBAR */}
        <aside className="filterSidebar">

          <div className="filterHeader">
            <h2>
              <span>▽</span> Filters
            </h2>

            <button onClick={clearFilters}>
              Clear All
            </button>
          </div>


          {/* LOCATION */}
          <div className="filterGroup">

            <label>
              ⊙ &nbsp; Location
            </label>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>All Locations</option>
              <option>Tirupati</option>
              <option>Renigunta</option>
              <option>Chandragiri</option>
            </select>

          </div>


          {/* PROPERTY TYPE */}
          <div className="filterGroup">

            <label>
              ▫ &nbsp; Property Type
            </label>

            <div className="propertyTypeButtons">

              <button
                className={
                  propertyType === "All"
                    ? "filterActive"
                    : ""
                }
                onClick={() => setPropertyType("All")}
              >
                All
              </button>

              <button
                className={
                  propertyType === "Residential"
                    ? "filterActive"
                    : ""
                }
                onClick={() => setPropertyType("Residential")}
              >
                Residential
              </button>

              <button
                className={
                  propertyType === "Commercial"
                    ? "filterActive"
                    : ""
                }
                onClick={() => setPropertyType("Commercial")}
              >
                Commercial
              </button>

              <button
                className={
                  propertyType === "Land"
                    ? "filterActive"
                    : ""
                }
                onClick={() => setPropertyType("Land")}
              >
                Land
              </button>

            </div>

          </div>


          {/* BUDGET */}
          <div className="filterGroup">

            <label>
              ◇ &nbsp; Budget
            </label>

            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option>Any Budget</option>
              <option>Less than 50L</option>
              <option>50L - 1Cr</option>
              <option>1 Cr+</option>
            </select>

          </div>


          <button
            className="applyFiltersBtn"
          >
            Apply Filters
          </button>

        </aside>


        {/* PROPERTY GRID */}
        <div className="propertyCardsContainer">

          {filteredProperties.length > 0 ? (
            <div className="propertiesGrid">

              {filteredProperties.map((property) => (

                <article
                  className="propertyListingCard"
                  key={property.id}
                >

                  <div
                    className="propertyListingImage"
                    style={{
                      backgroundImage: `url(${property.image})`,
                    }}
                  >

                    <div className="propertyBadges">

                      <span className="statusBadge">
                        {property.status}
                      </span>

                      <span className="categoryBadge">
                        {property.category.toUpperCase()}
                      </span>

                    </div>

                  </div>


                  <div className="propertyListingBody">

                    <h2>
                      {property.name}
                    </h2>


                    <p className="propertyLocation">
                      ⊙ &nbsp; {property.location}
                    </p>


                    <div className="propertyDivider"></div>


                    <div className="propertyFeatures">

                      <span>
                        🛏 &nbsp; {property.details}
                      </span>

                      <span className="featureDivider"></span>

                      <span>
                        📐 &nbsp; {property.size}
                      </span>

                    </div>


                    <div className="propertyDivider"></div>


                    <div className="propertyBottom">

                      <strong>
                        {property.price}
                      </strong>


                      <div className="propertyActions">

                        <button className="detailsBtn">
                          Details
                        </button>

                        <a
                          href="/visit"
                          className="enquireBtn"
                        >
                          Enquire
                        </a>

                      </div>

                    </div>

                  </div>

                </article>

              ))}

            </div>
          ) : (

            <div className="noProperties">
              <h2>No Properties Found</h2>

              <p>
                Try changing your filters.
              </p>

              <button onClick={clearFilters}>
                Clear Filters
              </button>
            </div>

          )}

        </div>

      </section>

    </main>
  );
}