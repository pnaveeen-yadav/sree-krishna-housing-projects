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
    image: "img0",
  },
  {
    name: "Krishna Enclave",
    location: "Tirupati",
    type: "Residential",
    size: "1200 Sq.ft",
    price: "₹ 18 Lakhs",
    image: "img1",
  },
  {
    name: "Modern Villas",
    location: "Tirupati",
    type: "Villas",
    size: "2000 Sq.ft",
    price: "₹ 45 Lakhs",
    image: "img2",
  },
  {
    name: "Residential Plots",
    location: "Tirupati",
    type: "Open Plots",
    size: "1800 Sq.ft",
    price: "₹ 15 Lakhs",
    image: "img0",
  },
  {
    name: "Commercial Property",
    location: "Tirupati",
    type: "Commercial",
    size: "2500 Sq.ft",
    price: "₹ 60 Lakhs",
    image: "img1",
  },
  {
    name: "New Project",
    location: "Tirupati",
    type: "Residential",
    size: "1400 Sq.ft",
    price: "₹ 20 Lakhs",
    image: "img2",
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
      {/* HEADER */}
      <header className="nav">
        <Link href="/" className="brand">
          <span>SK</span>

          <div>
            <b>SREE KRISHNA</b>
            <small>HOUSING PROJECTS</small>
          </div>
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

      {/* HERO */}
      <section className="propertiesHero">
        <div className="propertiesHeroContent">
          <p className="eyebrow dark">OUR PROPERTIES</p>

          <h1>Find Your Ideal Property</h1>

          <p>
            Explore our carefully selected properties in prime locations.
            Find the perfect open plot, residential property, villa, or
            commercial investment opportunity.
          </p>
        </div>
      </section>

      {/* PROPERTIES SECTION */}
      <section className="propertiesSection">
        <div className="propertiesLayout">

          {/* FILTER PANEL */}
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
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>All Locations</option>
                <option>Tirupati</option>
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
                      selectedType === type ? "active" : ""
                    }`}
                    onClick={() => setSelectedType(type)}
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

          {/* PROPERTIES GRID */}
          <div className="propertiesGrid">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <article
                  className="propertyCard"
                  key={property.name}
                >
                  {/* IMAGE */}
                  <div
                    className={`propertyCardImage ${property.image}`}
                  >
                    <div className="propertyBadges">
                      <span className="statusBadge">
                        AVAILABLE
                      </span>

                      <span className="categoryBadge">
                        {property.type}
                      </span>
                    </div>
                  </div>

                  {/* CARD CONTENT */}
                  <div className="propertyCardBody">
                    <h2>{property.name}</h2>

                    <p className="propertyLocation">
                      <span>📍</span>
                      {property.location}
                    </p>

                    <div className="propertyDivider"></div>

                    {/* PROPERTY INFO */}
                    <div className="propertyInfo">
                      <div>
                        <span className="propertyIcon">▣</span>
                        <span>{property.type}</span>
                      </div>

                      <div className="infoDivider"></div>

                      <div>
                        <span className="propertyIcon">↔</span>
                        <span>{property.size}</span>
                      </div>
                    </div>

                    <div className="propertyDivider"></div>

                    {/* PRICE + ENQUIRE */}
                    <div className="propertyBottom">
                      <strong>{property.price}</strong>

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
                <h2>No Properties Found</h2>

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