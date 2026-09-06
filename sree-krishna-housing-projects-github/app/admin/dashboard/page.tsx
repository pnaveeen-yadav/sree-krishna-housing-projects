"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";

import { adminSupabase } from "@/lib/adminSupabase";

export default function AdminDashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const checkAdminAccess = async () => {
      const {
        data: {
          user,
        },
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

      setUserEmail(user.email || "");

      setLoading(false);
    };

    checkAdminAccess();
  }, [router]);

  if (loading) {
    return (
      <main className="adminLoadingPage">
        <div className="adminLoader"></div>

        <p>
          Loading Admin Dashboard...
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
              Welcome back
            </p>

            <h1>
              Dashboard
            </h1>

          </div>

          <div className="adminUserInfo">

            <div className="adminUserAvatar">
              {userEmail.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>Administrator</strong>

              <span>
                {userEmail}
              </span>
            </div>

          </div>

        </header>


        <section className="adminWelcomeBanner">

          <div>

            <span>
              SREE KRISHNA HOUSING PROJECTS
            </span>

            <h2>
              Manage your website from one place
            </h2>

            <p>
              Update properties, images, customer
              enquiries and site visit bookings without
              modifying your website code.
            </p>

          </div>

        </section>


        <section className="adminStatsGrid">

          <div className="adminStatCard">

            <div className="adminStatIcon">
              🏠
            </div>

            <div>

              <span>
                Properties
              </span>

              <strong>
                Manage
              </strong>

            </div>

          </div>


          <div className="adminStatCard">

            <div className="adminStatIcon">
              ✉
            </div>

            <div>

              <span>
                Customer Enquiries
              </span>

              <strong>
                View
              </strong>

            </div>

          </div>


          <div className="adminStatCard">

            <div className="adminStatIcon">
              📅
            </div>

            <div>

              <span>
                Site Visits
              </span>

              <strong>
                Manage
              </strong>

            </div>

          </div>


          <div className="adminStatCard">

            <div className="adminStatIcon">
              ✎
            </div>

            <div>

              <span>
                Website Content
              </span>

              <strong>
                Update
              </strong>

            </div>

          </div>

        </section>


        <section className="adminQuickActions">

          <div className="adminSectionHeading">

            <div>

              <h2>
                Quick Actions
              </h2>

              <p>
                Choose what you would like to manage.
              </p>

            </div>

          </div>


          <div className="adminActionsGrid">

            <div className="adminActionCard">

              <div className="adminActionIcon">
                🏠
              </div>

              <h3>
                Manage Properties
              </h3>

              <p>
                Add, edit or remove property
                information and details.
              </p>

              <button
                onClick={() =>
                  router.push("/admin/properties")
                }
              >
                Manage Properties →
              </button>

            </div>


            <div className="adminActionCard">

              <div className="adminActionIcon">
                🖼
              </div>

              <h3>
                Manage Images
              </h3>

              <p>
                Upload and manage property
                images and galleries.
              </p>

              <button
                onClick={() =>
                  router.push("/admin/properties")
                }
              >
                Manage Images →
              </button>

            </div>


            <div className="adminActionCard">

              <div className="adminActionIcon">
                ✉
              </div>

              <h3>
                View Enquiries
              </h3>

              <p>
                View customers interested
                in your properties.
              </p>

              <button
                onClick={() =>
                  router.push("/admin/enquiries")
                }
              >
                View Enquiries →
              </button>

            </div>


            <div className="adminActionCard">

              <div className="adminActionIcon">
                📅
              </div>

              <h3>
                Site Visits
              </h3>

              <p>
                Manage customer site
                visit bookings.
              </p>

              <button
                onClick={() =>
                  router.push("/admin/site-visits")
                }
              >
                View Bookings →
              </button>

            </div>

          </div>

        </section>

      </section>

    </main>
  );
}