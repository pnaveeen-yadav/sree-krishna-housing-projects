import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Received booking:", body);

    /* =========================
       VALIDATION
    ========================== */

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
       SUPABASE CONFIGURATION
    ========================== */

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error(
        "Missing Supabase environment variables"
      );

      return NextResponse.json(
        {
          error:
            "Supabase configuration is missing",
        },
        {
          status: 500,
        }
      );
    }

    /* =========================
       CREATE SUPABASE CLIENT
    ========================== */

    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    );

    /* =========================
       SAVE BOOKING
    ========================== */

    const { error: supabaseError } =
      await supabase
        .from("site_visits")
        .insert({
          name: body.name,
          phone: body.phone,
          preferred_date:
            body.preferredDate || null,
          preferred_time:
            body.preferredTime || null,
        });

    if (supabaseError) {
      console.error(
        "SUPABASE ERROR:",
        supabaseError
      );

      return NextResponse.json(
        {
          error:
            "Supabase error: " +
            supabaseError.message,

          details: supabaseError,
        },
        {
          status: 400,
        }
      );
    }

    console.log(
      "Supabase booking saved successfully"
    );

    /* =========================
       BOOKING TYPE
    ========================== */

    const bookingType =
      body.bookingType === "consultation"
        ? "Consultation"
        : "Site Visit";

    /* =========================
       RESEND EMAIL
    ========================== */

    try {
      const resendApiKey =
        process.env.RESEND_API_KEY;

      const receiverEmail =
        process.env.SITE_VISIT_RECEIVER_EMAIL;

      if (!resendApiKey || !receiverEmail) {
        console.error(
          "Missing Resend environment variables"
        );
      } else {

        const emailResponse =
          await fetch(
            "https://api.resend.com/emails",
            {
              method: "POST",

              headers: {
                Authorization:
                  `Bearer ${resendApiKey}`,

                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                from:
                  "Sree Krishna Housing Projects <onboarding@resend.dev>",

                to: [
                  receiverEmail,
                ],

                subject:
                  `🏠 New ${bookingType} Booking – ${body.name}`,

                html: `
<!DOCTYPE html>

<html>

<head>
  <meta charset="UTF-8">
</head>

<body style="
  margin:0;
  padding:0;
  background:#f5f5f5;
  font-family:Arial, Helvetica, sans-serif;
">

  <div style="
    max-width:600px;
    margin:30px auto;
    background:#ffffff;
    border-radius:12px;
    overflow:hidden;
    box-shadow:0 4px 15px rgba(0,0,0,0.08);
  ">


    <!-- HEADER -->

    <div style="
      background:#1f2937;
      padding:28px;
      text-align:center;
      color:#ffffff;
    ">

      <h1 style="
        margin:0;
        font-size:24px;
        font-weight:700;
      ">
        🏠 Sree Krishna Housing Projects
      </h1>

      <p style="
        margin:8px 0 0;
        color:#d1d5db;
        font-size:14px;
      ">
        Website Booking Notification
      </p>

    </div>


    <!-- TITLE -->

    <div style="
      text-align:center;
      padding:25px 20px 10px;
    ">

      <div style="
        font-size:42px;
      ">
        📅
      </div>

      <h2 style="
        margin:10px 0;
        color:#1f2937;
        font-size:22px;
      ">
        New ${bookingType} Request
      </h2>

      <p style="
        color:#6b7280;
        margin:0;
        font-size:15px;
      ">
        A customer has submitted a new booking request.
      </p>

    </div>


    <!-- CONTENT -->

    <div style="
      padding:20px 30px;
    ">


      <!-- CUSTOMER DETAILS -->

      <h3 style="
        color:#1f2937;
        border-bottom:1px solid #e5e7eb;
        padding-bottom:10px;
        margin-top:10px;
      ">
        👤 Customer Details
      </h3>


      <table style="
        width:100%;
        border-collapse:collapse;
        font-size:15px;
      ">


        <tr>

          <td style="
            padding:12px;
            background:#f9fafb;
            width:40%;
            color:#6b7280;
          ">
            Name
          </td>

          <td style="
            padding:12px;
            font-weight:bold;
            color:#111827;
          ">
            ${body.name}
          </td>

        </tr>


        <tr>

          <td style="
            padding:12px;
            background:#f9fafb;
            color:#6b7280;
          ">
            Phone
          </td>

          <td style="
            padding:12px;
            font-weight:bold;
            color:#111827;
          ">
            ${body.phone}
          </td>

        </tr>

      </table>



      <!-- BOOKING DETAILS -->

      <h3 style="
        color:#1f2937;
        border-bottom:1px solid #e5e7eb;
        padding-bottom:10px;
        margin-top:30px;
      ">
        📅 Booking Details
      </h3>


      <table style="
        width:100%;
        border-collapse:collapse;
        font-size:15px;
      ">


        <tr>

          <td style="
            padding:12px;
            background:#f9fafb;
            width:40%;
            color:#6b7280;
          ">
            Booking Type
          </td>

          <td style="
            padding:12px;
            font-weight:bold;
            color:#111827;
          ">
            ${bookingType}
          </td>

        </tr>


        <tr>

          <td style="
            padding:12px;
            background:#f9fafb;
            color:#6b7280;
          ">
            Preferred Date
          </td>

          <td style="
            padding:12px;
            font-weight:bold;
            color:#111827;
          ">
            ${
              body.preferredDate ||
              "Not specified"
            }
          </td>

        </tr>


        <tr>

          <td style="
            padding:12px;
            background:#f9fafb;
            color:#6b7280;
          ">
            Preferred Time
          </td>

          <td style="
            padding:12px;
            font-weight:bold;
            color:#111827;
          ">
            ${
              body.preferredTime ||
              "Not specified"
            }
          </td>

        </tr>

      </table>


      ${
        body.message
          ? `

      <!-- CUSTOMER MESSAGE -->

      <h3 style="
        color:#1f2937;
        border-bottom:1px solid #e5e7eb;
        padding-bottom:10px;
        margin-top:30px;
      ">
        💬 Customer Message
      </h3>


      <div style="
        background:#f9fafb;
        padding:15px;
        border-left:4px solid #d4af37;
        color:#374151;
        line-height:1.6;
        border-radius:4px;
      ">
        ${body.message}
      </div>

      `
          : ""
      }


    </div>


    <!-- ACTION SECTION -->

    <div style="
      padding:10px 30px 30px;
      text-align:center;
    ">

      <p style="
        color:#6b7280;
        font-size:14px;
        margin-bottom:18px;
      ">
        Please contact the customer to confirm
        the booking.
      </p>


      <a
        href="tel:${body.phone}"

        style="
          display:inline-block;
          padding:13px 25px;
          background:#d4af37;
          color:#ffffff;
          text-decoration:none;
          border-radius:6px;
          font-weight:bold;
          font-size:15px;
        "

      >
        📞 Contact Customer
      </a>

    </div>


    <!-- FOOTER -->

    <div style="
      background:#f3f4f6;
      padding:20px;
      text-align:center;
      color:#6b7280;
      font-size:12px;
      line-height:1.6;
    ">

      <strong style="
        color:#374151;
      ">
        Sree Krishna Housing Projects
      </strong>

      <br />

      This notification was generated from
      your website booking system.

    </div>


  </div>

</body>

</html>
                `,
              }),
            }
          );


        /* =========================
           RESEND RESPONSE
        ========================== */

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


        if (!emailResponse.ok) {

          console.error(
            "RESEND ERROR:",
            emailData
          );

        } else {

          console.log(
            "Booking email sent successfully"
          );

        }

      }

    } catch (emailError) {

      console.error(
        "RESEND FETCH ERROR:",
        emailError
      );

      /*
        Booking will NOT fail if email fails.
        The booking is already saved in Supabase.
      */

    }


    /* =========================
       SUCCESS RESPONSE
    ========================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Booking stored successfully",
      },

      {
        status: 200,
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
          "Server error",
      },

      {
        status: 500,
      }
    );

  }
}