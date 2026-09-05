import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    // Get request body
    const body = await request.json();

    console.log("Received booking:", body);

    // Validate required fields
    if (!body.name || !body.phone) {
      return NextResponse.json(
        {
          error: "Name and phone are required",
        },
        {
          status: 400,
        }
      );
    }

    /* =========================
       SUPABASE
    ========================= */

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Check environment variables
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase environment variables are missing");

      return NextResponse.json(
        {
          error: "Supabase configuration is missing",
        },
        {
          status: 500,
        }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseAnonKey
    );

    // Insert booking into Supabase
    const { error } = await supabase
      .from("site_visits")
      .insert({
        name: body.name,
        phone: body.phone,
        preferred_date: body.preferredDate || null,
        preferred_time: body.preferredTime || null,
      });

    // Check Supabase error
    if (error) {
      console.error("SUPABASE ERROR:", error);

      return NextResponse.json(
        {
          error: "Supabase database error",
          details: error.message,
        },
        {
          status: 400,
        }
      );
    }

    console.log("Booking stored successfully");

    /* =========================
       RESEND EMAIL
    ========================= */

    try {
      // Check email configuration
      if (
        !process.env.RESEND_API_KEY ||
        !process.env.SITE_VISIT_RECEIVER_EMAIL
      ) {
        console.error(
          "Resend environment variables are missing"
        );
      } else {
        const emailResponse = await fetch(
          "https://api.resend.com/emails",
          {
            method: "POST",

            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              from:
                "Sree Krishna Housing Projects <onboarding@resend.dev>",

              to: [
                process.env.SITE_VISIT_RECEIVER_EMAIL,
              ],

              subject: "New Site Visit Booking",

              html: `
                <h2>New Site Visit Booking</h2>

                <p>
                  <strong>Name:</strong>
                  ${body.name}
                </p>

                <p>
                  <strong>Phone:</strong>
                  ${body.phone}
                </p>

                <p>
                  <strong>Preferred Date:</strong>
                  ${body.preferredDate || "Not specified"}
                </p>

                <p>
                  <strong>Preferred Time:</strong>
                  ${body.preferredTime || "Not specified"}
                </p>

                <br />

                <p>
                  Sree Krishna Housing Projects Website
                </p>
              `,
            }),
          }
        );

        const emailData = await emailResponse.text();

        console.log(
          "Resend status:",
          emailResponse.status
        );

        console.log(
          "Resend response:",
          emailData
        );

        // Log error but don't fail booking
        if (!emailResponse.ok) {
          console.error(
            "Resend email failed:",
            emailData
          );
        }
      }
    } catch (emailError) {
      console.error(
        "RESEND FETCH ERROR:",
        emailError
      );

      // Booking is already stored successfully
      // Don't fail the booking because email failed
    }

    /* =========================
       SUCCESS RESPONSE
    ========================= */

    return NextResponse.json(
      {
        success: true,
        message: "Booking stored successfully",
      },
      {
        status: 200,
      }
    );

  } catch (error: any) {
    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}