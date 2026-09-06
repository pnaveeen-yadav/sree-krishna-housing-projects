"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { adminSupabase } from "@/lib/adminSupabase";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await adminSupabase.auth.signOut();

    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className="adminSidebar">
      <div className="adminSidebarTop">
        <div className="adminBrand">
          <div className="adminBrandIcon">
            SK
          </div>

          <div>
            <h2>Sree Krishna</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="adminNavigation">
          <Link
            href="/admin/dashboard"
            className={
              isActive("/admin/dashboard")
                ? "adminNavItem active"
                : "adminNavItem"
            }
          >
            <span className="adminNavIcon">⌂</span>
            Dashboard
          </Link>

          <Link
            href="/admin/properties"
            className={
              pathname.startsWith("/admin/properties")
                ? "adminNavItem active"
                : "adminNavItem"
            }
          >
            <span className="adminNavIcon">🏠</span>
            Properties
          </Link>

          <Link
            href="/admin/enquiries"
            className={
              pathname.startsWith("/admin/enquiries")
                ? "adminNavItem active"
                : "adminNavItem"
            }
          >
            <span className="adminNavIcon">✉</span>
            Enquiries
          </Link>

          <Link
            href="/admin/site-visits"
            className={
              pathname.startsWith("/admin/site-visits")
                ? "adminNavItem active"
                : "adminNavItem"
            }
          >
            <span className="adminNavIcon">📅</span>
            Site Visits
          </Link>
        </nav>
      </div>

      <div className="adminSidebarBottom">
        <Link
          href="/"
          className="adminNavItem"
        >
          <span className="adminNavIcon">↗</span>
          View Website
        </Link>

        <button
          type="button"
          className="adminLogoutButton"
          onClick={handleLogout}
        >
          <span className="adminNavIcon">↪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}