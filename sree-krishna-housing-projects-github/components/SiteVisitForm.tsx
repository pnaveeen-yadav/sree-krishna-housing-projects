"use client";

import { useState } from "react";

type BookingType = "siteVisit" | "consultation" | "";

export default function SiteVisitForm() {
  const [step, setStep] = useState(1);

  const [bookingType, setBookingType] =
    useState<BookingType>("");

  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedTime, setSelectedTime] =
    useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  function getToday() {
    const date = new Date();
    return date.toISOString().split("T")[0];
  }

  function getTomorrow() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  }

  function formatDate(dateString: string) {
    if (!dateString) return "";

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function selectBookingType(type: BookingType) {
    setBookingType(type);
    setStep(2);
  }

  function selectToday() {
    setSelectedDate(getToday());
  }

  function selectTomorrow() {
    setSelectedDate(getTomorrow());
  }

  function continueToDetails() {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    if (!selectedTime) {
      alert("Please select a time slot.");
      return;
    }

    setStep(3);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.name.trim()) {
      setStatus("Please enter your name.");
      return;
    }

    if (!form.phone.trim()) {
      setStatus("Please enter your phone number.");
      return;
    }

    setStatus("Submitting your booking...");

    const bookingData = {
      name: form.name,
      phone: form.phone,
      message: form.message,

      preferredDate: selectedDate,
      preferredTime: selectedTime,

      visitType: bookingType,
    };

    try {
      const res = await fetch("/api/site-visit", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        setStatus(
          "Thank you! Your booking request has been submitted successfully."
        );

        setForm({
          name: "",
          phone: "",
          message: "",
        });

        setSelectedDate("");
        setSelectedTime("");
        setBookingType("");

        setTimeout(() => {
          setStep(1);
          setStatus("");
        }, 4000);
      } else {
        setStatus(
          "Unable to submit your booking. Please try again."
        );
      }
    } catch (error) {
      setStatus(
        "Something went wrong. Please try again."
      );
    }
  }

  return (
    <div className="siteVisitWrapper">

      {/* =========================
          STEP 1
          SELECT SERVICE
      ========================= */}

      {step === 1 && (
        <div className="bookingContainer">

          <div className="bookingCard">

            <div className="bookingHeader">

              <p className="eyebrow dark">
                BOOK AN APPOINTMENT
              </p>

              <h2>
                What would you like to schedule?
              </h2>

              <p>
                Choose how you would like to connect
                with our team.
              </p>

            </div>


            <div className="bookingOptions">

              {/* SITE VISIT */}

              <button
                type="button"
                className="bookingOption"
                onClick={() =>
                  selectBookingType("siteVisit")
                }
              >

                <div className="bookingIcon">
                  📍
                </div>

                <h3>Site Visit</h3>

                <p>
                  Visit the property and explore the
                  location with our team.
                </p>

              </button>


              {/* CONSULTATION */}

              <button
                type="button"
                className="bookingOption"
                onClick={() =>
                  selectBookingType("consultation")
                }
              >

                <div className="bookingIcon">
                  💬
                </div>

                <h3>Consultation</h3>

                <p>
                  Talk with our experts about properties,
                  investment or construction.
                </p>

              </button>

            </div>

          </div>

        </div>
      )}


      {/* =========================
          STEP 2
          DATE & TIME
      ========================= */}

      {step === 2 && (
        <div className="bookingContainer">

          <div className="bookingCard">

            <div className="bookingHeader">

              <p className="eyebrow dark">
                {bookingType === "siteVisit"
                  ? "SITE VISIT"
                  : "CONSULTATION"}
              </p>

              <h2>
                Select Date & Time
              </h2>

              <p>
                Choose your preferred date and time.
              </p>

            </div>


            {/* DATE */}

            <div className="bookingField">

              <label>
                Select Date
              </label>


              <div className="dateOptions">

                {/* TODAY */}

                <button
                  type="button"
                  className={
                    selectedDate === getToday()
                      ? "dateOption active"
                      : "dateOption"
                  }
                  onClick={selectToday}
                >

                  <span>Today</span>

                  <small>
                    {new Date().toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                      }
                    )}
                  </small>

                </button>


                {/* TOMORROW */}

                <button
                  type="button"
                  className={
                    selectedDate === getTomorrow()
                      ? "dateOption active"
                      : "dateOption"
                  }
                  onClick={selectTomorrow}
                >

                  <span>Tomorrow</span>

                  <small>
                    {new Date(
                      Date.now() + 86400000
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                      }
                    )}
                  </small>

                </button>


                {/* CALENDAR */}

                <label className="dateOption calendarOption">

                  <span>📅 Calendar</span>

                  <small>
                    Select a date
                  </small>

                  <input
                    type="date"
                    min={getToday()}
                    value={selectedDate}
                    onChange={(e) =>
                      setSelectedDate(e.target.value)
                    }
                  />

                </label>

              </div>

            </div>


            {/* TIME */}

            <div className="bookingField">

              <label>
                Select Time Slot
              </label>


              <div className="timeSlots">

                {timeSlots.map((time) => (

                  <button
                    key={time}
                    type="button"
                    className={
                      selectedTime === time
                        ? "timeSlot active"
                        : "timeSlot"
                    }
                    onClick={() =>
                      setSelectedTime(time)
                    }
                  >
                    {time}
                  </button>

                ))}

              </div>

            </div>


            {/* BUTTONS */}

            <div className="bookingActions">

              <button
                type="button"
                className="backButton"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>


              <button
                type="button"
                className="continueButton"
                onClick={continueToDetails}
              >
                Continue →
              </button>

            </div>

          </div>

        </div>
      )}


      {/* =========================
          STEP 3
          PERSONAL DETAILS
      ========================= */}

      {step === 3 && (
        <div className="bookingContainer">

          <div className="bookingCard">

            <div className="bookingHeader">

              <p className="eyebrow dark">
                ALMOST DONE
              </p>

              <h2>
                Enter Your Details
              </h2>

              <p>
                Please provide your details so our team
                can confirm your appointment.
              </p>

            </div>


            <form
              className="bookingForm"
              onSubmit={submit}
            >

              {/* NAME */}

              <div className="formGroup">

                <label>
                  Full Name *
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  required
                />

              </div>


              {/* PHONE */}

              <div className="formGroup">

                <label>
                  Phone Number *
                </label>

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  required
                />

              </div>


              {/* MESSAGE */}

              <div className="formGroup">

                <label>
                  Message (Optional)
                </label>

                <textarea
                  rows={4}
                  placeholder="Any additional information?"
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                />

              </div>


              {/* BOOKING SUMMARY */}

              <div className="bookingSummary">

                <h3>
                  Booking Summary
                </h3>

                <div>

                  <p>
                    <span>Service</span>

                    <strong>
                      {bookingType === "siteVisit"
                        ? "Site Visit"
                        : "Consultation"}
                    </strong>
                  </p>


                  <p>
                    <span>Date</span>

                    <strong>
                      {formatDate(selectedDate)}
                    </strong>
                  </p>


                  <p>
                    <span>Time</span>

                    <strong>
                      {selectedTime}
                    </strong>
                  </p>

                </div>

              </div>


              {/* BUTTONS */}

              <div className="bookingActions">

                <button
                  type="button"
                  className="backButton"
                  onClick={() => setStep(2)}
                >
                  ← Back
                </button>


                <button
                  type="submit"
                  className="continueButton"
                >
                  Confirm Booking →
                </button>

              </div>


              {/* STATUS */}

              {status && (

                <p className="bookingStatus">
                  {status}
                </p>

              )}

            </form>

          </div>

        </div>
      )}

    </div>
  );
}