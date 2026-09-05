import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();

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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables");

      return NextResponse.json(
        {
          error: "Supabase environment variables are missing",
        },
        {
          status: 500,
        }
      );
    }

    console.log("Supabase URL:", supabaseUrl);

    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    );

    const { data, error } = await supabase
      .from("site_visits")
      .insert([
        {
          name: body.name,
          phone: body.phone,
          preferred_date: body.preferredDate || null,
          preferred_time: body.preferredTime || null,
        },
      ])
      .select();

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

    console.log("Booking stored successfully:", data);

    // Send email without failing the booking
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      const receiverEmail =
        process.env.SITE_VISIT_RECEIVER_EMAIL;

      if (resendApiKey && receiverEmail) {
        const emailResponse = await fetch(
          "https://api.resend.com/emails",
          {
            method: "POST",

            headers: {
              Authorization: `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              from:
                "Sree Krishna Housing Projects <onboarding@resend.dev>",

              to: [receiverEmail],

              subject: "New Site Visit Booking",

              html: `
                <h2>New Site Visit Booking</h2>

                <p><strong>Name:</strong> ${body.name}</p>

                <p><strong>Phone:</strong> ${body.phone}</p>

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

        const emailData =
          await emailResponse.text();

        console.log(
          "Resend status:",
          emailResponse.status
        );

        console.log(
          "Resend response:",
          emailData
        );
      }
    } catch (emailError) {
      console.error(
        "Email error:",
        emailError
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Booking stored successfully",
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      {
        error: "Server error",
        details: error?.message || "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}