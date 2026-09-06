import Link from "next/link";
import { notFound } from "next/navigation";
import { properties } from "../../../lib/properties";

type PropertyDetails = (typeof properties)[number] & {
  images?: string[];
  gallery?: string[];
  status?: string;
  description?: string;
  highlights?: string[];
  facing?: string;
  approvals?: string;
  possession?: string;
  totalPlots?: string;
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PropertyDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const property = properties.find(
    (item) => String(item.id) === id
  ) as PropertyDetails | undefined;

  if (!property) {
    notFound();
  }

  /*
    =====================================================
    PROPERTY IMAGES

    Supports:
    images: []
    OR
    gallery: []
    OR
    image: ""
    =====================================================
  */

  const propertyImages =
    property.images && property.images.length > 0
      ? property.images
      : property.gallery && property.gallery.length > 0
      ? property.gallery
      : [property.image];

  /*
    =====================================================
    MAKE SURE WE HAVE ENOUGH IMAGES FOR THE GALLERY

    The same main image will be used as fallback if
    additional gallery images are not available.
    =====================================================
  */

  const galleryImages = [...propertyImages];

  while (galleryImages.length < 7) {
    galleryImages.push(propertyImages[0]);
  }

  const description =
    property.description ||
    `${property.name} is a carefully selected property by Sree Krishna Housing Projects. It offers an excellent opportunity for buyers and investors looking for a quality property in a prime location.`;

  const highlights =
    property.highlights && property.highlights.length > 0
      ? property.highlights
      : [
          "Prime Location",
          "Excellent Connectivity",
          "Investment Opportunity",
          "Professional Customer Support",
        ];

  return (
    <main className="propertyDetailsPage">

      {/* =====================================================
          HEADER
      ===================================================== */}

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


      {/* =====================================================
          PROPERTY DETAILS SECTION
      ===================================================== */}

      <section className="propertyDetailsSection">

        <Link
          href="/properties"
          className="backToProperties"
        >
          ← Back to Properties
        </Link>


        {/* =====================================================
            MAIN LAYOUT
        ===================================================== */}

        <div className="propertyDetailsLayout">


          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <div className="propertyDetailsContent">


            {/* =====================================================
                IMAGE GALLERY
            ===================================================== */}

            <section className="propertyGallery">


              {/* =====================================================
                  MAIN IMAGE
              ===================================================== */}

              <div className="propertyMainImage">

                <img
                  src={galleryImages[0]}
                  alt={property.name}
                />

              </div>


              {/* =====================================================
                  SMALL IMAGE GRID

                  2 COLUMNS
                  3 ROWS

                  Same style as your reference image.
              ===================================================== */}

              <div className="propertyGalleryGrid">


                {/* IMAGE 1 */}

                <div className="propertyGalleryItem">

                  <img
                    src={galleryImages[1]}
                    alt={`${property.name} gallery 1`}
                  />

                </div>


                {/* IMAGE 2 */}

                <div className="propertyGalleryItem">

                  <img
                    src={galleryImages[2]}
                    alt={`${property.name} gallery 2`}
                  />

                </div>


                {/* IMAGE 3 */}

                <div className="propertyGalleryItem">

                  <img
                    src={galleryImages[3]}
                    alt={`${property.name} gallery 3`}
                  />

                </div>


                {/* IMAGE 4 */}

                <div className="propertyGalleryItem">

                  <img
                    src={galleryImages[4]}
                    alt={`${property.name} gallery 4`}
                  />

                </div>


                {/* IMAGE 5 */}

                <div className="propertyGalleryItem">

                  <img
                    src={galleryImages[5]}
                    alt={`${property.name} gallery 5`}
                  />

                </div>


                {/* =====================================================
                    MORE PHOTOS
                ===================================================== */}

                <div className="propertyGalleryItem morePhotosItem">

                  <img
                    src={galleryImages[6]}
                    alt={`${property.name} gallery`}
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


            {/* =====================================================
                PROPERTY TITLE
            ===================================================== */}

            <section className="propertyTitleSection">


              <div className="propertyDetailsBadges">

                <span className="propertyStatusLarge">

                  {property.status || "AVAILABLE"}

                </span>


                <span className="propertyTypeLarge">

                  {property.type}

                </span>

              </div>


              <h1>

                {property.name}

              </h1>


              <p className="propertyDetailsLocation">

                📍 {property.location}

              </p>


              <p className="propertyDetailsPrice">

                {property.price}

              </p>


            </section>


            {/* =====================================================
                PROPERTY OVERVIEW
            ===================================================== */}

            <section className="propertyOverview">

              <h2>
                Property Overview
              </h2>


              <div className="propertyOverviewGrid">


                <div className="overviewItem">

                  <span>
                    PROPERTY TYPE
                  </span>

                  <strong>
                    {property.type}
                  </strong>

                </div>


                <div className="overviewItem">

                  <span>
                    AREA
                  </span>

                  <strong>
                    {property.size}
                  </strong>

                </div>


                <div className="overviewItem">

                  <span>
                    FACING
                  </span>

                  <strong>
                    {property.facing || "Not Specified"}
                  </strong>

                </div>


                <div className="overviewItem">

                  <span>
                    APPROVALS
                  </span>

                  <strong>
                    {property.approvals || "Available"}
                  </strong>

                </div>


                <div className="overviewItem">

                  <span>
                    LOCATION
                  </span>

                  <strong>
                    {property.location}
                  </strong>

                </div>


                <div className="overviewItem">

                  <span>
                    PROJECT STATUS
                  </span>

                  <strong>
                    {property.status || "Available"}
                  </strong>

                </div>


                <div className="overviewItem">

                  <span>
                    POSSESSION
                  </span>

                  <strong>
                    {property.possession || "Contact Us"}
                  </strong>

                </div>


                <div className="overviewItem">

                  <span>
                    TOTAL UNITS
                  </span>

                  <strong>
                    {property.totalPlots || "Contact Us"}
                  </strong>

                </div>


              </div>

            </section>


            {/* =====================================================
                DESCRIPTION
            ===================================================== */}

            <section className="propertyDescription">

              <h2>
                Description
              </h2>


              <p>

                {description}

              </p>

            </section>


            {/* =====================================================
                HIGHLIGHTS
            ===================================================== */}

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


          {/* =====================================================
              RIGHT SIDE ACTION CARD
          ===================================================== */}

          <aside className="propertyActionCard">


            <h2>
              Interested in this Property?
            </h2>


            <p>

              Our experts are here to help you.

            </p>


            {/* =====================================================
                BOOK SITE VISIT
            ===================================================== */}

            <Link
              href="/visit"
              className="propertyBookButton"
            >

              📅 Book Site Visit

            </Link>


            {/* =====================================================
                ENQUIRE
            ===================================================== */}

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
              className="propertyEnquireButton"
            >

              Enquire Now

            </a>


            <div className="propertyActionDivider" />


            {/* =====================================================
                QUICK ACTIONS
            ===================================================== */}

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