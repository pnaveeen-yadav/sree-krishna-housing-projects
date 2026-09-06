"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminSupabase } from "@/lib/adminSupabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data, error: loginError } =
        await adminSupabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        throw loginError;
      }

      if (!data.user) {
        throw new Error("Unable to sign in.");
      }

      const { data: adminUser, error: adminError } =
        await adminSupabase
          .from("admin_users")
          .select("id")
          .eq("id", data.user.id)
          .single();

      if (adminError || !adminUser) {
        await adminSupabase.auth.signOut();

        throw new Error(
          "You do not have permission to access the admin panel."
        );
      }

      router.push("/admin/dashboard");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Login failed. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="adminLoginPage">

      <div className="adminLoginBackground" />

      <div className="adminLoginCard">

        {/* BRAND SECTION */}

        <div className="adminLoginBrand">

          <img
            src="/logo.webp"
            alt="Sree Krishna Housing Projects"
            className="adminLoginLogo"
          />

          <div className="adminLoginBrandDivider" />

          <p>
            Administration Portal
          </p>

        </div>


        {/* LOGIN CONTENT */}

        <div className="adminLoginContent">

          <div className="adminLoginHeading">

            <p className="adminLoginEyebrow">
              SECURE ADMIN ACCESS
            </p>

            <h1>
              Admin Login
            </h1>

            <p>
              Sign in to manage your website,
              properties and customer enquiries.
            </p>

          </div>


          {/* LOGIN FORM */}

          <form
            className="adminLoginForm"
            onSubmit={handleLogin}
          >

            {/* EMAIL */}

            <div className="adminLoginFormGroup">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={loading}
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="adminLoginFormGroup">

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                disabled={loading}
                required
              />

            </div>


            {/* ERROR */}

            {error && (

              <div
                className="adminLoginError"
                role="alert"
              >
                {error}
              </div>

            )}


            {/* BUTTON */}

            <button
              type="submit"
              className="adminLoginButton"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>

          </form>


          {/* FOOTER */}

          <div className="adminLoginFooter">

            <span>🔒</span>

            <p>
              Secure administration access
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}