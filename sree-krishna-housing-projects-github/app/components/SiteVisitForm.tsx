"use client";

import { useState } from "react";

type BookingType = "siteVisit" | "consultation" | "";

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

  const [bookingType, setBookingType] =
    useState<BookingType>("");

  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedTime, setSelectedTime] =
    useState("");

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState("");

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

  function selectToday() {
    setSelectedDate(formatDate(today));
  }

  function selectTomorrow() {
    setSelectedDate(formatDate(tomorrow));
  }

  function handleBookingType(type: BookingType) {
    setBookingType(type);
    setStep(2);
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

  async function confirmBooking() {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    setStatus("Submitting...");

    try {
      const response = await fetch("/api/site-visit", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          bookingType,
          name,
          phone,
          preferredDate: selectedDate,
          preferredTime: selectedTime,
          message,
        }),
      });

      if (response.ok) {
        setStatus(
          "Thank you! Your booking has been confirmed. We will contact you shortly."
        );

        setStep(4);
      } else {
        setStatus(
          "Unable to submit your booking. Please try again."
        );
      }
    } catch (error) {
      console.error(error);

      setStatus(
        "Something went wrong. Please try again."
      );
    }
  }

  return (
    <div className="siteVisitWrapper">

      {/* =========================
          STEP 1 - BOOKING TYPE
      ========================== */}

      {step === 1 && (
        <div className="bookingContainer bookingTypeContainer">
          <h2>
            What would you like to schedule?
          </h2>

          <div className="bookingOptions">

            {/* SITE VISIT */}

            <button
              type="button"
              className="bookingOption"
              onClick={() =>
                handleBookingType("siteVisit")
              }
            >
              <div className="bookingIcon">
                ⌖
              </div>

              <h3>Site Visit</h3>

              <p>
                Tour properties in person with
                our experts.
              </p>
            </button>

            {/* CONSULTATION */}

            <button
              type="button"
              className="bookingOption"
              onClick={() =>
                handleBookingType("consultation")
              }
            >
              <div className="bookingIcon">
                ♙
              </div>

              <h3>Consultation</h3>

              <p>
                Discuss investment, legality, or
                construction.
              </p>
            </button>

          </div>
        </div>
      )}

      {/* =========================
          STEP 2 - DATE & TIME
      ========================== */}

      {step === 2 && (
        <div className="bookingContainer">

          <h2>Select Date & Time</h2>

          <div className="bookingFormSection">

            <label className="bookingLabel">
              Select Date
            </label>

            <div className="dateOptions">

              <button
                type="button"
                className={
                  selectedDate === formatDate(today)
                    ? "dateButton active"
                    : "dateButton"
                }
                onClick={selectToday}
              >
                Today
              </button>

              <button
                type="button"
                className={
                  selectedDate === formatDate(tomorrow)
                    ? "dateButton active"
                    : "dateButton"
                }
                onClick={selectTomorrow}
              >
                Tomorrow
              </button>

              <label
                className={
                  selectedDate &&
                  selectedDate !== formatDate(today) &&
                  selectedDate !== formatDate(tomorrow)
                    ? "dateButton active calendarButton"
                    : "dateButton calendarButton"
                }
              >
                <span>
                  {selectedDate &&
                  selectedDate !== formatDate(today) &&
                  selectedDate !== formatDate(tomorrow)
                    ? new Date(
                        selectedDate + "T00:00:00"
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        }
                      )
                    : "Select Date"}
                </span>

                <input
                  type="date"
                  min={formatDate(today)}
                  value={selectedDate}
                  onChange={(e) =>
                    setSelectedDate(e.target.value)
                  }
                />
              </label>

            </div>

          </div>

          <div className="bookingFormSection">

            <label className="bookingLabel">
              Select Time Slot
            </label>

            <div className="timeSlots">

              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={
                    selectedTime === time
                      ? "timeButton active"
                      : "timeButton"
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
              onClick={continueToDetails}
            >
              Continue →
            </button>

          </div>

        </div>
      )}

      {/* =========================
          STEP 3 - USER DETAILS
      ========================== */}

      {step === 3 && (
        <div className="bookingContainer">

          <h2>Your Details</h2>

          <div className="detailsForm">

            <div className="inputGroup">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>

            <div className="inputGroup">
              <label>Phone Number</label>

              <input
                type="tel"
                placeholder="+91 9494444818"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />
            </div>

            <div className="inputGroup">
              <label>
                Message (Optional)
              </label>

              <textarea
                rows={4}
                placeholder="Any specific requests?"
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              />
            </div>

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
              type="button"
              className="continueButton"
              onClick={confirmBooking}
            >
              Confirm Booking →
            </button>

          </div>

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
        <div className="bookingContainer successContainer">

          <div className="successIcon">
            ✓
          </div>

          <h2>Booking Confirmed!</h2>

          <p>
            Thank you, {name}.
          </p>

          <p>
            Your {bookingType === "siteVisit"
              ? "site visit"
              : "consultation"}{" "}
            is scheduled for:
          </p>

          <div className="bookingSummary">

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                selectedDate + "T00:00:00"
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {selectedTime}
            </p>

          </div>

          <p className="successText">
            Our team will contact you shortly.
          </p>

        </div>
      )}

    </div>
  );
}