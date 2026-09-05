import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    /* =========================================
       SAVE BOOKING IN SUPABASE
    ========================================= */

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error: supabaseError } = await supabase
      .from("site_visits")
      .insert({
        name: body.name,
        phone: body.phone,
        preferred_date: body.preferredDate || null,
        preferred_time: body.preferredTime || null
      });

    if (supabaseError) {
      console.error("Supabase error:", supabaseError);

      return NextResponse.json(
        {
          error: supabaseError.message
        },
        {
          status: 400
        }
      );
    }

    /* =========================================
       SEND EMAIL USING RESEND
    ========================================= */

    let emailSent = false;

    try {
      const receiverEmail =
        process.env.SITE_VISIT_RECEIVER_EMAIL;

      if (!receiverEmail) {
        throw new Error(
          "SITE_VISIT_RECEIVER_EMAIL is missing"
        );
      }

      const { error: resendError } =
        await resend.emails.send({
          from:
            "Sree Krishna Housing Projects <onboarding@resend.dev>",

          to: [receiverEmail],

          subject:
            "New Site Visit Booking",

          html: `
            <h2>New Site Visit Booking</h2>

            <hr />

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

            <p>
              <strong>Message:</strong>
              ${body.message || "No message provided"}
            </p>

            <br />

            <hr />

            <p>
              <strong>
                Sree Krishna Housing Projects
              </strong>
            </p>

            <p>
              New booking received from your website.
            </p>
          `
        });

      if (resendError) {
        console.error(
          "Resend error:",
          resendError
        );
      } else {
        emailSent = true;
      }

    } catch (emailError) {
      console.error(
        "Email sending failed:",
        emailError
      );
    }

    /* =========================================
       SUCCESS RESPONSE
    ========================================= */

    return NextResponse.json({
      success: true,
      emailSent
    });

  } catch (error) {

    console.error(
      "Site visit API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Invalid request"
      },
      {
        status: 400
      }
    );
  }
}