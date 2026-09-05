import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Received booking:", body);

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    /* =========================
       SUPABASE
    ========================= */

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
      .from("site_visits")
      .insert({
        name: body.name,
        phone: body.phone,
        preferred_date: body.preferredDate || null,
        preferred_time: body.preferredTime || null
      })
      .select();

    if (error) {
      console.error("SUPABASE ERROR:", error);

      return NextResponse.json(
        {
          error: "Supabase error: " + error.message
        },
        { status: 400 }
      );
    }

    console.log("Supabase success:", data);

    /* =========================
       RESEND EMAIL
    ========================= */

    try {
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

              <br/>

              <p>Sree Krishna Housing Projects Website</p>
            `
          })
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

    } catch (emailError) {

      console.error(
        "RESEND FETCH ERROR:",
        emailError
      );

      // Don't fail booking if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Booking stored successfully"
    });

  } catch (error: any) {

    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      {
        error: error?.message || "Server error"
      },
      {
        status: 500
      }
    );
  }
}