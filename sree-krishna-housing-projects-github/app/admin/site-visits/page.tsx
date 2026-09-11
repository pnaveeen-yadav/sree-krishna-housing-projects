"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import { adminSupabase } from "@/lib/adminSupabase";

type SiteVisit = {
  id: string;
  name: string;
  phone: string;
  preferred_date: string | null;
  preferred_time: string | null;
};

export default function AdminSiteVisitsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    checkAdminAndLoadVisits();
  }, []);

  const checkAdminAndLoadVisits = async () => {
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

    await loadVisits();
  };

  const loadVisits = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await adminSupabase
      .from("site_visits")
      .select(
        "id, name, phone, preferred_date, preferred_time"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading site visits:", error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setVisits(data || []);
    setSelectedIds([]);
    setLoading(false);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === visits.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(visits.map((visit) => visit.id));
    }
  };

  const deleteSelected = async () => {
    if (selectedIds.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} selected site visit${
        selectedIds.length > 1 ? "s" : ""
      }?`
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    const idsToDelete = [...selectedIds];

    const { error } = await adminSupabase
      .from("site_visits")
      .delete()
      .in("id", idsToDelete);

    if (error) {
      console.error("Error deleting site visits:", error);
      setError(`Unable to delete site visits: ${error.message}`);
      setDeleting(false);
      return;
    }

    setSelectedIds([]);

    // Reload from Supabase to confirm the database state
    await loadVisits();

    setDeleting(false);
  };

  const deleteVisit = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the site visit for "${name}"?`
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    const { error } = await adminSupabase
      .from("site_visits")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting site visit:", error);
      setError(`Unable to delete site visit: ${error.message}`);
      setDeleting(false);
      return;
    }

    setSelectedIds((current) =>
      current.filter((selectedId) => selectedId !== id)
    );

    // Reload from Supabase to confirm the database state
    await loadVisits();

    setDeleting(false);
  };

  if (loading) {
    return (
      <main className="adminLoadingPage">
        <div className="adminLoader"></div>
        <p>Loading Site Visits...</p>
      </main>
    );
  }

  const allSelected =
    visits.length > 0 &&
    selectedIds.length === visits.length;

  return (
    <main className="adminLayout">
      <AdminSidebar />

      <section className="adminMainContent">
        <header className="adminHeader">
          <div>
            <p className="adminWelcome">
              WEBSITE ANALYTICS
            </p>

            <h1>Site Visits</h1>

            <p>
              View visitor information and website visit
              records.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {selectedIds.length > 0 && (
              <button
                className="adminDeleteButton"
                onClick={deleteSelected}
                disabled={deleting}
              >
                {deleting
                  ? "Deleting..."
                  : `Delete Selected (${selectedIds.length})`}
              </button>
            )}

            <button
              className="adminPrimaryButton"
              onClick={loadVisits}
              disabled={deleting}
            >
              Refresh
            </button>
          </div>
        </header>

        <section className="adminPropertiesSection">
          {error ? (
            <div className="adminEmptyState">
              <div className="adminEmptyIcon">
                ⚠️
              </div>

              <h2>Unable to Load Site Visits</h2>

              <p>{error}</p>

              <button
                className="adminPrimaryButton"
                onClick={loadVisits}
              >
                Try Again
              </button>
            </div>
          ) : visits.length === 0 ? (
            <div className="adminEmptyState">
              <div className="adminEmptyIcon">
                📊
              </div>

              <h2>No Site Visits Found</h2>

              <p>
                Website visitor records will appear here.
              </p>
            </div>
          ) : (
            <div
              style={{
                overflowX: "auto",
                background: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "700px",
                }}
              >
                <thead>
                  <tr>
                    {/* Select All */}
                    <th
                      style={{
                        padding: "16px",
                        width: "50px",
                        textAlign: "center",
                        borderBottom:
                          "1px solid #e5e7eb",
                        background: "#f9fafb",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleSelectAll}
                        aria-label="Select all site visits"
                        style={{
                          width: "17px",
                          height: "17px",
                          cursor: "pointer",
                        }}
                      />
                    </th>

                    {/* Name */}
                    <th
                      style={{
                        padding: "16px",
                        textAlign: "left",
                        borderBottom:
                          "1px solid #e5e7eb",
                        background: "#f9fafb",
                        fontSize: "14px",
                      }}
                    >
                      Name
                    </th>

                    {/* Phone */}
                    <th
                      style={{
                        padding: "16px",
                        textAlign: "left",
                        borderBottom:
                          "1px solid #e5e7eb",
                        background: "#f9fafb",
                        fontSize: "14px",
                      }}
                    >
                      Phone
                    </th>

                    {/* Date */}
                    <th
                      style={{
                        padding: "16px",
                        textAlign: "left",
                        borderBottom:
                          "1px solid #e5e7eb",
                        background: "#f9fafb",
                        fontSize: "14px",
                      }}
                    >
                      Date
                    </th>

                    {/* Time */}
                    <th
                      style={{
                        padding: "16px",
                        textAlign: "left",
                        borderBottom:
                          "1px solid #e5e7eb",
                        background: "#f9fafb",
                        fontSize: "14px",
                      }}
                    >
                      Time
                    </th>

                    {/* Action */}
                    <th
                      style={{
                        padding: "16px",
                        textAlign: "center",
                        borderBottom:
                          "1px solid #e5e7eb",
                        background: "#f9fafb",
                        fontSize: "14px",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {visits.map((visit) => {
                    const isSelected =
                      selectedIds.includes(visit.id);

                    return (
                      <tr
                        key={visit.id}
                        style={{
                          background: isSelected
                            ? "#fffaf0"
                            : "#ffffff",
                        }}
                      >
                        {/* Checkbox */}
                        <td
                          style={{
                            padding: "16px",
                            textAlign: "center",
                            borderBottom:
                              "1px solid #f0f0f0",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() =>
                              toggleSelect(visit.id)
                            }
                            aria-label={`Select ${visit.name}`}
                            style={{
                              width: "17px",
                              height: "17px",
                              cursor: "pointer",
                            }}
                          />
                        </td>

                        {/* Name */}
                        <td
                          style={{
                            padding: "16px",
                            borderBottom:
                              "1px solid #f0f0f0",
                            fontSize: "14px",
                          }}
                        >
                          {visit.name || "-"}
                        </td>

                        {/* Phone */}
                        <td
                          style={{
                            padding: "16px",
                            borderBottom:
                              "1px solid #f0f0f0",
                            fontSize: "14px",
                          }}
                        >
                          {visit.phone || "-"}
                        </td>

                        {/* Date */}
                        <td
                          style={{
                            padding: "16px",
                            borderBottom:
                              "1px solid #f0f0f0",
                            fontSize: "14px",
                          }}
                        >
                          {visit.preferred_date || "-"}
                        </td>

                        {/* Time */}
                        <td
                          style={{
                            padding: "16px",
                            borderBottom:
                              "1px solid #f0f0f0",
                            fontSize: "14px",
                          }}
                        >
                          {visit.preferred_time || "-"}
                        </td>

                        {/* Individual Delete */}
                        <td
                          style={{
                            padding: "16px",
                            textAlign: "center",
                            borderBottom:
                              "1px solid #f0f0f0",
                          }}
                        >
                          <button
                            type="button"
                            className="adminRowDeleteButton"
                            onClick={() =>
                              deleteVisit(
                                visit.id,
                                visit.name
                              )
                            }
                            disabled={deleting}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}