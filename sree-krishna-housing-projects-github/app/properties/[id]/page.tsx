import Link from "next/link";
import { notFound } from "next/navigation";

import { supabase } from "@/lib/supabase";

interface Property {
  id: string;

  title: string;
  property_type: string | null;
  location: string | null;
  price: string | null;
  area: string | null;

  description: string | null;

  amenities: string[] | null;

  image_urls: string[] | null;
  main_image: string | null;
  gallery_images: string[] | null;

  status: string | null;

  configuration: string | null;
  facing: string | null;
  total_floors: string | null;

  parking: string | null;
  bathrooms: string | null;
  balconies: string | null;

  possession: string | null;
  approvals: string | null;

  project_status: string | null;

  badge: string | null;
  category: string | null;

  is_featured: boolean | null;
  is_active: boolean | null;
}

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PropertyDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("properties")
    .select(`
      id,
      title,
      property_type,
      location,
      price,
      area,
      description,
      amenities,
      image_urls,
      main_image,
      gallery_images,
      status,
      configuration,
      facing,
      total_floors,
      parking,
      bathrooms,
      balconies,
      possession,
      approvals,
      project_status,
      badge,
      category,
      is_featured,
      is_active
    `)
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    notFound();
  }

  const property = data as Property;

  /*
    =====================================
    PROPERTY IMAGES
    =====================================
  */

  const propertyImages: string[] = [];

  /*
    Main Image
  */

  if (property.main_image) {
    propertyImages.push(property.main_image);
  }

  /*
    Gallery Images
  */

  if (
    Array.isArray(property.gallery_images)
  ) {
    property.gallery_images.forEach(
      (image) => {
        if (
          image &&
          !propertyImages.includes(image)
        ) {
          propertyImages.push(image);
        }
      }
    );
  }

  /*
    Image URLs
  */

  if (
    Array.isArray(property.image_urls)
  ) {
    property.image_urls.forEach(
      (image) => {
        if (
          image &&
          !propertyImages.includes(image)
        ) {
          propertyImages.push(image);
        }
      }
    );
  }

  /*
    If no image exists
  */

  if (propertyImages.length === 0) {
    propertyImages.push(
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    );
  }

  /*
    =====================================
    GALLERY IMAGES
    =====================================
  */

  const galleryImages = [...propertyImages];

  while (galleryImages.length < 7) {
    galleryImages.push(
      propertyImages[0]
    );
  }

  /*
    =====================================
    DESCRIPTION
    =====================================
  */

  const description =
    property.description ||
    `${property.title} is a carefully selected property by Sree Krishna Housing Projects. It offers an excellent opportunity for buyers and investors looking for a quality property in a prime location.`;

  /*
    =====================================
    HIGHLIGHTS / AMENITIES
    =====================================
  */

  const highlights =
    property.amenities &&
    property.amenities.length > 0
      ? property.amenities
      : [
          "Prime Location",
          "Excellent Connectivity",
          "Investment Opportunity",
          "Professional Customer Support",
        ];

  /*
    =====================================
    DISPLAY VALUES
    =====================================
  */

  const propertyType =
    property.property_type ||
    "Property";

  const propertyStatus =
    property.project_status ||
    property.status ||
    "AVAILABLE";

  const propertyArea =
    property.area ||
    "Not Specified";

  const propertyPrice =
    property.price ||
    "Contact Us";

  /*
    =====================================
    PAGE
    =====================================
  */

  return (
    <main className="propertyDetailsPage">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="nav propertyDetailsNav">

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


      {/* =====================================
          PROPERTY DETAILS
      ===================================== */}

      <section className="propertyDetailsSection">

        <Link
          href="/properties"
          className="backToProperties"
        >
          ← Back to Properties
        </Link>


        <div className="propertyDetailsLayout">


          {/* =====================================
              LEFT SIDE
          ===================================== */}

          <div className="propertyDetailsContent">


            {/* =====================================
                IMAGE GALLERY
            ===================================== */}

            <section className="propertyGallery">


              {/* MAIN IMAGE */}

              <div className="propertyMainImage">

                <img
                  src={galleryImages[0]}
                  alt={property.title}
                />

              </div>


              {/* GALLERY */}

              <div className="propertyGalleryGrid">


                {/* IMAGE 1 */}

                <div className="propertyGalleryItem">

                  <img
                    src={galleryImages[1]}
                    alt={`${property.title} gallery 1`}
                  />

                </div>


                {/* IMAGE 2 */}

                <div className="propertyGalleryItem">

                  <img
                    src={galleryImages[2]}
                    alt={`${property.title} gallery 2`}
                  />

                </div>


                {/* IMAGE 3 */}

                <div className="propertyGalleryItem">

                  <img
                    src={galleryImages[3]}
                    alt={`${property.title} gallery 3`}
                  />

                </div>


                {/* IMAGE 4 */}

                <div className="propertyGalleryItem">

                  <img
                    src={galleryImages[4]}
                    alt={`${property.title} gallery 4`}
                  />

                </div>


                {/* IMAGE 5 */}

                <div className="propertyGalleryItem">

                  <img
                    src={galleryImages[5]}
                    alt={`${property.title} gallery 5`}
                  />

                </div>


                {/* MORE PHOTOS */}

                <div className="propertyGalleryItem morePhotosItem">

                  <img
                    src={galleryImages[6]}
                    alt={`${property.title} gallery`}
                  />


                  <div className="morePhotosOverlay">

                    <strong>
                      +{Math.max(
                        propertyImages.length - 6,
                        0
                      )}
                    </strong>

                    <span>
                      More Photos
                    </span>

                  </div>

                </div>


              </div>

            </section>


            {/* =====================================
                PROPERTY TITLE
            ===================================== */}

            <section className="propertyTitleSection">


              <div className="propertyDetailsBadges">

                <span className="propertyStatusLarge">

                  {propertyStatus}

                </span>


                <span className="propertyTypeLarge">

                  {propertyType}

                </span>

              </div>


              <h1>

                {property.title}

              </h1>


              <p className="propertyDetailsLocation">

                📍{" "}
                {property.location ||
                  "Location not specified"}

              </p>


              <p className="propertyDetailsPrice">

                {propertyPrice}

              </p>


            </section>


            {/* =====================================
                PROPERTY OVERVIEW
            ===================================== */}

            <section className="propertyOverview">


              <h2>
                Property Overview
              </h2>


              <div className="propertyOverviewGrid">


                {/* PROPERTY TYPE */}

                <div className="overviewItem">

                  <span>
                    PROPERTY TYPE
                  </span>

                  <strong>
                    {propertyType}
                  </strong>

                </div>


                {/* AREA */}

                <div className="overviewItem">

                  <span>
                    AREA
                  </span>

                  <strong>
                    {propertyArea}
                  </strong>

                </div>


                {/* FACING */}

                <div className="overviewItem">

                  <span>
                    FACING
                  </span>

                  <strong>
                    {property.facing ||
                      "Not Specified"}
                  </strong>

                </div>


                {/* APPROVALS */}

                <div className="overviewItem">

                  <span>
                    APPROVALS
                  </span>

                  <strong>
                    {property.approvals ||
                      "Contact Us"}
                  </strong>

                </div>


                {/* LOCATION */}

                <div className="overviewItem">

                  <span>
                    LOCATION
                  </span>

                  <strong>
                    {property.location ||
                      "Not Specified"}
                  </strong>

                </div>


                {/* PROJECT STATUS */}

                <div className="overviewItem">

                  <span>
                    PROJECT STATUS
                  </span>

                  <strong>
                    {propertyStatus}
                  </strong>

                </div>


                {/* POSSESSION */}

                <div className="overviewItem">

                  <span>
                    POSSESSION
                  </span>

                  <strong>
                    {property.possession ||
                      "Contact Us"}
                  </strong>

                </div>


                {/* TOTAL FLOORS */}

                <div className="overviewItem">

                  <span>
                    TOTAL FLOORS
                  </span>

                  <strong>
                    {property.total_floors ||
                      "Not Specified"}
                  </strong>

                </div>


              </div>


            </section>


            {/* =====================================
                ADDITIONAL DETAILS
            ===================================== */}

            <section className="propertyOverview">


              <h2>
                Additional Details
              </h2>


              <div className="propertyOverviewGrid">


                {/* CONFIGURATION */}

                <div className="overviewItem">

                  <span>
                    CONFIGURATION
                  </span>

                  <strong>
                    {property.configuration ||
                      "Not Specified"}
                  </strong>

                </div>


                {/* PARKING */}

                <div className="overviewItem">

                  <span>
                    PARKING
                  </span>

                  <strong>
                    {property.parking ||
                      "Not Specified"}
                  </strong>

                </div>


                {/* BATHROOMS */}

                <div className="overviewItem">

                  <span>
                    BATHROOMS
                  </span>

                  <strong>
                    {property.bathrooms ||
                      "Not Applicable"}
                  </strong>

                </div>


                {/* BALCONIES */}

                <div className="overviewItem">

                  <span>
                    BALCONIES
                  </span>

                  <strong>
                    {property.balconies ||
                      "Not Applicable"}
                  </strong>

                </div>


              </div>


            </section>


            {/* =====================================
                DESCRIPTION
            ===================================== */}

            <section className="propertyDescription">

              <h2>
                Description
              </h2>


              <p>

                {description}

              </p>

            </section>


            {/* =====================================
                HIGHLIGHTS
            ===================================== */}

            <section className="propertyHighlights">


              <h2>
                Property Highlights
              </h2>


              <div className="highlightsGrid">

                {highlights.map(
                  (highlight, index) => (

                    <div key={index}>

                      ✓ {highlight}

                    </div>

                  )
                )}

              </div>


            </section>


          </div>


          {/* =====================================
              RIGHT SIDE ACTION CARD
          ===================================== */}

          <aside className="propertyActionCard">


            <h2>
              Interested in this Property?
            </h2>


            <p>
              Our experts are here to help you.
            </p>


            {/* BOOK SITE VISIT */}

            <Link
              href="/visit"
              className="propertyBookButton"
            >

              📅 Book Site Visit

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
Price: ${propertyPrice}

Please share more details.

Name:
Phone:`
              )}`}
              className="propertyEnquireButton"
            >

              Enquire Now

            </a>


            <div className="propertyActionDivider" />


            {/* QUICK ACTIONS */}

            <div className="propertyQuickActions">


              <a
                href="tel:+916303688516"
              >

                📞 Call Now

              </a>


              <a
                href="https://wa.me/916303688516"
                target="_blank"
                rel="noopener noreferrer"
              >

                💬 WhatsApp

              </a>


            </div>


            <p className="propertyFreeText">

              No obligation. Free consultation.

            </p>


          </aside>


        </div>


      </section>


    </main>
  );
}