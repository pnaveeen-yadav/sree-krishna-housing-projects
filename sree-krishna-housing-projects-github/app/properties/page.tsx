"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { properties } from "../../lib/properties";

export default function Properties() {
  const [selectedType, setSelectedType] = useState("All");

  const [location, setLocation] =
    useState("All Locations");

  const [budget, setBudget] =
    useState("Any Budget");

  const propertyTypes = [
    "All",
    "Open Plots",
    "Residential",
    "Villas",
    "Commercial",
  ];

  const locations = [
    "All Locations",
    ...Array.from(
      new Set(properties.map((property) => property.location))
    ),
  ];

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const typeMatch =
        selectedType === "All" ||
        property.type === selectedType;

      const locationMatch =
        location === "All Locations" ||
        property.location === location;

      let budgetMatch = true;

      const priceNumber = Number(
        property.price
          .replace(/[^\d.]/g, "")
          .replace("Lakhs", "")
      );

      if (budget === "Less than 50L") {
        budgetMatch = priceNumber < 50;
      }

      if (budget === "50L - 1Cr") {
        budgetMatch =
          priceNumber >= 50 &&
          priceNumber <= 100;
      }

      if (budget === "1 Cr+") {
        budgetMatch = priceNumber > 100;
      }

      return (
        typeMatch &&
        locationMatch &&
        budgetMatch
      );
    });
  }, [
    selectedType,
    location,
    budget,
  ]);

  function clearFilters() {
    setSelectedType("All");

    setLocation("All Locations");

    setBudget("Any Budget");
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

          <Link href="/">
            Home
          </Link>

          <Link href="/properties">
            Properties
          </Link>

          <Link href="/#services">
            Services
          </Link>

          <Link href="/#testimonials">
            Testimonials
          </Link>

          <Link href="/#contact">
            Contact
          </Link>

        </nav>

        <Link
          href="/visit"
          className="btn gold"
        >
          Book Site Visit
        </Link>

      </header>


      {/* ================= HERO ================= */}

      <section
        className="propertiesHero"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.96) 0%,
              rgba(255, 255, 255, 0.88) 35%,
              rgba(255, 255, 255, 0.45) 58%,
              rgba(255, 255, 255, 0.08) 100%
            ),
            url("/open-plots-bg.png")
          `,

          backgroundSize: "cover",

          backgroundPosition: "center",

          backgroundRepeat: "no-repeat",
        }}
      >

        <div className="propertiesHeroContent">

          <p className="eyebrow dark">
            OUR PROPERTIES
          </p>

          <h1>
            Find Your Ideal Property
          </h1>

          <p>
            Explore our carefully selected properties
            in prime locations. Find the perfect open
            plot, residential property, villa, or
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
                <span>▽</span>
                Filters
              </h2>

              <button
                type="button"
                className="clearFilters"
                onClick={clearFilters}
              >
                Clear All
              </button>

            </div>


            <div className="filterDivider" />


            {/* ================= LOCATION ================= */}

            <div className="filterGroup">

              <label>
                <span>⌾</span>
                Location
              </label>

              <select
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              >

                {locations.map(
                  (locationName) => (
                    <option
                      key={locationName}
                      value={locationName}
                    >
                      {locationName}
                    </option>
                  )
                )}

              </select>

            </div>


            {/* ================= PROPERTY TYPE ================= */}

            <div className="filterGroup">

              <label>
                <span>▦</span>
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


            {/* ================= BUDGET ================= */}

            <div className="filterGroup">

              <label>
                <span>◇</span>
                Budget
              </label>

              <select
                value={budget}
                onChange={(e) =>
                  setBudget(e.target.value)
                }
              >

                <option>
                  Any Budget
                </option>

                <option>
                  Less than 50L
                </option>

                <option>
                  50L - 1Cr
                </option>

                <option>
                  1 Cr+
                </option>

              </select>

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
                  key={property.id}
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

                        {property.status}

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


                    <div className="propertyDivider" />


                    {/* ================= PROPERTY INFORMATION ================= */}

                    <div className="propertyInfo">

                      <div>

                        <span className="propertyIcon">
                          ▣
                        </span>

                        <span>
                          {property.type}
                        </span>

                      </div>


                      <div className="infoDivider" />


                      <div>

                        <span className="propertyIcon">
                          ↔
                        </span>

                        <span>
                          {property.size}
                        </span>

                      </div>

                    </div>


                    <div className="propertyDivider" />


                    {/* ================= PRICE & ACTIONS ================= */}

                    <div className="propertyBottom">

                      <strong>

                        {property.price}

                      </strong>


                      <div className="propertyActions">


                        {/* DETAILS */}

                        <Link
                          href={`/properties/${property.id}`}
                          className="detailsButton"
                        >

                          Details

                        </Link>


                        {/* ENQUIRE */}

                        <a
                          href={`mailto:sreekrishna.housingprojects@gmail.com?subject=${encodeURIComponent(
                            `Property Enquiry - ${property.name}`
                          )}&body=${encodeURIComponent(
                            `Hello Sree Krishna Housing Projects,

I am interested in the following property:

Property: ${property.name}
Location: ${property.location}
Price: ${property.price}

Please share more details.

Name:
Phone:`
                          )}`}

                          className="enquireButton"
                        >

                          Enquire

                        </a>


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
                  Try changing your filters to see
                  more properties.
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