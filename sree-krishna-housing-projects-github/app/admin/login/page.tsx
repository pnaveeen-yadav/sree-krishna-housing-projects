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
      <div className="adminLoginCard">

        <div className="adminLoginLogo">
          <div className="adminLogoIcon">
            SK
          </div>

          <div>
            <h1>Sree Krishna Housing Projects</h1>
            <p>Administration Portal</p>
          </div>
        </div>

        <div className="adminLoginHeading">
          <h2>Admin Login</h2>

          <p>
            Sign in to manage your website,
            properties and customer enquiries.
          </p>
        </div>

        <form
          className="adminLoginForm"
          onSubmit={handleLogin}
        >

          <div className="adminFormGroup">

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
              required
            />

          </div>

          <div className="adminFormGroup">

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
              required
            />

          </div>

          {error && (
            <div className="adminLoginError">
              {error}
            </div>
          )}

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

        <p className="adminLoginFooter">
          Secure administration access
        </p>

      </div>
    </main>
  );
}