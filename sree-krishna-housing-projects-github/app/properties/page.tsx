"use client";

import Link from "next/link";
import { useState } from "react";

const properties = [
  {
    name: "Premium Open Plots",
    location: "Tirupati",
    type: "Open Plots",
    size: "1500 Sq.ft",
    price: "₹ 12 Lakhs",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Krishna Enclave",
    location: "Tirupati",
    type: "Residential",
    size: "1200 Sq.ft",
    price: "₹ 18 Lakhs",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Modern Villas",
    location: "Tirupati",
    type: "Villas",
    size: "2000 Sq.ft",
    price: "₹ 45 Lakhs",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Residential Plots",
    location: "Tirupati",
    type: "Open Plots",
    size: "1800 Sq.ft",
    price: "₹ 15 Lakhs",
    image:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Commercial Property",
    location: "Tirupati",
    type: "Commercial",
    size: "2500 Sq.ft",
    price: "₹ 60 Lakhs",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "New Project",
    location: "Tirupati",
    type: "Residential",
    size: "1400 Sq.ft",
    price: "₹ 20 Lakhs",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Properties() {
  const [selectedType, setSelectedType] = useState("All");
  const [location, setLocation] = useState("All Locations");

  const propertyTypes = [
    "All",
    "Open Plots",
    "Residential",
    "Villas",
    "Commercial",
  ];

  const filteredProperties = properties.filter((property) => {
    const typeMatch =
      selectedType === "All" || property.type === selectedType;

    const locationMatch =
      location === "All Locations" ||
      property.location === location;

    return typeMatch && locationMatch;
  });

  function clearFilters() {
    setSelectedType("All");
    setLocation("All Locations");
  }

  return (
    <main className="propertiesPage">

      {/* ================= HEADER ================= */}

      <header className="nav">

        <Link href="/" className="brand">
          <img
            src="/logo.webp"
            alt="Sree Krishna Housing Projects"
          />
        </Link>

        <nav>
          <Link href="/">Home</Link>

          <Link href="/properties">
            Properties
          </Link>

          <Link href="/#services">
            Services
          </Link>

          <Link href="/#contact">
            Contact
          </Link>
        </nav>

        <Link href="/visit" className="btn gold">
          Book Site Visit
        </Link>

      </header>


      {/* ================= HERO ================= */}

      <section className="propertiesHero">

        <div className="propertiesHeroContent">

          <p className="eyebrow dark">
            OUR PROPERTIES
          </p>

          <h1>
            Find Your Ideal Property
          </h1>

          <p>
            Explore our carefully selected properties in prime locations.
            Find the perfect open plot, residential property, villa, or
            commercial investment opportunity.
          </p>

        </div>

      </section>


      {/* ================= PROPERTIES ================= */}

      <section className="propertiesSection">

        <div className="propertiesLayout">


          {/* ================= FILTERS ================= */}

          <aside className="filtersPanel">

            <div className="filtersHeader">

              <h2>
                <span>⚙</span>
                Filters
              </h2>

              <button
                type="button"
                className="clearFilters"
                onClick={clearFilters}
              >
                Clear
              </button>

            </div>


            <div className="filterDivider"></div>


            {/* LOCATION */}

            <div className="filterGroup">

              <label>
                <span>📍</span>
                Location
              </label>

              <select
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              >
                <option>
                  All Locations
                </option>

                <option>
                  Tirupati
                </option>

              </select>

            </div>


            {/* PROPERTY TYPE */}

            <div className="filterGroup">

              <label>
                <span>⌂</span>
                Property Type
              </label>


              <div className="propertyTypeButtons">

                {propertyTypes.map((type) => (

                  <button
                    key={type}
                    type="button"
                    className={`filterChip ${
                      selectedType === type
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedType(type)
                    }
                  >
                    {type}
                  </button>

                ))}

              </div>

            </div>


            <button
              type="button"
              className="applyFiltersButton"
            >
              Apply Filters
            </button>

          </aside>


          {/* ================= PROPERTY GRID ================= */}

          <div className="propertiesGrid">

            {filteredProperties.length > 0 ? (

              filteredProperties.map((property) => (

                <article
                  className="propertyCard"
                  key={property.name}
                >


                  {/* ================= IMAGE ================= */}

                  <div className="propertyCardImage">

                    <img
                      src={property.image}
                      alt={property.name}
                      className="propertyImage"
                    />


                    <div className="propertyBadges">

                      <span className="statusBadge">
                        AVAILABLE
                      </span>


                      <span className="categoryBadge">
                        {property.type}
                      </span>

                    </div>

                  </div>


                  {/* ================= CONTENT ================= */}

                  <div className="propertyCardBody">

                    <h2>
                      {property.name}
                    </h2>


                    <p className="propertyLocation">

                      <span>
                        📍
                      </span>

                      {property.location}

                    </p>


                    <div className="propertyDivider"></div>


                    {/* PROPERTY INFORMATION */}

                    <div className="propertyInfo">


                      <div>

                        <span className="propertyIcon">
                          ▣
                        </span>

                        <span>
                          {property.type}
                        </span>

                      </div>


                      <div className="infoDivider"></div>


                      <div>

                        <span className="propertyIcon">
                          ↔
                        </span>

                        <span>
                          {property.size}
                        </span>

                      </div>

                    </div>


                    <div className="propertyDivider"></div>


                    {/* PRICE */}

                    <div className="propertyBottom">

                      <strong>
                        {property.price}
                      </strong>


                      <div className="propertyActions">

                        <Link
                          href="/visit"
                          className="enquireButton"
                        >
                          Enquire
                        </Link>

                      </div>

                    </div>

                  </div>

                </article>

              ))

            ) : (

              <div className="noProperties">

                <h2>
                  No Properties Found
                </h2>

                <p>
                  Try changing your filters to see more properties.
                </p>


                <button
                  type="button"
                  className="btn gold"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}