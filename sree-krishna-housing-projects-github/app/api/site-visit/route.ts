import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    /* =========================
       GET REQUEST DATA
    ========================= */

    const body = await request.json();

    console.log("Received booking:", body);

    const {
      name,
      phone,
      preferredDate,
      preferredTime
    } = body;

    /* =========================
       VALIDATION
    ========================= */

    if (!name || !phone) {
      return NextResponse.json(
        {
          error: "Name and phone are required"
        },
        {
          status: 400
        }
      );
    }

    /* =========================
       ENVIRONMENT VARIABLES
    ========================= */

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();

    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

    if (!supabaseUrl) {
      console.error(
        "NEXT_PUBLIC_SUPABASE_URL is missing"
      );

      return NextResponse.json(
        {
          error: "Supabase URL is missing"
        },
        {
          status: 500
        }
      );
    }

    if (!supabaseKey) {
      console.error(
        "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing"
      );

      return NextResponse.json(
        {
          error: "Supabase anonymous key is missing"
        },
        {
          status: 500
        }
      );
    }

    console.log(
      "Supabase URL:",
      supabaseUrl
    );

    console.log(
      "Supabase key exists:",
      Boolean(supabaseKey)
    );

    /* =========================
       CREATE SUPABASE CLIENT
    ========================= */

    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    );

    /* =========================
       STORE BOOKING
    ========================= */

    let bookingData;

    try {
      const { data, error } = await supabase
        .from("site_visits")
        .insert({
          name: name.trim(),
          phone: phone.trim(),
          preferred_date:
            preferredDate || null,
          preferred_time:
            preferredTime || null
        })
        .select();

      if (error) {
        console.error(
          "SUPABASE DATABASE ERROR:",
          error
        );

        return NextResponse.json(
          {
            error: "Supabase database error",
            details: error.message
          },
          {
            status: 400
          }
        );
      }

      bookingData = data;

      console.log(
        "SUPABASE SUCCESS:",
        bookingData
      );

    } catch (supabaseError: any) {

      console.error(
        "SUPABASE FETCH ERROR:",
        supabaseError
      );

      console.error(
        "SUPABASE ERROR MESSAGE:",
        supabaseError?.message
      );

      console.error(
        "SUPABASE ERROR CAUSE:",
        supabaseError?.cause
      );

      return NextResponse.json(
        {
          error:
            "Supabase connection failed",

          details:
            supabaseError?.message ||
            "Unknown error",

          cause:
            supabaseError?.cause?.message ||
            "No additional details"
        },
        {
          status: 500
        }
      );
    }

    /* =========================
       SEND EMAIL USING RESEND
    ========================= */

    try {

      const resendApiKey =
        process.env.RESEND_API_KEY;

      const receiverEmail =
        process.env.SITE_VISIT_RECEIVER_EMAIL;

      if (!resendApiKey) {
        console.error(
          "RESEND_API_KEY is missing"
        );
      }

      if (!receiverEmail) {
        console.error(
          "SITE_VISIT_RECEIVER_EMAIL is missing"
        );
      }

      if (resendApiKey && receiverEmail) {

        const emailResponse = await fetch(
          "https://api.resend.com/emails",
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${resendApiKey}`,

              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              from:
                "Sree Krishna Housing Projects <onboarding@resend.dev>",

              to: [
                receiverEmail
              ],

              subject:
                "New Site Visit Booking",

              html: `
                <h2>New Site Visit Booking</h2>

                <p>
                  <strong>Name:</strong>
                  ${name}
                </p>

                <p>
                  <strong>Phone:</strong>
                  ${phone}
                </p>

                <p>
                  <strong>Preferred Date:</strong>
                  ${preferredDate || "Not specified"}
                </p>

                <p>
                  <strong>Preferred Time:</strong>
                  ${preferredTime || "Not specified"}
                </p>

                <br />

                <p>
                  Sree Krishna Housing Projects Website
                </p>
              `
            })
          }
        );

        const emailData =
          await emailResponse.text();

        console.log(
          "RESEND STATUS:",
          emailResponse.status
        );

        console.log(
          "RESEND RESPONSE:",
          emailData
        );

      }

    } catch (emailError: any) {

      console.error(
        "RESEND ERROR:",
        emailError
      );

      // Booking is already saved.
      // Do not fail the booking if email fails.

    }

    /* =========================
       SUCCESS RESPONSE
    ========================= */

    return NextResponse.json(
      {
        success: true,

        message:
          "Booking stored successfully",

        data: bookingData
      },
      {
        status: 200
      }
    );

  } catch (error: any) {

    console.error(
      "SERVER ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Internal server error"
      },
      {
        status: 500
      }
    );
  }
}