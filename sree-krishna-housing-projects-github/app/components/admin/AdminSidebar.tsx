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
    if (path === "/admin/dashboard") {
      return pathname === "/admin/dashboard";
    }

    return pathname.startsWith(path);
  };

  return (
    <aside className="adminSidebar">
      <div className="adminBrand">
        <img
          src="/logo.webp"
          alt="Sree Krishna Housing Projects"
          className="adminLogo"

        />
        <p>Admin Panel</p>
      </div>

      <nav className="adminNav">
        <Link
          href="/admin/dashboard"
          className={
            isActive("/admin/dashboard")
              ? "adminNavLink active"
              : "adminNavLink"
          }
        >
          <span className="adminNavIcon">⌂</span>
          <span>Dashboard</span>
        </Link>

        <Link
          href="/admin/properties"
          className={
            isActive("/admin/properties")
              ? "adminNavLink active"
              : "adminNavLink"
          }
        >
          <span className="adminNavIcon">🏠</span>
          <span>Properties</span>
        </Link>

        <Link
          href="/admin/enquiries"
          className={
            isActive("/admin/enquiries")
              ? "adminNavLink active"
              : "adminNavLink"
          }
        >
          <span className="adminNavIcon">✉</span>
          <span>Enquiries</span>
        </Link>

        <Link
          href="/admin/site-visits"
          className={
            isActive("/admin/site-visits")
              ? "adminNavLink active"
              : "adminNavLink"
          }
        >
          <span className="adminNavIcon">▣</span>
          <span>Site Visits</span>
        </Link>
      </nav>

      <div className="adminSidebarBottom">
        <Link
          href="/"
          className="adminViewWebsite"
        >
          <span>↗</span>
          <span>View Website</span>
        </Link>

        <button
          type="button"
          className="adminLogoutButton"
          onClick={handleLogout}
        >
          <span>↪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}