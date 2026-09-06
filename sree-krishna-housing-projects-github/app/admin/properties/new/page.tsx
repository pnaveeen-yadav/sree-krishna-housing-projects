"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import { adminSupabase } from "@/lib/adminSupabase";

interface PropertyFormData {
  title: string;
  property_type: string;
  location: string;
  price: string;
  area: string;
  description: string;
  amenities: string;

  status: string;
  slug: string;
  configuration: string;
  facing: string;
  total_floors: string;
  parking: string;
  bathrooms: string;
  balconies: string;
  possession: string;
  approvals: string;
  project_status: string;

  badge: string;
  category: string;

  is_featured: boolean;
  is_active: boolean;
  display_order: string;
}

export default function NewPropertyPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const [mainImagePreview, setMainImagePreview] =
    useState<string>("");

  const [galleryPreviews, setGalleryPreviews] =
    useState<string[]>([]);

  const [formData, setFormData] =
    useState<PropertyFormData>({
      title: "",
      property_type: "",
      location: "",
      price: "",
      area: "",
      description: "",
      amenities: "",

      status: "Available",
      slug: "",
      configuration: "",
      facing: "",
      total_floors: "",
      parking: "",
      bathrooms: "",
      balconies: "",
      possession: "",
      approvals: "",
      project_status: "",

      badge: "",
      category: "",

      is_featured: false,
      is_active: true,
      display_order: "0",
    });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const {
      data: { user },
    } = await adminSupabase.auth.getUser();

    if (!user) {
      router.push("/admin/login");
      return;
    }

    const { data: adminUser } = await adminSupabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!adminUser) {
      await adminSupabase.auth.signOut();

      router.push("/admin/login");

      return;
    }

    setLoading(false);
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: checked,
    }));
  };

  const generateSlug = (title: string) => {
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

    setFormData((currentData) => ({
      ...currentData,
      title,
      slug:
        currentData.slug === ""
          ? generateSlug(title)
          : currentData.slug,
    }));
  };

  const handleMainImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setMainImage(file);

    const previewUrl = URL.createObjectURL(file);

    setMainImagePreview(previewUrl);
  };

  const handleGalleryChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) {
      return;
    }

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setGalleryFiles((currentFiles) => [
      ...currentFiles,
      ...files,
    ]);

    setGalleryPreviews((currentPreviews) => [
      ...currentPreviews,
      ...previews,
    ]);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryFiles((currentFiles) =>
      currentFiles.filter(
        (_, fileIndex) => fileIndex !== index
      )
    );

    setGalleryPreviews((currentPreviews) =>
      currentPreviews.filter(
        (_, imageIndex) => imageIndex !== index
      )
    );
  };

  const createFileName = (
    file: File,
    folder: string
  ) => {
    const extension =
      file.name.split(".").pop() || "jpg";

    const uniqueId =
      typeof crypto !== "undefined"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}`;

    return `${folder}/${uniqueId}.${extension}`;
  };

  const uploadImage = async (
    file: File,
    folder: string
  ) => {
    const filePath = createFileName(
      file,
      folder
    );

    const { error: uploadError } =
      await adminSupabase.storage
        .from("property-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } =
      adminSupabase.storage
        .from("property-images")
        .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter the property title.");
      return;
    }

    if (!mainImage) {
      alert(
        "Please select a main property image."
      );

      return;
    }

    setSaving(true);

    try {
      /*
       * UPLOAD MAIN IMAGE
       */

      const mainImageUrl =
        await uploadImage(
          mainImage,
          "main-images"
        );

      /*
       * UPLOAD GALLERY IMAGES
       */

      const galleryImageUrls: string[] = [];

      for (const file of galleryFiles) {
        const imageUrl =
          await uploadImage(
            file,
            "gallery-images"
          );

        galleryImageUrls.push(imageUrl);
      }

      /*
       * CONVERT AMENITIES
       *
       * Example:
       * Park, Security, Water
       *
       * Will become:
       * ["Park", "Security", "Water"]
       */

      const amenitiesArray =
        formData.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(
            (item) => item.length > 0
          );

      /*
       * CREATE SLUG
       */

      const finalSlug =
        formData.slug.trim() ||
        generateSlug(formData.title);

      /*
       * INSERT PROPERTY
       */

      const { error } =
        await adminSupabase
          .from("properties")
          .insert({
            title: formData.title.trim(),

            property_type:
              formData.property_type.trim() ||
              null,

            location:
              formData.location.trim() ||
              null,

            price:
              formData.price.trim() ||
              null,

            area:
              formData.area.trim() ||
              null,

            description:
              formData.description.trim() ||
              null,

            amenities:
              amenitiesArray.length > 0
                ? amenitiesArray
                : null,

            /*
             * Both columns are supported
             * based on your current database
             */

            image_urls:
              galleryImageUrls.length > 0
                ? galleryImageUrls
                : null,

            main_image: mainImageUrl,

            gallery_images:
              galleryImageUrls.length > 0
                ? galleryImageUrls
                : [],

            featured:
              formData.is_featured,

            is_featured:
              formData.is_featured,

            status:
              formData.status.trim() ||
              "Available",

            slug: finalSlug,

            configuration:
              formData.configuration.trim() ||
              null,

            facing:
              formData.facing.trim() ||
              null,

            total_floors:
              formData.total_floors.trim() ||
              null,

            parking:
              formData.parking.trim() ||
              null,

            bathrooms:
              formData.bathrooms.trim() ||
              null,

            balconies:
              formData.balconies.trim() ||
              null,

            possession:
              formData.possession.trim() ||
              null,

            approvals:
              formData.approvals.trim() ||
              null,

            project_status:
              formData.project_status.trim() ||
              null,

            badge:
              formData.badge.trim() ||
              null,

            category:
              formData.category.trim() ||
              null,

            is_active:
              formData.is_active,

            display_order:
              Number(
                formData.display_order
              ) || 0,

            updated_at:
              new Date().toISOString(),
          });

      if (error) {
        console.error(
          "Error creating property:",
          error
        );

        alert(
          `Unable to create property: ${error.message}`
        );

        setSaving(false);

        return;
      }

      alert(
        "Property created successfully!"
      );

      router.push("/admin/properties");
    } catch (error) {
      console.error(
        "Property creation error:",
        error
      );

      if (error instanceof Error) {
        alert(
          `Unable to upload images or create property: ${error.message}`
        );
      } else {
        alert(
          "Something went wrong while creating the property."
        );
      }

      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="adminLoadingPage">
        <div className="adminLoader"></div>

        <p>
          Loading Property Form...
        </p>
      </main>
    );
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
              Add New Property
            </h1>

            <p>
              Add a new property to your
              website.
            </p>
          </div>

          <button
            type="button"
            className="adminSecondaryButton"
            onClick={() =>
              router.push("/admin/properties")
            }
          >
            ← Back to Properties
          </button>
        </header>

        <form
          className="adminPropertyForm"
          onSubmit={handleSubmit}
        >
          {/* =====================================
              BASIC INFORMATION
          ===================================== */}

          <section className="adminFormSection">
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
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Example: Green Valley Plots"
                  required
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Property Type
                </label>

                <input
                  type="text"
                  name="property_type"
                  value={
                    formData.property_type
                  }
                  onChange={handleChange}
                  placeholder="Example: Plot, Villa, Apartment"
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Example: Tirupati"
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Price
                </label>

                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Example: ₹ 45 Lakhs"
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Area
                </label>

                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Example: 2400 Sq.Ft"
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Example: Residential"
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Badge
                </label>

                <input
                  type="text"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  placeholder="Example: NEW LAUNCH"
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Property Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
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

            <div className="adminFormGroup">
              <label>
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter complete property description..."
                rows={6}
              />
            </div>
          </section>

          {/* =====================================
              PROPERTY DETAILS
          ===================================== */}

          <section className="adminFormSection">
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
                  name="configuration"
                  value={
                    formData.configuration
                  }
                  onChange={handleChange}
                  placeholder="Example: 2 BHK"
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Facing
                </label>

                <input
                  type="text"
                  name="facing"
                  value={formData.facing}
                  onChange={handleChange}
                  placeholder="Example: East"
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Total Floors
                </label>

                <input
                  type="text"
                  name="total_floors"
                  value={
                    formData.total_floors
                  }
                  onChange={handleChange}
                  placeholder="Example: G+5"
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Parking
                </label>

                <input
                  type="text"
                  name="parking"
                  value={formData.parking}
                  onChange={handleChange}
                  placeholder="Example: 2 Car Parking"
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Bathrooms
                </label>

                <input
                  type="text"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="Example: 2"
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Balconies
                </label>

                <input
                  type="text"
                  name="balconies"
                  value={formData.balconies}
                  onChange={handleChange}
                  placeholder="Example: 1"
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Possession
                </label>

                <input
                  type="text"
                  name="possession"
                  value={formData.possession}
                  onChange={handleChange}
                  placeholder="Example: Dec 2026"
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Approvals
                </label>

                <input
                  type="text"
                  name="approvals"
                  value={formData.approvals}
                  onChange={handleChange}
                  placeholder="Example: DTCP Approved"
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Project Status
                </label>

                <input
                  type="text"
                  name="project_status"
                  value={
                    formData.project_status
                  }
                  onChange={handleChange}
                  placeholder="Example: New Launch"
                />
              </div>

              <div className="adminFormGroup">
                <label>
                  Display Order
                </label>

                <input
                  type="number"
                  name="display_order"
                  value={
                    formData.display_order
                  }
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
          </section>

          {/* =====================================
              AMENITIES
          ===================================== */}

          <section className="adminFormSection">
            <h2>
              Amenities
            </h2>

            <div className="adminFormGroup">
              <label>
                Amenities
              </label>

              <textarea
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="Example: Park, Security, Water Connection, Electricity"
                rows={4}
              />

              <small>
                Separate each amenity using a
                comma.
              </small>
            </div>
          </section>

          {/* =====================================
              IMAGES
          ===================================== */}

          <section className="adminFormSection">
            <h2>
              Property Images
            </h2>

            <div className="adminFormGroup">
              <label>
                Main Property Image *
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
              />

              {mainImagePreview && (
                <div className="adminImagePreview">
                  <img
                    src={mainImagePreview}
                    alt="Main property preview"
                  />

                  <button
                    type="button"
                    className="adminRemoveImageButton"
                    onClick={() => {
                      setMainImage(null);
                      setMainImagePreview("");
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <div className="adminFormGroup">
              <label>
                Gallery Images
              </label>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
              />

              {galleryPreviews.length > 0 && (
                <div className="adminGalleryPreview">
                  {galleryPreviews.map(
                    (image, index) => (
                      <div
                        className="adminGalleryPreviewItem"
                        key={`${image}-${index}`}
                      >
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeGalleryImage(
                              index
                            )
                          }
                        >
                          ×
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </section>

          {/* =====================================
              WEBSITE SETTINGS
          ===================================== */}

          <section className="adminFormSection">
            <h2>
              Website Settings
            </h2>

            <div className="adminFormGrid">
              <div className="adminFormGroup">
                <label>
                  Property Slug
                </label>

                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="green-valley-plots"
                />

                <small>
                  Used for the property URL.
                </small>
              </div>
            </div>

            <div className="adminCheckboxGroup">
              <label className="adminCheckbox">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={
                    formData.is_featured
                  }
                  onChange={
                    handleCheckboxChange
                  }
                />

                <span>
                  Featured Property
                </span>
              </label>

              <label className="adminCheckbox">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={
                    formData.is_active
                  }
                  onChange={
                    handleCheckboxChange
                  }
                />

                <span>
                  Active / Show on Website
                </span>
              </label>
            </div>
          </section>

          {/* =====================================
              ACTION BUTTONS
          ===================================== */}

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
              type="submit"
              className="adminPrimaryButton"
              disabled={saving}
            >
              {saving
                ? "Creating Property..."
                : "Create Property"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}