"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import { adminSupabase } from "@/lib/adminSupabase";

interface Property {
  id: string;
  title: string;
  property_type: string | null;
  location: string | null;
  price: string | null;
  status: string | null;
  main_image: string | null;
  is_active: boolean;
  created_at: string;
}

export default function AdminPropertiesPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    checkAdminAndLoadProperties();
  }, []);

  const checkAdminAndLoadProperties = async () => {
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

    await loadProperties();
  };

  const loadProperties = async () => {
    setLoading(true);

    const { data, error } = await adminSupabase
      .from("properties")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error loading properties:", error);
      alert("Unable to load properties.");
      setLoading(false);
      return;
    }

    setProperties(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) return;

    setDeletingId(id);

    const { error } = await adminSupabase
      .from("properties")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Unable to delete property.");
      setDeletingId(null);
      return;
    }

    setProperties((currentProperties) =>
      currentProperties.filter((property) => property.id !== id)
    );

    setDeletingId(null);
  };

  const handleToggleActive = async (
    id: string,
    currentStatus: boolean
  ) => {
    const { error } = await adminSupabase
      .from("properties")
      .update({
        is_active: !currentStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Unable to update property status.");
      return;
    }

    setProperties((currentProperties) =>
      currentProperties.map((property) =>
        property.id === id
          ? {
              ...property,
              is_active: !currentStatus,
            }
          : property
      )
    );
  };

  if (loading) {
    return (
      <main className="adminLoadingPage">
        <div className="adminLoader"></div>

        <p>Loading Properties...</p>
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

            <h1>Properties</h1>

            <p>
              Manage all properties displayed on your website.
            </p>
          </div>

          <button
            className="adminPrimaryButton"
            onClick={() =>
              router.push("/admin/properties/new")
            }
          >
            + Add New Property
          </button>
        </header>

        <section className="adminPropertiesSection">
          {properties.length === 0 ? (
            <div className="adminEmptyState">
              <div className="adminEmptyIcon">
                🏠
              </div>

              <h2>No Properties Found</h2>

              <p>
                You have not added any properties yet.
              </p>

              <button
                className="adminPrimaryButton"
                onClick={() =>
                  router.push("/admin/properties/new")
                }
              >
                + Add Your First Property
              </button>
            </div>
          ) : (
            <div className="adminPropertiesGrid">
              {properties.map((property) => (
                <article
                  className="adminPropertyCard"
                  key={property.id}
                >
                  <div className="adminPropertyImage">
                    {property.main_image ? (
                      <img
                        src={property.main_image}
                        alt={property.title}
                      />
                    ) : (
                      <div className="adminNoImage">
                        🏠
                      </div>
                    )}

                    <span
                      className={
                        property.is_active
                          ? "adminStatus active"
                          : "adminStatus inactive"
                      }
                    >
                      {property.is_active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>

                  <div className="adminPropertyContent">
                    <h2>{property.title}</h2>

                    <p className="adminPropertyLocation">
                      📍 {property.location || "Location not added"}
                    </p>

                    <div className="adminPropertyDetails">
                      <span>
                        {property.property_type ||
                          "Property"}
                      </span>

                      <strong>
                        {property.price || "Price not added"}
                      </strong>
                    </div>

                    <p className="adminPropertyStatus">
                      {property.status || "Available"}
                    </p>

                    <div className="adminPropertyActions">
                      <button
                        className="adminEditButton"
                        onClick={() =>
                          router.push(
                            `/admin/properties/${property.id}`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="adminToggleButton"
                        onClick={() =>
                          handleToggleActive(
                            property.id,
                            property.is_active
                          )
                        }
                      >
                        {property.is_active
                          ? "Deactivate"
                          : "Activate"}
                      </button>

                      <button
                        className="adminDeleteButton"
                        disabled={
                          deletingId === property.id
                        }
                        onClick={() =>
                          handleDelete(
                            property.id,
                            property.title
                          )
                        }
                      >
                        {deletingId === property.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}