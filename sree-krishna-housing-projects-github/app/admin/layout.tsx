"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import "@/styles/admin.css";
import { adminSupabase } from "@/lib/adminSupabase";

const IDLE_TIMEOUT = 5 * 60 * 1000; // 2 minutes

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  /*
   * CHECK ADMIN LOGIN
   */
  useEffect(() => {
    const checkAdminAccess = async () => {
      // Login page does not require authentication
      if (pathname === "/admin/login") {
        setChecking(false);
        return;
      }

      setChecking(true);

      const {
        data: { user },
      } = await adminSupabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      // Make sure the logged-in user is an admin
      const { data: adminUser, error } = await adminSupabase
        .from("admin_users")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (error || !adminUser) {
        await adminSupabase.auth.signOut();
        router.replace("/admin/login");
        return;
      }

      setChecking(false);
    };

    checkAdminAccess();
  }, [pathname, router]);

  /*
   * AUTOMATIC LOGOUT AFTER 2 MINUTES OF INACTIVITY
   */
  useEffect(() => {
    // Don't start idle timer on login page
    if (pathname === "/admin/login") {
      return;
    }

    let idleTimer: ReturnType<typeof setTimeout>;

    const logoutAfterIdle = async () => {
      console.log(
        "Admin logged out automatically due to inactivity."
      );

      await adminSupabase.auth.signOut();

      router.replace("/admin/login");
    };

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);

      idleTimer = setTimeout(() => {
        logoutAfterIdle();
      }, IDLE_TIMEOUT);
    };

    /*
     * Any of these activities will reset
     * the 2-minute inactivity timer.
     */
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetIdleTimer);
    });

    // Start timer
    resetIdleTimer();

    // Cleanup
    return () => {
      clearTimeout(idleTimer);

      events.forEach((event) => {
        window.removeEventListener(event, resetIdleTimer);
      });
    };
  }, [pathname, router]);

  /*
   * LOGIN PAGE
   */
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  /*
   * WHILE CHECKING AUTHENTICATION
   */
  if (checking) {
    return (
      <main className="adminLoadingPage">
        <div className="adminLoader"></div>

        <p>
          Checking admin access...
        </p>
      </main>
    );
  }

  return <>{children}</>;
}