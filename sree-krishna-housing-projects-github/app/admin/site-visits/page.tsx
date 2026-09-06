"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import { adminSupabase } from "@/lib/adminSupabase";

type SiteVisit = Record<string, unknown>;

export default function AdminSiteVisitsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState<SiteVisit[]>([]);
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
      .select("*");

    if (error) {
      console.error("Error loading site visits:", error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setVisits(data || []);
    setLoading(false);
  };

  const formatValue = (value: unknown) => {
    if (value === null || value === undefined) {
      return "-";
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return String(value);
  };

  if (loading) {
    return (
      <main className="adminLoadingPage">
        <div className="adminLoader"></div>

        <p>Loading Site Visits...</p>
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
              WEBSITE ANALYTICS
            </p>

            <h1>Site Visits</h1>

            <p>
              View visitor information and website visit
              records.
            </p>
          </div>

          <button
            className="adminPrimaryButton"
            onClick={loadVisits}
          >
            Refresh
          </button>
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
                    {Object.keys(visits[0]).map((key) => (
                      <th
                        key={key}
                        style={{
                          padding: "16px",
                          textAlign: "left",
                          borderBottom:
                            "1px solid #e5e7eb",
                          textTransform: "capitalize",
                          background: "#f9fafb",
                          fontSize: "14px",
                        }}
                      >
                        {key.replace(/_/g, " ")}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {visits.map((visit, index) => (
                    <tr key={String(visit.id || index)}>
                      {Object.keys(visits[0]).map((key) => (
                        <td
                          key={key}
                          style={{
                            padding: "16px",
                            borderBottom:
                              "1px solid #f0f0f0",
                            fontSize: "14px",
                            verticalAlign: "top",
                          }}
                        >
                          {formatValue(visit[key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}