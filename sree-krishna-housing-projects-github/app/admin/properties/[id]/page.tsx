"use client";

import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import { adminSupabase } from "@/lib/adminSupabase";

interface Property {
  id: string;

  title: string | null;
  slug: string | null;

  property_type: string | null;
  category: string | null;

  location: string | null;
  price: string | null;
  area: string | null;

  description: string | null;

  amenities: string[] | null;

  image_urls: string[] | null;

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

  main_image: string | null;

  gallery_images: string[] | null;

  badge: string | null;

  is_featured: boolean | null;

  is_active: boolean | null;

  display_order: number | null;
}

export default function EditPropertyPage() {
  const router = useRouter();

  const params = useParams();

  const propertyId = params.id as string;

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploadingMainImage, setUploadingMainImage] =
    useState(false);

  const [uploadingGallery, setUploadingGallery] =
    useState(false);

  const [property, setProperty] =
    useState<Property | null>(null);

  const [amenitiesText, setAmenitiesText] =
    useState("");

  useEffect(() => {
    checkAdminAndLoadProperty();
  }, []);

  const checkAdminAndLoadProperty =
    async () => {
      const {
        data: { user },
      } = await adminSupabase.auth.getUser();

      if (!user) {
        router.push("/admin/login");
        return;
      }

      const {
        data: adminUser,
        error,
      } = await adminSupabase
        .from("admin_users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (error || !adminUser) {
        await adminSupabase.auth.signOut();

        router.push("/admin/login");

        return;
      }

      await loadProperty();
    };

  const loadProperty = async () => {
    setLoading(true);

    const {
      data,
      error,
    } = await adminSupabase
      .from("properties")
      .select("*")
      .eq("id", propertyId)
      .single();

    if (error || !data) {
      console.error(
        "Error loading property:",
        error
      );

      alert("Unable to load property.");

      router.push("/admin/properties");

      return;
    }

    const galleryImages =
      Array.isArray(data.gallery_images)
        ? data.gallery_images
        : [];

    const amenities =
      Array.isArray(data.amenities)
        ? data.amenities
        : [];

    setProperty({
      ...data,

      gallery_images: galleryImages,

      amenities,

      is_featured:
        data.is_featured ?? false,

      is_active:
        data.is_active ?? true,
    });

    setAmenitiesText(
      amenities.join(", ")
    );

    setLoading(false);
  };

  const updateField = (
    field: keyof Property,
    value:
      | string
      | boolean
      | number
      | string[]
      | null
  ) => {
    if (!property) {
      return;
    }

    setProperty((currentProperty) => {
      if (!currentProperty) {
        return currentProperty;
      }

      return {
        ...currentProperty,
        [field]: value,
      };
    });
  };

  const generateSlug = (
    title: string
  ) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const title = event.target.value;

    if (!property) {
      return;
    }

    updateField(
      "title",
      title
    );

    /*
     * Automatically update slug only
     * when the slug is empty.
     */

    if (!property.slug) {
      updateField(
        "slug",
        generateSlug(title)
      );
    }
  };

  const uploadFile = async (
    file: File,
    folder: string
  ) => {
    const extension =
      file.name.split(".").pop() || "jpg";

    const fileName =
      `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${extension}`;

    const filePath =
      `${folder}/${propertyId}/${fileName}`;

    const {
      error: uploadError,
    } = await adminSupabase.storage
      .from("property-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(
        uploadError.message
      );
    }

    const { data } =
      adminSupabase.storage
        .from("property-images")
        .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleMainImageChange =
    async (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        event.target.files?.[0];

      if (!file || !property) {
        return;
      }

      setUploadingMainImage(true);

      try {
        const imageUrl =
          await uploadFile(
            file,
            "main-images"
          );

        updateField(
          "main_image",
          imageUrl
        );

        alert(
          "Main image uploaded successfully."
        );
      } catch (error) {
        console.error(error);

        alert(
          "Unable to upload main image."
        );
      } finally {
        setUploadingMainImage(false);

        event.target.value = "";
      }
    };

  const handleGalleryChange =
    async (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      const files =
        Array.from(
          event.target.files || []
        );

      if (
        files.length === 0 ||
        !property
      ) {
        return;
      }

      setUploadingGallery(true);

      try {
        const uploadedUrls: string[] =
          [];

        for (const file of files) {
          const imageUrl =
            await uploadFile(
              file,
              "gallery-images"
            );

          uploadedUrls.push(imageUrl);
        }

        updateField(
          "gallery_images",
          [
            ...(property.gallery_images ||
              []),

            ...uploadedUrls,
          ]
        );

        alert(
          `${uploadedUrls.length} gallery image(s) uploaded successfully.`
        );
      } catch (error) {
        console.error(error);

        alert(
          "Unable to upload gallery images."
        );
      } finally {
        setUploadingGallery(false);

        event.target.value = "";
      }
    };

  const removeGalleryImage = (
    imageUrl: string
  ) => {
    if (!property) {
      return;
    }

    const confirmed =
      window.confirm(
        "Remove this gallery image?"
      );

    if (!confirmed) {
      return;
    }

    const updatedImages =
      (property.gallery_images || [])
        .filter(
          (image) =>
            image !== imageUrl
        );

    updateField(
      "gallery_images",
      updatedImages
    );
  };

  const handleAmenitiesChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value =
      event.target.value;

    setAmenitiesText(value);

    const amenitiesArray =
      value
        .split(",")
        .map(
          (item) =>
            item.trim()
        )
        .filter(
          (item) =>
            item.length > 0
        );

    updateField(
      "amenities",
      amenitiesArray
    );
  };

  const saveProperty = async () => {
    if (!property) {
      return;
    }

    if (!property.title?.trim()) {
      alert(
        "Property title is required."
      );

      return;
    }

    setSaving(true);

    try {
      const amenitiesArray =
        amenitiesText
          .split(",")
          .map(
            (item) =>
              item.trim()
          )
          .filter(
            (item) =>
              item.length > 0
          );

      const finalSlug =
        property.slug?.trim() ||
        generateSlug(
          property.title
        );

      const {
        error,
      } = await adminSupabase
        .from("properties")
        .update({
          title:
            property.title.trim(),

          slug:
            finalSlug,

          property_type:
            property.property_type?.trim() ||
            null,

          category:
            property.category?.trim() ||
            null,

          location:
            property.location?.trim() ||
            null,

          price:
            property.price?.trim() ||
            null,

          area:
            property.area?.trim() ||
            null,

          description:
            property.description?.trim() ||
            null,

          amenities:
            amenitiesArray.length > 0
              ? amenitiesArray
              : null,

          main_image:
            property.main_image,

          gallery_images:
            property.gallery_images ||
            [],

          /*
           * Keep image_urls updated too
           * because your database has it.
           */

          image_urls:
            property.gallery_images ||
            [],

          status:
            property.status?.trim() ||
            "Available",

          configuration:
            property.configuration?.trim() ||
            null,

          facing:
            property.facing?.trim() ||
            null,

          total_floors:
            property.total_floors?.trim() ||
            null,

          parking:
            property.parking?.trim() ||
            null,

          bathrooms:
            property.bathrooms?.trim() ||
            null,

          balconies:
            property.balconies?.trim() ||
            null,

          possession:
            property.possession?.trim() ||
            null,

          approvals:
            property.approvals?.trim() ||
            null,

          project_status:
            property.project_status?.trim() ||
            null,

          badge:
            property.badge?.trim() ||
            null,

          /*
           * Main featured column
           */

          is_featured:
            property.is_featured ??
            false,

          /*
           * Keep old featured column
           * synchronized because it exists
           * in your table.
           */

          featured:
            property.is_featured ??
            false,

          is_active:
            property.is_active ??
            true,

          display_order:
            Number(
              property.display_order
            ) || 0,

          updated_at:
            new Date().toISOString(),
        })
        .eq(
          "id",
          property.id
        );

      if (error) {
        console.error(error);

        alert(
          `Unable to update property: ${error.message}`
        );

        return;
      }

      alert(
        "Property updated successfully!"
      );

      router.push(
        "/admin/properties"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong while saving the property."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="adminLoadingPage">
        <div className="adminLoader"></div>

        <p>
          Loading Property...
        </p>
      </main>
    );
  }

  if (!property) {
    return null;
  }

  return (
    <main className="adminLayout">
      <AdminSidebar />

      <section className="adminMainContent">
        <header className="adminHeader">
          <div>
            <p className="adminWelcome">
              PROPERTY MANAGEMENT
            </p>

            <h1>
              Edit Property
            </h1>

            <p>
              Update property information,
              images and website settings.
            </p>
          </div>

          <button
            type="button"
            className="adminSecondaryButton"
            onClick={() =>
              router.push(
                "/admin/properties"
              )
            }
          >
            ← Back to Properties
          </button>
        </header>

        <section className="adminFormContainer">

          {/* BASIC INFORMATION */}

          <div className="adminFormSection">
            <h2>
              Basic Information
            </h2>

            <div className="adminFormGrid">

              <div className="adminFormGroup">
                <label>
                  Property Title *
                </label>

                <input
                  type="text"
                  value={
                    property.title || ""
                  }
                  onChange={
                    handleTitleChange
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Property Slug
                </label>

                <input
                  type="text"
                  value={
                    property.slug || ""
                  }
                  onChange={(event) =>
                    updateField(
                      "slug",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Property Type
                </label>

                <input
                  type="text"
                  value={
                    property.property_type ||
                    ""
                  }
                  onChange={(event) =>
                    updateField(
                      "property_type",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Category
                </label>

                <input
                  type="text"
                  value={
                    property.category ||
                    ""
                  }
                  onChange={(event) =>
                    updateField(
                      "category",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Location
                </label>

                <input
                  type="text"
                  value={
                    property.location ||
                    ""
                  }
                  onChange={(event) =>
                    updateField(
                      "location",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Price
                </label>

                <input
                  type="text"
                  value={
                    property.price || ""
                  }
                  onChange={(event) =>
                    updateField(
                      "price",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Area
                </label>

                <input
                  type="text"
                  value={
                    property.area || ""
                  }
                  onChange={(event) =>
                    updateField(
                      "area",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Badge
                </label>

                <input
                  type="text"
                  placeholder="Example: NEW LAUNCH"
                  value={
                    property.badge || ""
                  }
                  onChange={(event) =>
                    updateField(
                      "badge",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Status
                </label>

                <select
                  value={
                    property.status ||
                    "Available"
                  }
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target.value
                    )
                  }
                >
                  <option value="Available">
                    Available
                  </option>

                  <option value="Under Construction">
                    Under Construction
                  </option>

                  <option value="Sold Out">
                    Sold Out
                  </option>

                  <option value="Coming Soon">
                    Coming Soon
                  </option>
                </select>
              </div>

            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="adminFormSection">
            <h2>
              Description
            </h2>

            <div className="adminFormGroup">
              <label>
                Property Description
              </label>

              <textarea
                rows={7}
                value={
                  property.description ||
                  ""
                }
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value
                  )
                }
              />
            </div>
          </div>

          {/* PROPERTY DETAILS */}

          <div className="adminFormSection">
            <h2>
              Property Details
            </h2>

            <div className="adminFormGrid">

              <div className="adminFormGroup">
                <label>
                  Configuration
                </label>

                <input
                  type="text"
                  value={
                    property.configuration ||
                    ""
                  }
                  onChange={(event) =>
                    updateField(
                      "configuration",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Facing
                </label>

                <input
                  type="text"
                  value={
                    property.facing ||
                    ""
                  }
                  onChange={(event) =>
                    updateField(
                      "facing",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Total Floors
                </label>

                <input
                  type="text"
                  value={
                    property.total_floors ||
                    ""
                  }
                  onChange={(event) =>
                    updateField(
                      "total_floors",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Parking
                </label>

                <input
                  type="text"
                  value={
                    property.parking ||
                    ""
                  }
                  onChange={(event) =>
                    updateField(
                      "parking",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Bathrooms
                </label>

                <input
                  type="text"
                  value={
                    property.bathrooms ||
                    ""
                  }
                  onChange={(event) =>
                    updateField(
                      "bathrooms",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Balconies
                </label>

                <input
                  type="text"
                  value={
                    property.balconies ||
                    ""
                  }
                  onChange={(event) =>
                    updateField(
                      "balconies",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Possession
                </label>

                <input
                  type="text"
                  value={
                    property.possession ||
                    ""
                  }
                  onChange={(event) =>
                    updateField(
                      "possession",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Approvals
                </label>

                <input
                  type="text"
                  value={
                    property.approvals ||
                    ""
                  }
                  onChange={(event) =>
                    updateField(
                      "approvals",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Project Status
                </label>

                <input
                  type="text"
                  value={
                    property.project_status ||
                    ""
                  }
                  onChange={(event) =>
                    updateField(
                      "project_status",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Display Order
                </label>

                <input
                  type="number"
                  min="0"
                  value={
                    property.display_order ??
                    0
                  }
                  onChange={(event) =>
                    updateField(
                      "display_order",
                      Number(
                        event.target.value
                      )
                    )
                  }
                />
              </div>

            </div>
          </div>

          {/* AMENITIES */}

          <div className="adminFormSection">
            <h2>
              Amenities
            </h2>

            <div className="adminFormGroup">
              <label>
                Amenities
              </label>

              <textarea
                rows={4}
                placeholder="Park, Security, Water, Electricity"
                value={amenitiesText}
                onChange={
                  handleAmenitiesChange
                }
              />

              <small>
                Separate each amenity with
                a comma.
              </small>
            </div>
          </div>

          {/* MAIN IMAGE */}

          <div className="adminFormSection">
            <h2>
              Main Property Image
            </h2>

            {property.main_image && (
              <div className="adminMainImagePreview">
                <img
                  src={
                    property.main_image
                  }
                  alt={
                    property.title ||
                    "Property"
                  }
                />
              </div>
            )}

            <div className="adminFormGroup">
              <label>
                Replace Main Image
              </label>

              <input
                type="file"
                accept="image/*"
                disabled={
                  uploadingMainImage
                }
                onChange={
                  handleMainImageChange
                }
              />

              {uploadingMainImage && (
                <p>
                  Uploading main image...
                </p>
              )}
            </div>
          </div>

          {/* GALLERY */}

          <div className="adminFormSection">
            <h2>
              Property Gallery
            </h2>

            {property.gallery_images &&
              property.gallery_images.length >
                0 && (
                <div className="adminGalleryGrid">
                  {property.gallery_images.map(
                    (image, index) => (
                      <div
                        className="adminGalleryItem"
                        key={`${image}-${index}`}
                      >
                        <img
                          src={image}
                          alt={`Gallery ${
                            index + 1
                          }`}
                        />

                        <button
                          type="button"
                          className="adminDeleteButton"
                          onClick={() =>
                            removeGalleryImage(
                              image
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}

            <div className="adminFormGroup">
              <label>
                Add Gallery Images
              </label>

              <input
                type="file"
                accept="image/*"
                multiple
                disabled={
                  uploadingGallery
                }
                onChange={
                  handleGalleryChange
                }
              />

              {uploadingGallery && (
                <p>
                  Uploading gallery images...
                </p>
              )}
            </div>
          </div>

          {/* WEBSITE SETTINGS */}

          <div className="adminFormSection">
            <h2>
              Website Settings
            </h2>

            <div className="adminToggleGrid">

              <label className="adminToggle">
                <input
                  type="checkbox"
                  checked={
                    property.is_active ??
                    true
                  }
                  onChange={(event) =>
                    updateField(
                      "is_active",
                      event.target.checked
                    )
                  }
                />

                <span>
                  Active / Show on Website
                </span>
              </label>

              <label className="adminToggle">
                <input
                  type="checkbox"
                  checked={
                    property.is_featured ??
                    false
                  }
                  onChange={(event) =>
                    updateField(
                      "is_featured",
                      event.target.checked
                    )
                  }
                />

                <span>
                  Featured Property
                </span>
              </label>

            </div>
          </div>

          {/* ACTION BUTTONS */}

          <div className="adminFormActions">

            <button
              type="button"
              className="adminSecondaryButton"
              disabled={saving}
              onClick={() =>
                router.push(
                  "/admin/properties"
                )
              }
            >
              Cancel
            </button>

            <button
              type="button"
              className="adminPrimaryButton"
              disabled={saving}
              onClick={saveProperty}
            >
              {saving
                ? "Saving..."
                : "Save Property Changes"}
            </button>

          </div>

        </section>
      </section>
    </main>
  );
}