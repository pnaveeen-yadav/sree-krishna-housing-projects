"use client";

import { useState } from "react";
import Link from "next/link";

type Property = {
  id: number;
  title: string;
  location: string;
  type: string;
  propertyType: "Residential" | "Commercial" | "Land";
  status: string;
  category: string;
  details: string;
  area: string;
  price: string;
  image: string;
};

const properties: Property[] = [
  {
    id: 1,
    title: "Sree Krishna Heights",
    location: "Tirupati Central",
    type: "3 BHK",
    propertyType: "Residential",
    status: "READY TO MOVE",
    category: "APARTMENT",
    details: "3 BHK",
    area: "1850 Sq.Ft",
    price: "₹ 85 Lakhs",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Green Valley Plots",
    location: "Renigunta Road",
    type: "Plot",
    propertyType: "Land",
    status: "NEW LAUNCH",
    category: "LAND",
    details: "Plot",
    area: "2400 Sq.Ft",
    price: "₹ 45 Lakhs",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Royal Commercial Complex",
    location: "Chandragiri",
    type: "Office Space",
    propertyType: "Commercial",
    status: "UNDER CONSTRUCTION",
    category: "COMMERCIAL",
    details: "Office Space",
    area: "3500 Sq.Ft",
    price: "₹ 2.5 Cr",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Sree Krishna Villas",
    location: "Tirupati",
    type: "4 BHK",
    propertyType: "Residential",
    status: "READY TO MOVE",
    category: "VILLA",
    details: "4 BHK",
    area: "2200 Sq.Ft",
    price: "₹ 1.2 Cr",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Krishna Enclave",
    location: "Renigunta",
    type: "2 BHK",
    propertyType: "Residential",
    status: "READY TO MOVE",
    category: "APARTMENT",
    details: "2 BHK",
    area: "1450 Sq.Ft",
    price: "₹ 65 Lakhs",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Modern Business Park",
    location: "Chandragiri",
    type: "Commercial Space",
    propertyType: "Commercial",
    status: "NEW LAUNCH",
    category: "COMMERCIAL",
    details: "Commercial Space",
    area: "2800 Sq.Ft",
    price: "₹ 1.8 Cr",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Properties() {
  const [selectedLocation, setSelectedLocation] =
    useState("All Locations");

  const [selectedType, setSelectedType] =
    useState("All");

  const [selectedBudget, setSelectedBudget] =
    useState("Any Budget");

  const [filteredProperties, setFilteredProperties] =
    useState<Property[]>(properties);

  function applyFilters() {
    let result = [...properties];

    if (selectedLocation !== "All Locations") {
      result = result.filter(
        (property) => property.location === selectedLocation
      );
    }

    if (selectedType !== "All") {
      result = result.filter(
        (property) =>
          property.propertyType === selectedType
      );
    }

    if (selectedBudget !== "Any Budget") {
      result = result.filter((property) => {
        if (selectedBudget === "Under ₹50 Lakhs") {
          return property.price.includes("45");
        }

        if (selectedBudget === "₹50 Lakhs - ₹1 Cr") {
          return (
            property.price.includes("85") ||
            property.price.includes("65")
          );
        }

        if (selectedBudget === "Above ₹1 Cr") {
          return (
            property.price.includes("Cr")
          );
        }

        return true;
      });
    }

    setFilteredProperties(result);
  }

  function clearFilters() {
    setSelectedLocation("All Locations");
    setSelectedType("All");
    setSelectedBudget("Any Budget");
    setFilteredProperties(properties);
  }

  return (
    <main className="propertiesPage">

      {/* ================= HEADER ================= */}

      <header className="nav propertiesNav">

        <Link href="/" className="brand">
          <span>SK</span>

          <div>
            <b>SREE KRISHNA</b>
            <small>HOUSING PROJECTS</small>
          </div>
        </Link>

        <nav>
          <Link href="/">Home</Link>

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


      {/* ================= PAGE HEADER ================= */}

      <section className="propertiesHero">

        <div className="propertiesHeroContent">

          <p className="eyebrow">
            EXPLORE PROPERTIES
          </p>

          <h1>
            Find Your Ideal Property
          </h1>

          <p>
            Explore our available property opportunities
            in and around Tirupati. Find the right
            property based on your needs and investment
            goals.
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


            {/* LOCATION */}

            <div className="filterGroup">

              <label>
                <span>⌾</span>
                Location
              </label>

              <select
                value={selectedLocation}
                onChange={(e) =>
                  setSelectedLocation(e.target.value)
                }
              >
                <option>
                  All Locations
                </option>

                <option>
                  Tirupati Central
                </option>

                <option>
                  Renigunta Road
                </option>

                <option>
                  Chandragiri
                </option>

                <option>
                  Tirupati
                </option>

                <option>
                  Renigunta
                </option>

              </select>

            </div>


            {/* PROPERTY TYPE */}

            <div className="filterGroup">

              <label>
                <span>▦</span>
                Property Type
              </label>

              <div className="propertyTypeButtons">

                <button
                  type="button"
                  className={
                    selectedType === "All"
                      ? "filterChip active"
                      : "filterChip"
                  }
                  onClick={() =>
                    setSelectedType("All")
                  }
                >
                  All
                </button>

                <button
                  type="button"
                  className={
                    selectedType === "Residential"
                      ? "filterChip active"
                      : "filterChip"
                  }
                  onClick={() =>
                    setSelectedType("Residential")
                  }
                >
                  Residential
                </button>

                <button
                  type="button"
                  className={
                    selectedType === "Commercial"
                      ? "filterChip active"
                      : "filterChip"
                  }
                  onClick={() =>
                    setSelectedType("Commercial")
                  }
                >
                  Commercial
                </button>

                <button
                  type="button"
                  className={
                    selectedType === "Land"
                      ? "filterChip active"
                      : "filterChip"
                  }
                  onClick={() =>
                    setSelectedType("Land")
                  }
                >
                  Land
                </button>

              </div>

            </div>


            {/* BUDGET */}

            <div className="filterGroup">

              <label>
                <span>◇</span>
                Budget
              </label>

              <select
                value={selectedBudget}
                onChange={(e) =>
                  setSelectedBudget(e.target.value)
                }
              >
                <option>
                  Any Budget
                </option>

                <option>
                  Under ₹50 Lakhs
                </option>

                <option>
                  ₹50 Lakhs - ₹1 Cr
                </option>

                <option>
                  Above ₹1 Cr
                </option>

              </select>

            </div>


            <button
              type="button"
              className="applyFiltersButton"
              onClick={applyFilters}
            >
              Apply Filters
            </button>

          </aside>


          {/* ================= PROPERTY GRID ================= */}

          <div className="propertiesGrid">

            {filteredProperties.length === 0 ? (

              <div className="noProperties">

                <h2>
                  No Properties Found
                </h2>

                <p>
                  Try changing your filters.
                </p>

                <button
                  type="button"
                  className="btn dark"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>

              </div>

            ) : (

              filteredProperties.map((property) => (

                <article
                  className="propertyCard"
                  key={property.id}
                >

                  {/* IMAGE */}

                  <div
                    className="propertyCardImage"
                    style={{
                      backgroundImage: `url(${property.image})`,
                    }}
                  >

                    <div className="propertyBadges">

                      <span className="statusBadge">
                        {property.status}
                      </span>

                      <span className="categoryBadge">
                        {property.category}
                      </span>

                    </div>

                  </div>


                  {/* CONTENT */}

                  <div className="propertyCardBody">

                    <h2>
                      {property.title}
                    </h2>


                    <p className="propertyLocation">

                      <span>⌾</span>

                      {property.location}

                    </p>


                    <div className="propertyDivider" />


                    <div className="propertyInfo">

                      <div>

                        <span className="propertyIcon">
                          ▱
                        </span>

                        {property.details}

                      </div>


                      <div className="infoDivider" />


                      <div>

                        <span className="propertyIcon">
                          ◱
                        </span>

                        {property.area}

                      </div>

                    </div>


                    <div className="propertyDivider" />


                    <div className="propertyBottom">

                      <strong>
                        {property.price}
                      </strong>


                      <div className="propertyActions">

                        <button
                          type="button"
                          className="detailsButton"
                        >
                          Details
                        </button>


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

            )}

          </div>

        </div>

      </section>

    </main>
  );
}