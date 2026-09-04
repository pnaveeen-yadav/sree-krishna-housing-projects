"use client";

import { useState } from "react";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "04:00 PM",
  "06:00 PM",
];

export default function SiteVisitForm() {
  const [step, setStep] = useState(1);

  const [visitType, setVisitType] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  const [selectedTime, setSelectedTime] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const todayValue = formatDate(today);
  const tomorrowValue = formatDate(tomorrow);

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name || !form.phone) {
      setStatus("Please enter your name and phone number.");
      return;
    }

    setStatus("Submitting...");

    const bookingData = {
      name: form.name,
      phone: form.phone,
      message: form.message,
      preferredDate: selectedDate,
      preferredTime: selectedTime,
      visitType,
    };

    try {
      const response = await fetch("/api/site-visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
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
        setVisitType("");

        setStep(4);
      } else {
        setStatus(
          "Unable to submit your booking. Please try again."
        );
      }
    } catch (error) {
      setStatus(
        "Something went wrong. Please try again later."
      );
    }
  }

  return (
    <div className="siteVisitWrapper">

      <h1 className="visitPageTitle">
        Schedule Your Visit
      </h1>

      {/* =========================
          STEP 1 - VISIT TYPE
      ========================== */}

      {step === 1 && (
        <div className="bookingCard">

          <div className="bookingTopLine"></div>

          <h2 className="bookingTitle">
            What would you like to schedule?
          </h2>

          <div className="visitTypeGrid">

            <button
              type="button"
              className="visitTypeCard"
              onClick={() => {
                setVisitType("Site Visit");
                setStep(2);
              }}
            >
              <div className="visitIcon">
                📍
              </div>

              <h3>Site Visit</h3>

              <p>
                Tour properties in person with
                our experts.
              </p>
            </button>

            <button
              type="button"
              className="visitTypeCard"
              onClick={() => {
                setVisitType("Consultation");
                setStep(2);
              }}
            >
              <div className="visitIcon">
                👥
              </div>

              <h3>Consultation</h3>

              <p>
                Discuss investment, legality,
                or construction.
              </p>
            </button>

          </div>

        </div>
      )}

      {/* =========================
          STEP 2 - DATE & TIME
      ========================== */}

      {step === 2 && (
        <div className="bookingCard">

          <div className="bookingTopLine"></div>

          <h2 className="bookingTitle">
            Select Date & Time
          </h2>

          <div className="bookingSection">

            <h3>Select Date</h3>

            <div className="dateOptions">

              <button
                type="button"
                className={
                  selectedDate === todayValue
                    ? "dateOption active"
                    : "dateOption"
                }
                onClick={() =>
                  setSelectedDate(todayValue)
                }
              >
                Today
              </button>

              <button
                type="button"
                className={
                  selectedDate === tomorrowValue
                    ? "dateOption active"
                    : "dateOption"
                }
                onClick={() =>
                  setSelectedDate(tomorrowValue)
                }
              >
                Tomorrow
              </button>

              <div className="calendarOption">

                <input
                  id="visitDate"
                  type="date"
                  min={todayValue}
                  value={
                    selectedDate !== todayValue &&
                    selectedDate !== tomorrowValue
                      ? selectedDate
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedDate(e.target.value)
                  }
                />

                <label htmlFor="visitDate">
                  {selectedDate &&
                  selectedDate !== todayValue &&
                  selectedDate !== tomorrowValue
                    ? formatDisplayDate(
                        new Date(
                          `${selectedDate}T00:00:00`
                        )
                      )
                    : "📅 Choose Date"}
                </label>

              </div>

            </div>

          </div>

          <div className="bookingSection">

            <h3>Select Time Slot</h3>

            <div className="timeSlots">

              {timeSlots.map((time) => (
                <button
                  type="button"
                  key={time}
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
              disabled={
                !selectedDate || !selectedTime
              }
              onClick={() => setStep(3)}
            >
              Continue →
            </button>

          </div>

        </div>
      )}

      {/* =========================
          STEP 3 - DETAILS
      ========================== */}

      {step === 3 && (
        <div className="bookingCard">

          <div className="bookingTopLine"></div>

          <h2 className="bookingTitle">
            Your Details
          </h2>

          <form
            className="bookingDetailsForm"
            onSubmit={submitBooking}
          >

            <div className="formGroup">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

            </div>

            <div className="formGroup">

              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                placeholder="+91 9494444818"
                required
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />

            </div>

            <div className="formGroup">

              <label htmlFor="message">
                Message (Optional)
              </label>

              <textarea
                id="message"
                placeholder="Any specific requests?"
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
              />

            </div>

            <div className="bookingSummary">

              <p>
                <strong>Booking Type:</strong>{" "}
                {visitType}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {selectedDate
                  ? formatDisplayDate(
                      new Date(
                        `${selectedDate}T00:00:00`
                      )
                    )
                  : ""}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {selectedTime}
              </p>

            </div>

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

          </form>

          {status && (
            <p className="bookingStatus">
              {status}
            </p>
          )}

        </div>
      )}

      {/* =========================
          STEP 4 - SUCCESS
      ========================== */}

      {step === 4 && (
        <div className="bookingCard successCard">

          <div className="successIcon">
            ✓
          </div>

          <h2>
            Booking Request Received!
          </h2>

          <p>
            Thank you for contacting Sree Krishna
            Housing Projects.
          </p>

          <p>
            Our team will contact you shortly to
            confirm your {visitType.toLowerCase()}.
          </p>

          <button
            type="button"
            className="continueButton"
            onClick={() => setStep(1)}
          >
            Book Another Visit
          </button>

        </div>
      )}

    </div>
  );
}