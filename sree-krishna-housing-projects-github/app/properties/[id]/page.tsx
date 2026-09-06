import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPropertyById,
  properties,
} from "../../../lib/properties";

type PropertyDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }));
}

export default async function PropertyDetailsPage(
  {
    params,
  }: PropertyDetailsPageProps
) {
  const { id } = await params;

  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <main className="propertyDetailsPage">

      {/* ================= HEADER ================= */}

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


      {/* ================= MAIN CONTENT ================= */}

      <section className="propertyDetailsSection">


        {/* ================= BACK ================= */}

        <Link
          href="/properties"
          className="backToProperties"
        >
          ← Back to Properties
        </Link>


        {/* ================= IMAGE GALLERY ================= */}

        <div className="propertyGallery">

          <div className="mainPropertyImage">

            <img
              src={property.images[0]}
              alt={property.name}
            />

          </div>


          <div className="propertyGalleryGrid">

            {property.images
              .slice(1)
              .map((image, index) => (

                <div
                  className="galleryImage"
                  key={`${property.id}-${index}`}
                >

                  <img
                    src={image}
                    alt={`${property.name} ${index + 2}`}
                  />

                </div>

              ))}

          </div>

        </div>


        {/* ================= PROPERTY CONTENT ================= */}

        <div className="propertyDetailsLayout">


          {/* ================= LEFT CONTENT ================= */}

          <div className="propertyDetailsMain">


            {/* ================= BADGES ================= */}

            <div className="detailBadges">

              <span className="detailStatusBadge">
                {property.status}
              </span>

              <span className="detailTypeBadge">
                {property.type}
              </span>

            </div>


            {/* ================= TITLE ================= */}

            <h1>
              {property.name}
            </h1>


            {/* ================= LOCATION ================= */}

            <p className="detailLocation">

              <span>
                📍
              </span>

              {property.location}

            </p>


            {/* ================= PRICE ================= */}

            <h2 className="detailPrice">

              {property.price}

            </h2>


            <div className="detailSectionDivider" />


            {/* ================= PROPERTY INFORMATION ================= */}

            <section className="propertyOverview">

              <h2>
                Property Overview
              </h2>


              <div className="propertyOverviewGrid">


                <div className="overviewItem">

                  <span>
                    CONFIGURATION
                  </span>

                  <strong>
                    {property.configuration}
                  </strong>

                </div>


                <div className="overviewItem">

                  <span>
                    AREA
                  </span>

                  <strong>
                    {property.area}
                  </strong>

                </div>


                <div className="overviewItem">

                  <span>
                    FACING
                  </span>

                  <strong>
                    {property.facing}
                  </strong>

                </div>


                <div className="overviewItem">

                  <span>
                    TOTAL FLOORS
                  </span>

                  <strong>
                    {property.totalFloors}
                  </strong>

                </div>


                <div className="overviewItem">

                  <span>
                    PARKING
                  </span>

                  <strong>
                    {property.parking}
                  </strong>

                </div>


                <div className="overviewItem">

                  <span>
                    BATHROOMS
                  </span>

                  <strong>
                    {property.bathrooms}
                  </strong>

                </div>


                <div className="overviewItem">

                  <span>
                    BALCONIES
                  </span>

                  <strong>
                    {property.balconies}
                  </strong>

                </div>


                <div className="overviewItem">

                  <span>
                    POSSESSION
                  </span>

                  <strong>
                    {property.possession}
                  </strong>

                </div>


              </div>

            </section>


            {/* ================= DESCRIPTION ================= */}

            <section className="propertyDescription">

              <h2>
                Description
              </h2>

              <p>
                {property.description}
              </p>

            </section>


            {/* ================= FEATURES ================= */}

            <section className="propertyFeatures">

              <h2>
                Property Features
              </h2>


              <div className="featuresGrid">

                {property.features.map(
                  (feature) => (

                    <div
                      key={feature}
                      className="featureItem"
                    >

                      <span>
                        ✓
                      </span>

                      {feature}

                    </div>

                  )
                )}

              </div>

            </section>


          </div>


          {/* ================= RIGHT SIDEBAR ================= */}

          <aside className="propertyEnquiryCard">


            <h2>
              Interested in this property?
            </h2>


            <p>
              Our experts are here to help you.
            </p>


            {/* ================= BOOK SITE VISIT ================= */}

            <Link
              href="/visit"
              className="detailBookButton"
            >
              Book Site Visit
            </Link>


            {/* ================= REQUEST DETAILS ================= */}

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
Phone:
Email:`
              )}`}
              className="detailRequestButton"
            >
              Request Details
            </a>


            <div className="enquiryDivider" />


            {/* ================= CONTACT BUTTONS ================= */}

            <div className="quickContactButtons">

              <a
                href="tel:+916303688516"
                className="quickContactButton"
              >
                ☎ Call Now
              </a>


              <a
                href="https://wa.me/916303688516"
                target="_blank"
                rel="noopener noreferrer"
                className="quickContactButton"
              >
                ◯ WhatsApp
              </a>

            </div>


            <p className="enquiryNote">
              No obligation. 100% Free Consultation.
            </p>


          </aside>


        </div>


        {/* ================= BOTTOM ACTIONS ================= */}

        <div className="propertyBottomActions">

          <Link
            href="/properties"
            className="backPropertiesButton"
          >
            ← View All Properties
          </Link>


          <Link
            href="/visit"
            className="bottomBookVisitButton"
          >
            Book Site Visit
          </Link>

        </div>


      </section>

    </main>
  );
}