import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        {
          error: "Name and phone are required"
        },
        {
          status: 400
        }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase
      .from("site_visits")
      .insert({
        name: body.name,
        phone: body.phone,
        preferred_date: body.preferredDate || null,
        preferred_time: body.preferredTime || null
      });

    if (error) {
      return NextResponse.json(
        {
          error: error.message
        },
        {
          status: 400
        }
      );
    }

    /* =========================================
       SEND EMAIL USING RESEND
    ========================================= */

    const emailResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          from: "Sree Krishna Housing Projects <onboarding@resend.dev>",

          to: [
            process.env.SITE_VISIT_RECEIVER_EMAIL
          ],

          subject: "New Site Visit Booking",

          html: `
            <h2>New Site Visit Booking</h2>

            <p>
              <strong>Name:</strong> ${body.name}
            </p>

            <p>
              <strong>Phone:</strong> ${body.phone}
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
          `
        })
      }
    );

    if (!emailResponse.ok) {
      const emailError = await emailResponse.text();

      console.error(
        "Resend email error:",
        emailError
      );
    }

    return NextResponse.json({
      success: true
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Invalid request"
      },
      {
        status: 400
      }
    );
  }
}