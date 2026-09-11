"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

interface HomeContent {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
    backgroundImage: string;
  };

  about: {
    eyebrow: string;
    title: string;
    description: string;
    point1: string;
    point2: string;
    point3: string;
    point4: string;
  };

  stats: {
    stat1Number?: string;
    stat1Label?: string;
    stat2Number?: string;
    stat2Label?: string;
    stat3Number?: string;
    stat3Label?: string;
    stat4Number?: string;
    stat4Label?: string;
    items: {
      number: string;
      label: string;
    }[];
  };

  properties: {
    eyebrow: string;
    title: string;
    viewAll: string;
  };

  services: {
    eyebrow: string;
    title: string;
    service1Title?: string;
    service1Description?: string;
    service2Title?: string;
    service2Description?: string;
    service3Title?: string;
    service3Description?: string;
    service4Title?: string;
    service4Description?: string;
    items?: {
      title: string;
      description: string;
      learnMore?: string;
      link?: string;
    }[];
  };

  contact: {
    title: string;
    description: string;
    phone: string;
    whatsapp: string;
    email: string;
    officeTitle: string;
    officeName: string;
    address: string;
    businessHours: string;
  };

  contactForm: {
    title: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    buttonText: string;
  };

  siteVisit: {
    eyebrow: string;
    title: string;
    description: string;
    buttonText: string;
  };

  footer: {
    description: string;
    location: string;
  };
}

/*
  These are the current Home Page values.

  They act as a fallback so the existing website
  continues to work even if the CMS has no content.
*/
const DEFAULT_CONTENT: HomeContent = {
  hero: {
    eyebrow: "TIRUPATI • REAL ESTATE • CONSTRUCTION",
    title: "Find a Place You’ll Love to Call",
    highlight: "Home.",
    description:
      "Discover quality open plots, residential properties and construction opportunities with Sree Krishna Housing Projects.",
    primaryButton: "Explore Properties",
    secondaryButton: "Book a Site Visit",
    backgroundImage: "/hero.png",
  },

  about: {
    eyebrow: "ABOUT US",
    title: "Your Trusted Property Partner in Tirupati",
    description:
      "We help customers explore carefully selected property opportunities with a focus on transparency, quality and customer support.",
    point1: "Transparent Process",
    point2: "Prime Locations",
    point3: "Customer Support",
    point4: "Investment Guidance",
  },

  stats: {
    stat1Number: "10+",
    stat1Label: "Years Experience",
    stat2Number: "100+",
    stat2Label: "Happy Customers",
    stat3Number: "25+",
    stat3Label: "Projects",
    stat4Number: "100%",
    stat4Label: "Commitment",
    items: [
      { number: "10+", label: "Years Experience" },
      { number: "100+", label: "Happy Customers" },
      { number: "25+", label: "Projects" },
      { number: "100%", label: "Commitment" },
    ],
  },

  properties: {
    eyebrow: "FEATURED",
    title: "Explore Our Properties",
    viewAll: "View All →",
  },

  services: {
    eyebrow: "WHAT WE DO",
    title: "Complete Real Estate Services",

    service1Title: "Open Plot Development",
    service1Description:
      "Professional support to help you make confident property decisions.",

    service2Title: "Residential Properties",
    service2Description:
      "Professional support to help you make confident property decisions.",

    service3Title: "Construction Services",
    service3Description:
      "Professional support to help you make confident property decisions.",

    service4Title: "Property Consultation",
    service4Description:
      "Professional support to help you make confident property decisions.",

    items: [
      {
        title: "Open Plot Development",
        description:
          "Professional support to help you make confident property decisions.",
        learnMore: "LEARN MORE →",
        link: "/services/construction",
      },
      {
        title: "Residential Properties",
        description:
          "Professional support to help you make confident property decisions.",
        learnMore: "LEARN MORE →",
        link: "/services/consulting",
      },
      {
        title: "Construction Services",
        description:
          "Professional support to help you make confident property decisions.",
        learnMore: "LEARN MORE →",
        link: "/services/land-development",
      },
      {
        title: "Property Consultation",
        description:
          "Professional support to help you make confident property decisions.",
        learnMore: "LEARN MORE →",
        link: "/services/property-transactions",
      },
    ],
  },

  contact: {
    title: "Get in Touch",
    description:
      "We are here to answer your questions and guide you home.",
    phone: "+91 6303688516",
    whatsapp: "https://wa.me/916303688516",
    email: "sreekrishna.housingprojects@gmail.com",
    officeTitle: "Office Location",
    officeName: "Sree Krishna Housing Projects",
    address:
      "Saideep Towers, 20-03-131, B4,\nLeela Mahal Road, Srinivasa Nagar,\nAkkarampalle, Tirupati,\nAndhra Pradesh - 517501",
    businessHours: "Mon - Sat: 9:00 AM - 6:00 PM\nSunday: Closed",
  },

  contactForm: {
    title: "Send us a Message",
    description:
      "Interested in a property? Have a question? Fill out the form below.",
    nameLabel: "Full Name",
    namePlaceholder: "Your Name",
    phoneLabel: "Phone Number",
    phonePlaceholder: "Your Number",
    emailLabel: "Email (Optional)",
    emailPlaceholder: "you@example.com",
    messageLabel: "Message",
    messagePlaceholder: "How can we help you?",
    buttonText: "Send Message →",
  },

  siteVisit: {
    eyebrow: "BOOK A VISIT",
    title: "See Your Future Property in Person",
    description:
      "Submit your details and our team can contact you regarding a site visit.",
    buttonText: "Schedule Your Visit",
  },

  footer: {
    description: "Trusted Real Estate & Construction Experts in Tirupati.",
    location: "Tirupati, Andhra Pradesh",
  },
};

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);

  const [content, setContent] =
    useState<HomeContent>(DEFAULT_CONTENT);

  useEffect(() => {
    loadHomeContent();
    loadFeaturedProperties();
  }, []);

  /*
    ========================================================
    LOAD HOME PAGE CMS CONTENT
    ========================================================
  */

  const loadHomeContent = async () => {
    const { data, error } = await supabase
      .from("home_page_content")
      .select("content")
      .eq("id", true)
      .maybeSingle();

    if (error) {
      console.error(
        "Error loading home page content:",
        error
      );
      return;
    }

    if (data?.content) {
      setContent({
        ...DEFAULT_CONTENT,
        ...data.content,

        hero: {
          ...DEFAULT_CONTENT.hero,
          ...(data.content.hero || {}),
        },

        about: {
          ...DEFAULT_CONTENT.about,
          ...(data.content.about || {}),
        },

        stats: {
          ...DEFAULT_CONTENT.stats,
          ...(data.content.stats || {}),
          items:
            Array.isArray(data.content.stats?.items) &&
            data.content.stats.items.length > 0
              ? data.content.stats.items
              : [
                  {
                    number:
                      data.content.stats?.stat1Number ||
                      DEFAULT_CONTENT.stats.items[0].number,
                    label:
                      data.content.stats?.stat1Label ||
                      DEFAULT_CONTENT.stats.items[0].label,
                  },
                  {
                    number:
                      data.content.stats?.stat2Number ||
                      DEFAULT_CONTENT.stats.items[1].number,
                    label:
                      data.content.stats?.stat2Label ||
                      DEFAULT_CONTENT.stats.items[1].label,
                  },
                  {
                    number:
                      data.content.stats?.stat3Number ||
                      DEFAULT_CONTENT.stats.items[2].number,
                    label:
                      data.content.stats?.stat3Label ||
                      DEFAULT_CONTENT.stats.items[2].label,
                  },
                  {
                    number:
                      data.content.stats?.stat4Number ||
                      DEFAULT_CONTENT.stats.items[3].number,
                    label:
                      data.content.stats?.stat4Label ||
                      DEFAULT_CONTENT.stats.items[3].label,
                  },
                ],
        },

        properties: {
          ...DEFAULT_CONTENT.properties,
          ...(data.content.properties || {}),
        },

        services: {
          ...DEFAULT_CONTENT.services,
          ...(data.content.services || {}),
          items:
            Array.isArray(data.content.services?.items) &&
            data.content.services.items.length > 0
              ? data.content.services.items.map((item: { title?: string; description?: string; learnMore?: string; link?: string }, itemIndex: number) => ({
                  title: item.title || "",
                  description: item.description || "",
                  learnMore: item.learnMore || "LEARN MORE →",
                  link:
                    item.link ||
                    [
                      "/services/construction",
                      "/services/consulting",
                      "/services/land-development",
                      "/services/property-transactions",
                    ][itemIndex] ||
                    "#",
                }))
              : [
                  {
                    title:
                      data.content.services?.service1Title ||
                      DEFAULT_CONTENT.services.items![0].title,
                    description:
                      data.content.services?.service1Description ||
                      DEFAULT_CONTENT.services.items![0].description,
                    learnMore: "LEARN MORE →",
                    link: "/services/construction",
                  },
                  {
                    title:
                      data.content.services?.service2Title ||
                      DEFAULT_CONTENT.services.items![1].title,
                    description:
                      data.content.services?.service2Description ||
                      DEFAULT_CONTENT.services.items![1].description,
                    learnMore: "LEARN MORE →",
                    link: "/services/consulting",
                  },
                  {
                    title:
                      data.content.services?.service3Title ||
                      DEFAULT_CONTENT.services.items![2].title,
                    description:
                      data.content.services?.service3Description ||
                      DEFAULT_CONTENT.services.items![2].description,
                    learnMore: "LEARN MORE →",
                    link: "/services/land-development",
                  },
                  {
                    title:
                      data.content.services?.service4Title ||
                      DEFAULT_CONTENT.services.items![3].title,
                    description:
                      data.content.services?.service4Description ||
                      DEFAULT_CONTENT.services.items![3].description,
                    learnMore: "LEARN MORE →",
                    link: "/services/property-transactions",
                  },
                ],
        },

        contact: {
          ...DEFAULT_CONTENT.contact,
          ...(data.content.contact || {}),
        },

        contactForm: {
          ...DEFAULT_CONTENT.contactForm,
          ...(data.content.contactForm || {}),
        },

        siteVisit: {
          ...DEFAULT_CONTENT.siteVisit,
          ...(data.content.siteVisit || {}),
        },

        footer: {
          ...DEFAULT_CONTENT.footer,
          ...(data.content.footer || {}),
        },
      });
    }
  };

  /*
    ========================================================
    LOAD FEATURED PROPERTIES
    ========================================================
  */

  const loadFeaturedProperties = async () => {
    setPropertiesLoading(true);

    /*
      FIRST:
      Load active + featured properties
    */

    const {
      data: featuredProperties,
      error: featuredError,
    } = await supabase
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

    const {
      data: activeProperties,
      error: activeError,
    } = await supabase
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
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="nav">
        <a href="/" className="brand">
          <img
            src="/logo.webp"
            alt="Sree Krishna Housing Projects"
          />
        </a>

        <nav>
          <a href="/">Home</a>

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
          href="/visit"
        >
          Book Site Visit
        </a>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">
        <div className="heroOverlay">
          <p className="eyebrow">
            {content.hero.eyebrow}
          </p>

          <h1>
            {content.hero.title}{" "}
            <em>{content.hero.highlight}</em>
          </h1>

          <p>
            {content.hero.description}
          </p>

          <div className="actions">
            <a
              className="btn gold"
              href="/properties"
            >
              {content.hero.primaryButton}
            </a>

            <a
              className="btn outline"
              href="/visit"
            >
              {content.hero.secondaryButton}
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        id="about"
        className="section split"
      >
        <div>
          <p className="eyebrow dark">
            {content.about.eyebrow}
          </p>

          <h2>
            {content.about.title}
          </h2>

          <p>
            {content.about.description}
          </p>

          <div className="checks">
            <span>
              ✓ {content.about.point1}
            </span>

            <span>
              ✓ {content.about.point2}
            </span>

            <span>
              ✓ {content.about.point3}
            </span>

            <span>
              ✓ {content.about.point4}
            </span>
          </div>
        </div>

        <div className="stats">
          {content.stats.items.map((stat, index) => (
            <div key={`${stat.number}-${stat.label}-${index}`}>
              <b>{stat.number}</b>

              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          FEATURED PROPERTIES
      ===================================================== */}

      <section className="section muted">
        <div className="sectionHead">
          <div>
            <p className="eyebrow dark">
              {content.properties.eyebrow}
            </p>

            <h2>
              {content.properties.title}
            </h2>
          </div>

          <a href="/properties">
            {content.properties.viewAll}
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

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        id="services"
        className="section"
      >
        <p className="eyebrow dark">
          {content.services.eyebrow}
        </p>

        <h2>
          {content.services.title}
        </h2>

        <div className="services">
          {(content.services.items || []).map(
            (service, index) => (
              <Link
                href={service.link || "#"}
                className="service"
                key={`${service.title}-${index}`}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  cursor: service.link && service.link !== "#" ? "pointer" : "default",
                }}
              >
                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>

                <span className="serviceLearnMore">
                  {service.learnMore || "LEARN MORE →"}
                </span>
              </Link>
            )
          )}
        </div>
      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section
        id="contact"
        className="section contactSection"
      >
        <div className="contactSectionHeading">
          <h2>
            {content.contact.title}
          </h2>

          <p>
            {content.contact.description}
          </p>
        </div>

        <div className="contactGrid">
          <div className="contactInfo">
            <h2>
              Direct Contact
            </h2>

            {/* PHONE */}

            <a
              href={`tel:${content.contact.phone.replace(
                /\s/g,
                ""
              )}`}
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
                  {content.contact.phone}
                </h3>
              </div>
            </a>

            {/* WHATSAPP */}

            <a
              href={content.contact.whatsapp}
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
              href={`mailto:${content.contact.email}`}
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
                  {content.contact.email}
                </h3>
              </div>
            </a>

            {/* OFFICE */}

            <div className="office-location">
              <h2>
                {content.contact.officeTitle}
              </h2>

              <div className="office-info-item">
                <div className="office-icon">
                  📍
                </div>

                <div className="office-info-content">
                  <strong>
                    {content.contact.officeName}
                  </strong>

                  <p>
                    {content.contact.address
                      .split("\n")
                      .map((line, index) => (
                        <span key={index}>
                          {line}
                          {index <
                            content.contact.address.split(
                              "\n"
                            ).length -
                              1 && <br />}
                        </span>
                      ))}
                  </p>
                </div>
              </div>

              {/* BUSINESS HOURS */}

              <div className="office-info-item">
                <div className="office-icon">
                  ◷
                </div>

                <div className="office-info-content">
                  <strong>
                    Business Hours
                  </strong>

                  <p>
                    {content.contact.businessHours
                      .split("\n")
                      .map((line, index) => (
                        <span key={index}>
                          {line}
                          {index <
                            content.contact.businessHours.split(
                              "\n"
                            ).length -
                              1 && <br />}
                        </span>
                      ))}
                  </p>
                </div>
              </div>

              {/* GOOGLE MAP */}

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
              {content.contactForm.title}
            </h2>

            <p>
              {content.contactForm.description}
            </p>

            <form>
              <label>
                {content.contactForm.nameLabel}
              </label>

              <input
                type="text"
                placeholder={
                  content.contactForm
                    .namePlaceholder
                }
              />

              <label>
                {content.contactForm.phoneLabel}
              </label>

              <input
                type="tel"
                placeholder={
                  content.contactForm
                    .phonePlaceholder
                }
              />

              <label>
                {content.contactForm.emailLabel}
              </label>

              <input
                type="email"
                placeholder={
                  content.contactForm
                    .emailPlaceholder
                }
              />

              <label>
                {content.contactForm.messageLabel}
              </label>

              <textarea
                placeholder={
                  content.contactForm
                    .messagePlaceholder
                }
                rows={5}
              />

              <button
                className="btn gold"
                type="submit"
              >
                {content.contactForm.buttonText}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* =====================================================
          SITE VISIT
      ===================================================== */}

      <section
        id="visit"
        className="visit"
      >
        <div>
          <p className="eyebrow">
            {content.siteVisit.eyebrow}
          </p>

          <h2>
            {content.siteVisit.title}
          </h2>

          <p>
            {content.siteVisit.description}
          </p>

          <a
            className="btn gold"
            href="/visit"
          >
            {content.siteVisit.buttonText}
          </a>
        </div>

        <SiteVisitForm />
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer>
        <div className="brand">
          <img
            src="/logo.webp"
            alt="Sree Krishna Housing Projects"
          />
        </div>

        <p>
          {content.footer.description}
        </p>

        <p>
          {content.footer.location}
        </p>

        <small>
          © {new Date().getFullYear()}{" "}
          Sree Krishna Housing Projects.
          All Rights Reserved.
        </small>
      </footer>

      {/* =====================================================
          HERO BACKGROUND FROM CMS
          Only overrides the background image.
          Existing hero styling/animation remains untouched.
      ===================================================== */}

      <style jsx global>{`
        .hero::before {
          background-image:
            linear-gradient(
              90deg,
              rgba(5, 10, 15, 0.82) 0%,
              rgba(5, 10, 15, 0.65) 42%,
              rgba(5, 10, 15, 0.30) 70%,
              rgba(5, 10, 15, 0.15) 100%
            ),
            url("${content.hero.backgroundImage}");
        }

        .services .service {
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .services .service:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.10);
          border-color: rgba(191, 154, 83, 0.55);
        }

        .serviceLearnMore {
          margin-top: auto;
          padding-top: 24px;
          color: #bd9855;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .serviceLearnMore span {
          display: inline-block;
          margin-left: 5px;
          transition: transform 0.2s ease;
        }

        .services .service:hover .serviceLearnMore span {
          transform: translateX(4px);
        }
      `}</style>
    </main>
  );
}