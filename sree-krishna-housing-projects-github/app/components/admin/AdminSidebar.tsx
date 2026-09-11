"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { adminSupabase } from "@/lib/adminSupabase";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await adminSupabase.auth.signOut();

    router.push("/admin/login");
    router.refresh();
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/admin/dashboard") {
      return pathname === "/admin/dashboard";
    }

    return pathname.startsWith(path);
  };

  return (
    <>
      <button
        type="button"
        className="adminMobileMenuButton"
        onClick={() => setMobileOpen(true)}
        aria-label="Open admin menu"
        aria-expanded={mobileOpen}
      >
        ☰
      </button>

      {mobileOpen && (
        <button
          type="button"
          className="adminSidebarOverlay"
          onClick={closeMobileMenu}
          aria-label="Close admin menu"
        />
      )}

      <aside
        className={`adminSidebar ${
          mobileOpen ? "adminSidebarMobileOpen" : ""
        }`}
      >
        <div className="adminBrand">
          <button
            type="button"
            className="adminMobileCloseButton"
            onClick={closeMobileMenu}
            aria-label="Close admin menu"
          >
            ✕
          </button>

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
            onClick={closeMobileMenu}
          >
            <span className="adminNavIcon">⌂</span>
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/home"
            className={
              isActive("/admin/home")
                ? "adminNavLink active"
                : "adminNavLink"
            }
            onClick={closeMobileMenu}
          >
            <span className="adminNavIcon">🏠</span>
            <span>Home</span>
          </Link>

          <Link
            href="/admin/properties"
            className={
              isActive("/admin/properties")
                ? "adminNavLink active"
                : "adminNavLink"
            }
            onClick={closeMobileMenu}
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
            onClick={closeMobileMenu}
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
            onClick={closeMobileMenu}
          >
            <span className="adminNavIcon">▣</span>
            <span>Site Visits</span>
          </Link>
        </nav>

        <div className="adminSidebarBottom">
          <Link
            href="/"
            className="adminViewWebsite"
            onClick={closeMobileMenu}
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
    </>
  );
}
