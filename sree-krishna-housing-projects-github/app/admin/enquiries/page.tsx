"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import { adminSupabase } from "@/lib/adminSupabase";

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  property_id: string | null;
  created_at: string | null;
}

export default function AdminEnquiriesPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    checkAdminAndLoadEnquiries();
  }, []);

  const checkAdminAndLoadEnquiries = async () => {
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

    await loadEnquiries();
  };

  const loadEnquiries = async () => {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await adminSupabase
      .from("enquiries")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Error loading enquiries:", error);

      setErrorMessage(
        "Unable to load enquiries. Please try again."
      );

      setLoading(false);
      return;
    }

    setEnquiries(data || []);
    setLoading(false);
  };

  const formatDate = (date: string | null) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <main className="adminLoadingPage">
        <div className="adminLoader"></div>

        <p>Loading Enquiries...</p>
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
              CUSTOMER MANAGEMENT
            </p>

            <h1>Enquiries</h1>

            <p>
              View customer enquiries submitted through
              your website.
            </p>
          </div>

          <button
            className="adminPrimaryButton"
            onClick={loadEnquiries}
          >
            Refresh
          </button>
        </header>

        <section className="adminPropertiesSection">

          {errorMessage ? (

            <div className="adminEmptyState">
              <div className="adminEmptyIcon">
                ⚠️
              </div>

              <h2>Unable to Load Enquiries</h2>

              <p>
                {errorMessage}
              </p>

              <button
                className="adminPrimaryButton"
                onClick={loadEnquiries}
              >
                Try Again
              </button>
            </div>

          ) : enquiries.length === 0 ? (

            <div className="adminEmptyState">
              <div className="adminEmptyIcon">
                ✉️
              </div>

              <h2>No Enquiries Yet</h2>

              <p>
                Customer enquiries submitted through your
                website will appear here.
              </p>
            </div>

          ) : (

            <div className="adminTableWrapper">

              <table className="adminDataTable">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Property ID</th>
                    <th>Received</th>
                  </tr>
                </thead>

                <tbody>

                  {enquiries.map((enquiry) => (

                    <tr key={enquiry.id}>

                      <td>
                        {enquiry.name}
                      </td>

                      <td>
                        {enquiry.phone}
                      </td>

                      <td>
                        {enquiry.email ||
                          "Not provided"}
                      </td>

                      <td>
                        {enquiry.message ||
                          "No message"}
                      </td>

                      <td>
                        {enquiry.property_id ||
                          "General enquiry"}
                      </td>

                      <td>
                        {formatDate(
                          enquiry.created_at
                        )}
                      </td>

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