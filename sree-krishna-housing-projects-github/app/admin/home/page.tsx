"use client";

import {
  type ChangeEvent,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import { adminSupabase } from "@/lib/adminSupabase";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import styles from "./HomeEditor.module.css";

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
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
    stat4Number: string;
    stat4Label: string;
  };

  properties: {
    eyebrow: string;
    title: string;
    viewAll: string;
  };

  services: {
    eyebrow: string;
    title: string;
    service1Title: string;
    service1Description: string;
    service2Title: string;
    service2Description: string;
    service3Title: string;
    service3Description: string;
    service4Title: string;
    service4Description: string;
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
    businessHours:
      "Mon - Sat: 9:00 AM - 6:00 PM\nSunday: Closed",
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
    description:
      "Trusted Real Estate & Construction Experts in Tirupati.",
    location: "Tirupati, Andhra Pradesh",
  },
};

export default function AdminHomePage() {
  const [content, setContent] =
    useState<HomeContent>(DEFAULT_CONTENT);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    loadHomeContent();
  }, []);

  /*
    ========================================================
    LOAD HOME PAGE CONTENT
    ========================================================
  */

  const loadHomeContent = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } =
        await adminSupabase
          .from("home_page_content")
          .select("content")
          .eq("id", true)
          .maybeSingle();

      if (error) {
        throw error;
      }

      if (data?.content) {
        const saved =
          data.content as Partial<HomeContent>;

        setContent({
          ...DEFAULT_CONTENT,
          ...saved,

          hero: {
            ...DEFAULT_CONTENT.hero,
            ...(saved.hero || {}),
          },

          about: {
            ...DEFAULT_CONTENT.about,
            ...(saved.about || {}),
          },

          stats: {
            ...DEFAULT_CONTENT.stats,
            ...(saved.stats || {}),
          },

          properties: {
            ...DEFAULT_CONTENT.properties,
            ...(saved.properties || {}),
          },

          services: {
            ...DEFAULT_CONTENT.services,
            ...(saved.services || {}),
          },

          contact: {
            ...DEFAULT_CONTENT.contact,
            ...(saved.contact || {}),
          },

          contactForm: {
            ...DEFAULT_CONTENT.contactForm,
            ...(saved.contactForm || {}),
          },

          siteVisit: {
            ...DEFAULT_CONTENT.siteVisit,
            ...(saved.siteVisit || {}),
          },

          footer: {
            ...DEFAULT_CONTENT.footer,
            ...(saved.footer || {}),
          },
        });
      }
    } catch (error) {
      console.error(
        "Error loading home content:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load home page content."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
    ========================================================
    UPDATE HERO
    ========================================================
  */

  const updateHero = (
    field: keyof HomeContent["hero"],
    value: string
  ) => {
    setContent((previous) => ({
      ...previous,

      hero: {
        ...previous.hero,
        [field]: value,
      },
    }));
  };

  /*
    ========================================================
    UPDATE ABOUT
    ========================================================
  */

  const updateAbout = (
    field: keyof HomeContent["about"],
    value: string
  ) => {
    setContent((previous) => ({
      ...previous,

      about: {
        ...previous.about,
        [field]: value,
      },
    }));
  };

  /*
    ========================================================
    UPDATE STATS
    ========================================================
  */

  const updateStats = (
    field: keyof HomeContent["stats"],
    value: string
  ) => {
    setContent((previous) => ({
      ...previous,

      stats: {
        ...previous.stats,
        [field]: value,
      },
    }));
  };

  /*
    ========================================================
    UPDATE PROPERTIES SECTION
    ========================================================
  */

  const updateProperties = (
    field: keyof HomeContent["properties"],
    value: string
  ) => {
    setContent((previous) => ({
      ...previous,

      properties: {
        ...previous.properties,
        [field]: value,
      },
    }));
  };

  /*
    ========================================================
    UPDATE SERVICES
    ========================================================
  */

  const updateServices = (
    field: keyof HomeContent["services"],
    value: string
  ) => {
    setContent((previous) => ({
      ...previous,

      services: {
        ...previous.services,
        [field]: value,
      },
    }));
  };

  /*
    ========================================================
    UPDATE CONTACT
    ========================================================
  */

  const updateContact = (
    field: keyof HomeContent["contact"],
    value: string
  ) => {
    setContent((previous) => ({
      ...previous,

      contact: {
        ...previous.contact,
        [field]: value,
      },
    }));
  };

  /*
    ========================================================
    UPDATE CONTACT FORM
    ========================================================
  */

  const updateContactForm = (
    field: keyof HomeContent["contactForm"],
    value: string
  ) => {
    setContent((previous) => ({
      ...previous,

      contactForm: {
        ...previous.contactForm,
        [field]: value,
      },
    }));
  };

  /*
    ========================================================
    UPDATE SITE VISIT
    ========================================================
  */

  const updateSiteVisit = (
    field: keyof HomeContent["siteVisit"],
    value: string
  ) => {
    setContent((previous) => ({
      ...previous,

      siteVisit: {
        ...previous.siteVisit,
        [field]: value,
      },
    }));
  };

  /*
    ========================================================
    UPDATE FOOTER
    ========================================================
  */

  const updateFooter = (
    field: keyof HomeContent["footer"],
    value: string
  ) => {
    setContent((previous) => ({
      ...previous,

      footer: {
        ...previous.footer,
        [field]: value,
      },
    }));
  };

  /*
    ========================================================
    SAVE CONTENT
    ========================================================
  */

  const saveContent = async () => {
    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const { error } =
        await adminSupabase
          .from("home_page_content")
          .upsert(
            {
              id: true,
              content,
              updated_at:
                new Date().toISOString(),
            },
            {
              onConflict: "id",
            }
          );

      if (error) {
        throw error;
      }

      setSuccessMessage(
        "Home page content saved successfully."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Error saving home content:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to save home page content."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
    ========================================================
    UPLOAD HERO IMAGE
    ========================================================
  */

  const uploadHeroImage = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const extension =
        file.name
          .split(".")
          .pop()
          ?.toLowerCase() || "jpg";

      const fileName =
        `home-hero-${Date.now()}.${extension}`;

      const filePath =
        `home/${fileName}`;

      /*
        Existing public bucket:
        property-images
      */

      const { error: uploadError } =
        await adminSupabase.storage
          .from("property-images")
          .upload(
            filePath,
            file,
            {
              cacheControl: "3600",
              upsert: true,
            }
          );

      if (uploadError) {
        throw uploadError;
      }

      const { data } =
        adminSupabase.storage
          .from("property-images")
          .getPublicUrl(filePath);

      if (!data?.publicUrl) {
        throw new Error(
          "Unable to get uploaded image URL."
        );
      }

      updateHero(
        "backgroundImage",
        data.publicUrl
      );

      setSuccessMessage(
        "Hero image uploaded. Click Save Changes to publish it."
      );
    } catch (error) {
      console.error(
        "Hero upload error:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to upload hero image."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  /*
    ========================================================
    LOADING
    ========================================================
  */

  if (loading) {
    return (
      <div className={styles.adminLayout}>
        <AdminSidebar />

        <main className={styles.editorMain}>
          <div className={styles.loading}>
            Loading Home Page Editor...
          </div>
        </main>
      </div>
    );
  }

  /*
    ========================================================
    PAGE
    ========================================================
  */

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />

      <main className={styles.editorMain}>
        {/* =================================================
            TOP BAR
        ================================================= */}

        <div className={styles.topBar}>
          <div>
            <span className={styles.pageEyebrow}>
              WEBSITE MANAGEMENT
            </span>

            <h1>
              Home Page
            </h1>

            <p>
              Manage the content displayed
              on your public website.
            </p>
          </div>

          <button
            type="button"
            className={styles.saveButton}
            onClick={saveContent}
            disabled={
              saving || uploading
            }
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>

        {successMessage && (
          <div
            className={
              styles.successMessage
            }
          >
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div
            className={
              styles.errorMessage
            }
          >
            {errorMessage}
          </div>
        )}

        {/* =================================================
            HERO
        ================================================= */}

        <EditorSection
          number="01"
          title="Hero Section"
          description="Edit the main banner content shown at the top of your website."
        >
          <div className={styles.formStack}>
            <Field
              label="Eyebrow"
              value={
                content.hero.eyebrow
              }
              onChange={(value) =>
                updateHero(
                  "eyebrow",
                  value
                )
              }
            />

            <div
              className={
                styles.formGrid
              }
            >
              <Field
                label="Main Title"
                value={
                  content.hero.title
                }
                onChange={(value) =>
                  updateHero(
                    "title",
                    value
                  )
                }
              />

              <Field
                label="Highlighted Title"
                value={
                  content.hero.highlight
                }
                onChange={(value) =>
                  updateHero(
                    "highlight",
                    value
                  )
                }
              />
            </div>

            <TextArea
              label="Description"
              value={
                content.hero.description
              }
              onChange={(value) =>
                updateHero(
                  "description",
                  value
                )
              }
            />

            <div
              className={
                styles.formGrid
              }
            >
              <Field
                label="Primary Button"
                value={
                  content.hero
                    .primaryButton
                }
                onChange={(value) =>
                  updateHero(
                    "primaryButton",
                    value
                  )
                }
              />

              <Field
                label="Secondary Button"
                value={
                  content.hero
                    .secondaryButton
                }
                onChange={(value) =>
                  updateHero(
                    "secondaryButton",
                    value
                  )
                }
              />
            </div>

            <Field
              label="Hero Image URL"
              value={
                content.hero
                  .backgroundImage
              }
              onChange={(value) =>
                updateHero(
                  "backgroundImage",
                  value
                )
              }
            />

            <div
              className={
                styles.uploadBox
              }
            >
              <div>
                <strong>
                  Change Hero Background
                </strong>

                <span>
                  Upload a new image to
                  Supabase Storage.
                </span>
              </div>

              <label
                className={
                  styles.uploadButton
                }
              >
                {uploading
                  ? "Uploading..."
                  : "Choose Image"}

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={
                    uploadHeroImage
                  }
                  disabled={uploading}
                />
              </label>
            </div>

            {content.hero
              .backgroundImage && (
              <div
                className={
                  styles.imagePreview
                }
              >
                <img
                  src={
                    content.hero
                      .backgroundImage
                  }
                  alt="Hero preview"
                />
              </div>
            )}
          </div>
        </EditorSection>

        {/* =================================================
            ABOUT
        ================================================= */}

        <EditorSection
          number="02"
          title="About Section"
          description="Edit the About Us content and four highlights."
        >
          <div className={styles.formStack}>
            <Field
              label="Eyebrow"
              value={
                content.about.eyebrow
              }
              onChange={(value) =>
                updateAbout(
                  "eyebrow",
                  value
                )
              }
            />

            <Field
              label="Title"
              value={
                content.about.title
              }
              onChange={(value) =>
                updateAbout(
                  "title",
                  value
                )
              }
            />

            <TextArea
              label="Description"
              value={
                content.about.description
              }
              onChange={(value) =>
                updateAbout(
                  "description",
                  value
                )
              }
            />

            <div
              className={
                styles.subHeading
              }
            >
              About Highlights
            </div>

            <div
              className={
                styles.formGrid
              }
            >
              <Field
                label="Point 1"
                value={
                  content.about.point1
                }
                onChange={(value) =>
                  updateAbout(
                    "point1",
                    value
                  )
                }
              />

              <Field
                label="Point 2"
                value={
                  content.about.point2
                }
                onChange={(value) =>
                  updateAbout(
                    "point2",
                    value
                  )
                }
              />

              <Field
                label="Point 3"
                value={
                  content.about.point3
                }
                onChange={(value) =>
                  updateAbout(
                    "point3",
                    value
                  )
                }
              />

              <Field
                label="Point 4"
                value={
                  content.about.point4
                }
                onChange={(value) =>
                  updateAbout(
                    "point4",
                    value
                  )
                }
              />
            </div>
          </div>
        </EditorSection>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <EditorSection
          number="03"
          title="Statistics"
          description="Edit the four statistics displayed in the About section."
        >
          <div
            className={
              styles.statsGrid
            }
          >
            <StatCard
              number={
                content.stats
                  .stat1Number
              }
              label={
                content.stats
                  .stat1Label
              }
              onNumberChange={(value) =>
                updateStats(
                  "stat1Number",
                  value
                )
              }
              onLabelChange={(value) =>
                updateStats(
                  "stat1Label",
                  value
                )
              }
            />

            <StatCard
              number={
                content.stats
                  .stat2Number
              }
              label={
                content.stats
                  .stat2Label
              }
              onNumberChange={(value) =>
                updateStats(
                  "stat2Number",
                  value
                )
              }
              onLabelChange={(value) =>
                updateStats(
                  "stat2Label",
                  value
                )
              }
            />

            <StatCard
              number={
                content.stats
                  .stat3Number
              }
              label={
                content.stats
                  .stat3Label
              }
              onNumberChange={(value) =>
                updateStats(
                  "stat3Number",
                  value
                )
              }
              onLabelChange={(value) =>
                updateStats(
                  "stat3Label",
                  value
                )
              }
            />

            <StatCard
              number={
                content.stats
                  .stat4Number
              }
              label={
                content.stats
                  .stat4Label
              }
              onNumberChange={(value) =>
                updateStats(
                  "stat4Number",
                  value
                )
              }
              onLabelChange={(value) =>
                updateStats(
                  "stat4Label",
                  value
                )
              }
            />
          </div>
        </EditorSection>

        {/* =================================================
            FEATURED PROPERTIES
        ================================================= */}

        <EditorSection
          number="04"
          title="Featured Properties Section"
          description="Edit the heading above the properties. Property cards are managed from Properties."
        >
          <div className={styles.formStack}>
            <Field
              label="Eyebrow"
              value={
                content.properties
                  .eyebrow
              }
              onChange={(value) =>
                updateProperties(
                  "eyebrow",
                  value
                )
              }
            />

            <Field
              label="Title"
              value={
                content.properties
                  .title
              }
              onChange={(value) =>
                updateProperties(
                  "title",
                  value
                )
              }
            />

            <Field
              label="View All Button"
              value={
                content.properties
                  .viewAll
              }
              onChange={(value) =>
                updateProperties(
                  "viewAll",
                  value
                )
              }
            />
          </div>
        </EditorSection>

        {/* =================================================
            SERVICES
        ================================================= */}

        <EditorSection
          number="05"
          title="Services"
          description="Edit the services section and all four service descriptions."
        >
          <div className={styles.formStack}>
            <Field
              label="Eyebrow"
              value={
                content.services
                  .eyebrow
              }
              onChange={(value) =>
                updateServices(
                  "eyebrow",
                  value
                )
              }
            />

            <Field
              label="Title"
              value={
                content.services
                  .title
              }
              onChange={(value) =>
                updateServices(
                  "title",
                  value
                )
              }
            />

            <div
              className={
                styles.subHeading
              }
            >
              Service 1
            </div>

            <Field
              label="Service Title"
              value={
                content.services
                  .service1Title
              }
              onChange={(value) =>
                updateServices(
                  "service1Title",
                  value
                )
              }
            />

            <TextArea
              label="Description"
              value={
                content.services
                  .service1Description
              }
              onChange={(value) =>
                updateServices(
                  "service1Description",
                  value
                )
              }
            />

            <div
              className={
                styles.subHeading
              }
            >
              Service 2
            </div>

            <Field
              label="Service Title"
              value={
                content.services
                  .service2Title
              }
              onChange={(value) =>
                updateServices(
                  "service2Title",
                  value
                )
              }
            />

            <TextArea
              label="Description"
              value={
                content.services
                  .service2Description
              }
              onChange={(value) =>
                updateServices(
                  "service2Description",
                  value
                )
              }
            />

            <div
              className={
                styles.subHeading
              }
            >
              Service 3
            </div>

            <Field
              label="Service Title"
              value={
                content.services
                  .service3Title
              }
              onChange={(value) =>
                updateServices(
                  "service3Title",
                  value
                )
              }
            />

            <TextArea
              label="Description"
              value={
                content.services
                  .service3Description
              }
              onChange={(value) =>
                updateServices(
                  "service3Description",
                  value
                )
              }
            />

            <div
              className={
                styles.subHeading
              }
            >
              Service 4
            </div>

            <Field
              label="Service Title"
              value={
                content.services
                  .service4Title
              }
              onChange={(value) =>
                updateServices(
                  "service4Title",
                  value
                )
              }
            />

            <TextArea
              label="Description"
              value={
                content.services
                  .service4Description
              }
              onChange={(value) =>
                updateServices(
                  "service4Description",
                  value
                )
              }
            />
          </div>
        </EditorSection>

        {/* =================================================
            CONTACT
        ================================================= */}

        <EditorSection
          number="06"
          title="Contact & Office"
          description="Manage your phone, WhatsApp, email and office information."
        >
          <div className={styles.formStack}>
            <Field
              label="Contact Title"
              value={
                content.contact.title
              }
              onChange={(value) =>
                updateContact(
                  "title",
                  value
                )
              }
            />

            <TextArea
              label="Contact Description"
              value={
                content.contact
                  .description
              }
              onChange={(value) =>
                updateContact(
                  "description",
                  value
                )
              }
            />

            <div
              className={
                styles.formGrid
              }
            >
              <Field
                label="Phone Number"
                value={
                  content.contact.phone
                }
                onChange={(value) =>
                  updateContact(
                    "phone",
                    value
                  )
                }
              />

              <Field
                label="WhatsApp Link"
                value={
                  content.contact
                    .whatsapp
                }
                onChange={(value) =>
                  updateContact(
                    "whatsapp",
                    value
                  )
                }
              />

              <Field
                label="Email"
                value={
                  content.contact.email
                }
                onChange={(value) =>
                  updateContact(
                    "email",
                    value
                  )
                }
              />
            </div>

            <div
              className={
                styles.subHeading
              }
            >
              Office Details
            </div>

            <Field
              label="Office Section Title"
              value={
                content.contact
                  .officeTitle
              }
              onChange={(value) =>
                updateContact(
                  "officeTitle",
                  value
                )
              }
            />

            <Field
              label="Office Name"
              value={
                content.contact
                  .officeName
              }
              onChange={(value) =>
                updateContact(
                  "officeName",
                  value
                )
              }
            />

            <TextArea
              label="Office Address"
              value={
                content.contact.address
              }
              onChange={(value) =>
                updateContact(
                  "address",
                  value
                )
              }
            />

            <TextArea
              label="Business Hours"
              value={
                content.contact
                  .businessHours
              }
              onChange={(value) =>
                updateContact(
                  "businessHours",
                  value
                )
              }
            />
          </div>
        </EditorSection>

        {/* =================================================
            CONTACT FORM
        ================================================= */}

        <EditorSection
          number="07"
          title="Contact Form"
          description="Edit the text, labels and placeholders shown in the contact form."
        >
          <div className={styles.formStack}>
            <Field
              label="Form Title"
              value={
                content.contactForm
                  .title
              }
              onChange={(value) =>
                updateContactForm(
                  "title",
                  value
                )
              }
            />

            <TextArea
              label="Form Description"
              value={
                content.contactForm
                  .description
              }
              onChange={(value) =>
                updateContactForm(
                  "description",
                  value
                )
              }
            />

            <div
              className={
                styles.formGrid
              }
            >
              <Field
                label="Name Label"
                value={
                  content.contactForm
                    .nameLabel
                }
                onChange={(value) =>
                  updateContactForm(
                    "nameLabel",
                    value
                  )
                }
              />

              <Field
                label="Name Placeholder"
                value={
                  content.contactForm
                    .namePlaceholder
                }
                onChange={(value) =>
                  updateContactForm(
                    "namePlaceholder",
                    value
                  )
                }
              />

              <Field
                label="Phone Label"
                value={
                  content.contactForm
                    .phoneLabel
                }
                onChange={(value) =>
                  updateContactForm(
                    "phoneLabel",
                    value
                  )
                }
              />

              <Field
                label="Phone Placeholder"
                value={
                  content.contactForm
                    .phonePlaceholder
                }
                onChange={(value) =>
                  updateContactForm(
                    "phonePlaceholder",
                    value
                  )
                }
              />

              <Field
                label="Email Label"
                value={
                  content.contactForm
                    .emailLabel
                }
                onChange={(value) =>
                  updateContactForm(
                    "emailLabel",
                    value
                  )
                }
              />

              <Field
                label="Email Placeholder"
                value={
                  content.contactForm
                    .emailPlaceholder
                }
                onChange={(value) =>
                  updateContactForm(
                    "emailPlaceholder",
                    value
                  )
                }
              />
            </div>

            <Field
              label="Message Label"
              value={
                content.contactForm
                  .messageLabel
              }
              onChange={(value) =>
                updateContactForm(
                  "messageLabel",
                  value
                )
              }
            />

            <TextArea
              label="Message Placeholder"
              value={
                content.contactForm
                  .messagePlaceholder
              }
              onChange={(value) =>
                updateContactForm(
                  "messagePlaceholder",
                  value
                )
              }
            />

            <Field
              label="Submit Button"
              value={
                content.contactForm
                  .buttonText
              }
              onChange={(value) =>
                updateContactForm(
                  "buttonText",
                  value
                )
              }
            />
          </div>
        </EditorSection>

        {/* =================================================
            SITE VISIT
        ================================================= */}

        <EditorSection
          number="08"
          title="Site Visit Section"
          description="Edit the content shown beside the site visit form."
        >
          <div className={styles.formStack}>
            <Field
              label="Eyebrow"
              value={
                content.siteVisit
                  .eyebrow
              }
              onChange={(value) =>
                updateSiteVisit(
                  "eyebrow",
                  value
                )
              }
            />

            <Field
              label="Title"
              value={
                content.siteVisit.title
              }
              onChange={(value) =>
                updateSiteVisit(
                  "title",
                  value
                )
              }
            />

            <TextArea
              label="Description"
              value={
                content.siteVisit
                  .description
              }
              onChange={(value) =>
                updateSiteVisit(
                  "description",
                  value
                )
              }
            />

            <Field
              label="Button Text"
              value={
                content.siteVisit
                  .buttonText
              }
              onChange={(value) =>
                updateSiteVisit(
                  "buttonText",
                  value
                )
              }
            />
          </div>
        </EditorSection>

        {/* =================================================
            FOOTER
        ================================================= */}

        <EditorSection
          number="09"
          title="Footer"
          description="Edit the footer text displayed at the bottom of the website."
        >
          <div className={styles.formStack}>
            <TextArea
              label="Footer Description"
              value={
                content.footer
                  .description
              }
              onChange={(value) =>
                updateFooter(
                  "description",
                  value
                )
              }
            />

            <Field
              label="Location"
              value={
                content.footer.location
              }
              onChange={(value) =>
                updateFooter(
                  "location",
                  value
                )
              }
            />
          </div>
        </EditorSection>

        {/* =================================================
            BOTTOM SAVE
        ================================================= */}

        <div className={styles.bottomSave}>
          <button
            type="button"
            className={styles.saveButton}
            onClick={saveContent}
            disabled={
              saving || uploading
            }
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </main>
    </div>
  );
}

/*
  ============================================================
  EDITOR SECTION
  ============================================================
*/

function EditorSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section
      className={
        styles.editorCard
      }
    >
      <div
        className={
          styles.cardHeader
        }
      >
        <div>
          <span
            className={
              styles.sectionNumber
            }
          >
            {number}
          </span>

          <div>
            <h2>{title}</h2>

            <p>
              {description}
            </p>
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}

/*
  ============================================================
  FIELD
  ============================================================
*/

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
}) {
  return (
    <div
      className={
        styles.field
      }
    >
      <label>
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
      />
    </div>
  );
}

/*
  ============================================================
  TEXT AREA
  ============================================================
*/

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
}) {
  return (
    <div
      className={
        styles.field
      }
    >
      <label>
        {label}
      </label>

      <textarea
        rows={4}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
      />
    </div>
  );
}

/*
  ============================================================
  STAT CARD
  ============================================================
*/

function StatCard({
  number,
  label,
  onNumberChange,
  onLabelChange,
}: {
  number: string;
  label: string;
  onNumberChange: (
    value: string
  ) => void;
  onLabelChange: (
    value: string
  ) => void;
}) {
  return (
    <div
      className={
        styles.statCard
      }
    >
      <Field
        label="Number"
        value={number}
        onChange={
          onNumberChange
        }
      />

      <Field
        label="Label"
        value={label}
        onChange={
          onLabelChange
        }
      />
    </div>
  );
}