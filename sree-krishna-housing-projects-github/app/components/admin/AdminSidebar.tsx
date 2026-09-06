"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { adminSupabase } from "../../lib/adminSupabase";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await adminSupabase.auth.signOut();

    router.push("/admin/login");
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className="adminSidebar">

      <div className="adminSidebarBrand">

        <div className="adminSidebarLogo">
          SK
        </div>

        <div>
          <h2>Sree Krishna</h2>
          <span>ADMIN PANEL</span>
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
          <span>▦</span>
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
          <span>⌂</span>
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
          <span>✉</span>
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
          <span>◫</span>
          Site Visits
        </Link>

        <Link
          href="/admin/content"
          className={
            pathname.startsWith("/admin/content")
              ? "adminNavItem active"
              : "adminNavItem"
          }
        >
          <span>✎</span>
          Website Content
        </Link>

      </nav>

      <div className="adminSidebarBottom">

        <Link
          href="/"
          className="adminViewWebsite"
        >
          ↗ View Website
        </Link>

        <button
          type="button"
          className="adminLogoutButton"
          onClick={handleLogout}
        >
          ↪ Logout
        </button>

      </div>

    </aside>
  );
}