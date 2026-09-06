"use client";

import { useEffect, useState } from "react";
import SiteVisitForm from "./components/SiteVisitForm";
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
  is_featured: boolean | null;
  is_active: boolean | null;
  display_order: number | null;
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    setPropertiesLoading(true);

    /*
      FIRST:
      Load active + featured properties
    */

    const { data: featuredProperties, error: featuredError } =
      await supabase
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
          is_featured,
          is_active,
          display_order
        `)
        .eq("is_active", true)
        .eq("is_featured", true)
        .order("display_order", {
          ascending: true,
        })
        .limit(3);

    if (featuredError) {
      console.error(
        "Error loading featured properties:",
        featuredError
      );
    }

    /*
      If featured properties exist,
      display them.
    */

    if (
      !featuredError &&
      featuredProperties &&
      featuredProperties.length > 0
    ) {
      setProperties(featuredProperties);
      setPropertiesLoading(false);
      return;
    }

    /*
      FALLBACK:
      If no featured properties exist,
      load first 3 active properties.
    */

    const { data: activeProperties, error: activeError } =
      await supabase
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
          is_featured,
          is_active,
          display_order
        `)
        .eq("is_active", true)
        .order("display_order", {
          ascending: true,
        })
        .limit(3);

    if (activeError) {
      console.error(
        "Error loading active properties:",
        activeError
      );

      setProperties([]);
      setPropertiesLoading(false);

      return;
    }

    setProperties(activeProperties || []);
    setPropertiesLoading(false);
  };

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
            Find a Place You’ll Love to Call{" "}
            <em>Home.</em>
          </h1>

          <p>
            Discover quality open plots,
            residential properties and
            construction opportunities
            with Sree Krishna Housing Projects.
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
              href="/visit"
            >
              Book a Site Visit
            </a>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="section split"
      >
        <div>
          <p className="eyebrow dark">
            ABOUT US
          </p>

          <h2>
            Your Trusted Property Partner
            in Tirupati
          </h2>

          <p>
            We help customers explore carefully
            selected property opportunities with
            a focus on transparency, quality and
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

        <div className="stats">
          <div>
            <b>10+</b>

            <span>
              Years Experience
            </span>
          </div>

          <div>
            <b>100+</b>

            <span>
              Happy Customers
            </span>
          </div>

          <div>
            <b>25+</b>

            <span>
              Projects
            </span>
          </div>

          <div>
            <b>100%</b>

            <span>
              Commitment
            </span>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROPERTIES ================= */}

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
          {/* LOADING */}

          {propertiesLoading && (
            <p>
              Loading properties...
            </p>
          )}

          {/* PROPERTIES */}

          {!propertiesLoading &&
            properties.map((property) => {
              const image =
                property.main_image ||
                property.image_urls?.[0] ||
                property.gallery_images?.[0] ||
                "";

              return (
                <article
                  className="card"
                  key={property.id}
                >
                  <div className="propertyImage">
                    {image ? (
                      <img
                        src={image}
                        alt={property.title}
                      />
                    ) : (
                      <div
                        style={{
                          height: "100%",
                          minHeight: "200px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        🏠
                      </div>
                    )}
                  </div>

                  <div className="cardBody">
                    <span className="tag">
                      {property.property_type ||
                        "Property"}
                    </span>

                    <h3>
                      {property.title}
                    </h3>

                    <p>
                      📍{" "}
                      {property.location ||
                        "Location not specified"}
                    </p>

                    {property.area && (
                      <p>
                        📐 {property.area}
                      </p>
                    )}

                    {property.price && (
                      <p>
                        💰 {property.price}
                      </p>
                    )}

                    <a
                      href={`/properties/${property.id}`}
                    >
                      View Details →
                    </a>
                  </div>
                </article>
              );
            })}

          {/* NO PROPERTIES */}

          {!propertiesLoading &&
            properties.length === 0 && (
              <p>
                No properties available right now.
              </p>
            )}
        </div>
      </section>

      {/* ================= SERVICES ================= */}

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
          ].map((service, index) => (
            <div
              className="service"
              key={service}
            >
              <b>
                0{index + 1}
              </b>

              <h3>
                {service}
              </h3>

              <p>
                Professional support to help
                you make confident property
                decisions.
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
        <div className="contactSectionHeading">
          <h2>
            Get in Touch
          </h2>

          <p>
            We are here to answer your questions
            and guide you home.
          </p>
        </div>

        <div className="contactGrid">
          <div className="contactInfo">
            <h2>
              Direct Contact
            </h2>

            <a
              href="tel:+916303688516"
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
                  +91 6303688516
                </h3>
              </div>
            </a>

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
                <small>
                  WhatsApp
                </small>

                <h3>
                  Chat Now
                </h3>
              </div>
            </a>

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

            <div className="office-location">
              <h2>
                Office Location
              </h2>

              <div className="office-info-item">
                <div className="office-icon">
                  📍
                </div>

                <div className="office-info-content">
                  <strong>
                    Sree Krishna Housing Projects
                  </strong>

                  <p>
                    Saideep Towers, 20-03-131, B4,
                    <br />
                    Leela Mahal Road, Srinivasa Nagar,
                    <br />
                    Akkarampalle, Tirupati,
                    <br />
                    Andhra Pradesh - 517501
                  </p>
                </div>
              </div>

              <div className="office-info-item">
                <div className="office-icon">
                  ◷
                </div>

                <div className="office-info-content">
                  <strong>
                    Business Hours
                  </strong>

                  <p>
                    Mon - Sat: 9:00 AM - 6:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="office-map">
                <iframe
                  title="Sree Krishna Housing Projects Location"
                  src="https://www.google.com/maps?q=Saideep%20Towers%2C%2020-03-131%2C%20B4%2C%20Leela%20Mahal%20Rd%2C%20Srinivasa%20Nagar%2C%20Akkarampalle%2C%20Tirupati%2C%20Andhra%20Pradesh%20517501&output=embed"
                  width="100%"
                  height="300"
                  style={{
                    border: 0,
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}

          <div className="contactForm">
            <h2>
              Send us a Message
            </h2>

            <p>
              Interested in a property?
              Have a question?
              Fill out the form below.
            </p>

            <form>
              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="Your Name"
              />

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Your Number"
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

      {/* ================= SITE VISIT ================= */}

      <section
        id="visit"
        className="visit"
      >
        <div>
          <p className="eyebrow">
            BOOK A VISIT
          </p>

          <h2>
            See Your Future Property
            in Person
          </h2>

          <p>
            Submit your details and our team
            can contact you regarding a site visit.
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
          Trusted Real Estate & Construction
          Experts in Tirupati.
        </p>

        <p>
          Tirupati, Andhra Pradesh
        </p>

        <small>
          © {new Date().getFullYear()}{" "}
          Sree Krishna Housing Projects.
          All Rights Reserved.
        </small>
      </footer>
    </main>
  );
}