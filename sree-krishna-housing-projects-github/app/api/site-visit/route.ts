import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Received booking:", body);

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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables");

      return NextResponse.json(
        {
          error: "Supabase environment variables are missing"
        },
        {
          status: 500
        }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseKey
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
      console.error("Supabase error:", error);

      return NextResponse.json(
        {
          error: error.message
        },
        {
          status: 400
        }
      );
    }

    console.log("Booking saved successfully:", data);

    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error"
      },
      {
        status: 500
      }
    );
  }
}