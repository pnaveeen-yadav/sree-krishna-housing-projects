"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { supabase } from "@/lib/supabase";

interface Property {
  id: string;

  title: string;
  location: string | null;

  property_type: string | null;

  area: string | null;
  price: string | null;

  main_image: string | null;

  image_urls: string[] | null;

  gallery_images: string[] | null;

  status: string | null;

  project_status: string | null;

  is_active: boolean | null;

  display_order: number | null;
}

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedType, setSelectedType] =
    useState("All");

  const [location, setLocation] =
    useState("All Locations");

  const [budget, setBudget] =
    useState("Any Budget");


  /*
    ========================================
    LOAD PROPERTIES FROM SUPABASE
    ========================================
  */

  useEffect(() => {
    loadProperties();
  }, []);


  const loadProperties = async () => {
    setLoading(true);

    setError("");

    const { data, error } = await supabase
      .from("properties")
      .select(`
        id,
        title,
        location,
        property_type,
        area,
        price,
        main_image,
        image_urls,
        gallery_images,
        status,
        project_status,
        is_active,
        display_order
      `)
      .eq("is_active", true)
      .order("display_order", {
        ascending: true,
      });


    if (error) {
      console.error(
        "Error loading properties:",
        error
      );

      setError(
        "Unable to load properties. Please try again."
      );

      setLoading(false);

      return;
    }


    setProperties(data || []);

    setLoading(false);
  };


  /*
    ========================================
    PROPERTY TYPES
    ========================================
  */

  const propertyTypes = useMemo(() => {
    const types = properties
      .map(
        (property) =>
          property.property_type
      )
      .filter(
        (
          type
        ): type is string =>
          Boolean(type)
      );

    return [
      "All",
      ...Array.from(new Set(types)),
    ];
  }, [properties]);


  /*
    ========================================
    LOCATIONS
    ========================================
  */

  const locations = useMemo(() => {
    const propertyLocations = properties
      .map(
        (property) =>
          property.location
      )
      .filter(
        (
          propertyLocation
        ): propertyLocation is string =>
          Boolean(propertyLocation)
      );

    return [
      "All Locations",
      ...Array.from(
        new Set(propertyLocations)
      ),
    ];
  }, [properties]);


  /*
    ========================================
    PRICE CONVERTER

    Supports examples like:

    ₹ 12 Lakhs
    ₹ 60 Lakhs
    ₹ 1 Cr
    ₹ 1.5 Cr
    50 Lakhs
    ========================================
  */

  function getPriceInLakhs(
    price: string | null
  ) {
    if (!price) {
      return null;
    }


    const normalizedPrice =
      price
        .toLowerCase()
        .replace(/,/g, "");


    const numberMatch =
      normalizedPrice.match(
        /[\d.]+/
      );


    if (!numberMatch) {
      return null;
    }


    const value = Number(
      numberMatch[0]
    );


    if (
      Number.isNaN(value)
    ) {
      return null;
    }


    /*
      Crore
    */

    if (
      normalizedPrice.includes("cr") ||
      normalizedPrice.includes("crore")
    ) {
      return value * 100;
    }


    /*
      Lakh
    */

    if (
      normalizedPrice.includes("lakh") ||
      normalizedPrice.includes("lac")
    ) {
      return value;
    }


    /*
      If only a number exists,
      assume it is in Lakhs.
    */

    return value;
  }


  /*
    ========================================
    FILTER PROPERTIES
    ========================================
  */

  const filteredProperties =
    useMemo(() => {

      return properties.filter(
        (property) => {

          /*
            PROPERTY TYPE
          */

          const typeMatch =
            selectedType === "All" ||
            property.property_type ===
              selectedType;


          /*
            LOCATION
          */

          const locationMatch =
            location ===
              "All Locations" ||
            property.location ===
              location;


          /*
            BUDGET
          */

          let budgetMatch = true;


          const priceNumber =
            getPriceInLakhs(
              property.price
            );


          /*
            If price is unavailable,
            do not hide the property.
          */

          if (
            priceNumber !== null
          ) {

            if (
              budget ===
              "Less than 50L"
            ) {

              budgetMatch =
                priceNumber < 50;

            }


            if (
              budget ===
              "50L - 1Cr"
            ) {

              budgetMatch =
                priceNumber >= 50 &&
                priceNumber <= 100;

            }


            if (
              budget === "1 Cr+"
            ) {

              budgetMatch =
                priceNumber > 100;

            }

          }


          return (
            typeMatch &&
            locationMatch &&
            budgetMatch
          );

        }
      );

    }, [
      properties,
      selectedType,
      location,
      budget,
    ]);


  /*
    ========================================
    CLEAR FILTERS
    ========================================
  */

  function clearFilters() {

    setSelectedType("All");

    setLocation(
      "All Locations"
    );

    setBudget(
      "Any Budget"
    );

  }


  /*
    ========================================
    LOADING
    ========================================
  */

  if (loading) {

    return (

      <main className="propertiesPage">


        {/* ================= HEADER ================= */}

        <header className="nav">

          <Link
            href="/"
            className="brand"
          >

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

            backgroundSize:
              "cover",

            backgroundPosition:
              "center",

            backgroundRepeat:
              "no-repeat",

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
              Explore our carefully selected
              properties in prime locations.
              Find the perfect open plot,
              residential property, villa,
              or commercial investment
              opportunity.
            </p>

          </div>

        </section>


        {/* ================= LOADING ================= */}

        <section className="propertiesSection">

          <div className="propertiesLayout">

            <div className="noProperties">

              <h2>
                Loading Properties...
              </h2>

              <p>
                Please wait while we load
                the latest properties.
              </p>

            </div>

          </div>

        </section>


      </main>

    );

  }


  /*
    ========================================
    ERROR
    ========================================
  */

  if (error) {

    return (

      <main className="propertiesPage">


        {/* ================= HEADER ================= */}

        <header className="nav">

          <Link
            href="/"
            className="brand"
          >

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

            backgroundSize:
              "cover",

            backgroundPosition:
              "center",

            backgroundRepeat:
              "no-repeat",

          }}
        >

          <div className="propertiesHeroContent">

            <p className="eyebrow dark">
              OUR PROPERTIES
            </p>

            <h1>
              Find Your Ideal Property
            </h1>

          </div>

        </section>


        <section className="propertiesSection">

          <div className="propertiesLayout">

            <div className="noProperties">

              <h2>
                Unable to Load Properties
              </h2>

              <p>
                {error}
              </p>


              <button
                type="button"
                className="btn gold"
                onClick={loadProperties}
              >
                Try Again
              </button>

            </div>

          </div>

        </section>


      </main>

    );

  }


  /*
    ========================================
    MAIN PAGE
    ========================================
  */

  return (

    <main className="propertiesPage">


      {/* ================= HEADER ================= */}

      <header className="nav">


        <Link
          href="/"
          className="brand"
        >

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

          backgroundSize:
            "cover",

          backgroundPosition:
            "center",

          backgroundRepeat:
            "no-repeat",

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

            Explore our carefully selected
            properties in prime locations.
            Find the perfect open plot,
            residential property, villa,
            or commercial investment
            opportunity.

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

                <span>
                  ▽
                </span>

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

                <span>
                  ⌾
                </span>

                Location

              </label>


              <select
                value={location}

                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
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

                <span>
                  ▦
                </span>

                Property Type

              </label>


              <div className="propertyTypeButtons">


                {propertyTypes.map(
                  (type) => (

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

                  )
                )}


              </div>


            </div>


            {/* ================= BUDGET ================= */}

            <div className="filterGroup">


              <label>

                <span>
                  ◇
                </span>

                Budget

              </label>


              <select

                value={budget}

                onChange={(e) =>
                  setBudget(
                    e.target.value
                  )
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

              onClick={() => {
                /*
                  Filters are applied
                  automatically.
                */
              }}

            >

              Apply Filters

            </button>


          </aside>


          {/* ================= PROPERTY GRID ================= */}

          <div className="propertiesGrid">


            {filteredProperties.length > 0 ? (


              filteredProperties.map(
                (property) => {


                  /*
                    IMAGE

                    Priority:

                    1. main_image
                    2. image_urls[0]
                    3. gallery_images[0]
                  */

                  const image =

                    property.main_image ||

                    property.image_urls?.[0] ||

                    property.gallery_images?.[0] ||

                    "";


                  /*
                    STATUS
                  */

                  const propertyStatus =

                    property.project_status ||

                    property.status ||

                    "AVAILABLE";


                  return (


                    <article

                      className="propertyCard"

                      key={property.id}

                    >


                      {/* ================= IMAGE ================= */}

                      <div className="propertyCardImage">


                        {image ? (

                          <img

                            src={image}

                            alt={property.title}

                            className="propertyImage"

                          />

                        ) : (

                          <div
                            className="propertyImage"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >

                            🏠

                          </div>

                        )}


                        <div className="propertyBadges">


                          <span className="statusBadge">

                            {propertyStatus}

                          </span>


                          <span className="categoryBadge">

                            {property.property_type ||
                              "Property"}

                          </span>


                        </div>


                      </div>


                      {/* ================= CONTENT ================= */}

                      <div className="propertyCardBody">


                        <h2>

                          {property.title}

                        </h2>


                        <p className="propertyLocation">


                          <span>
                            📍
                          </span>


                          {property.location ||
                            "Location not specified"}


                        </p>


                        <div className="propertyDivider" />


                        {/* ================= PROPERTY INFORMATION ================= */}

                        <div className="propertyInfo">


                          <div>


                            <span className="propertyIcon">
                              ▣
                            </span>


                            <span>

                              {property.property_type ||
                                "Property"}

                            </span>


                          </div>


                          <div className="infoDivider" />


                          <div>


                            <span className="propertyIcon">
                              ↔
                            </span>


                            <span>

                              {property.area ||
                                "Area not specified"}

                            </span>


                          </div>


                        </div>


                        <div className="propertyDivider" />


                        {/* ================= PRICE & ACTIONS ================= */}

                        <div className="propertyBottom">


                          <strong>

                            {property.price ||
                              "Contact Us"}

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
                                `Property Enquiry - ${property.title}`
                              )}&body=${encodeURIComponent(
                                `Hello Sree Krishna Housing Projects,

I am interested in the following property:

Property: ${property.title}
Location: ${
                                  property.location ||
                                  "Not specified"
                                }
Price: ${
                                  property.price ||
                                  "Contact Us"
                                }

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

                  );

                }
              )


            ) : (


              <div className="noProperties">


                <h2>
                  No Properties Found
                </h2>


                <p>

                  Try changing your filters
                  to see more properties.

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