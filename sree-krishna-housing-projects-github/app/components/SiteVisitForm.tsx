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

  const [preferredDate, setPreferredDate] =
    useState("");

  const [preferredTime, setPreferredTime] =
    useState("");

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState("");

  const [status, setStatus] = useState("");

  const todayDate = new Date();

  const tomorrowDate = new Date();
  tomorrowDate.setDate(todayDate.getDate() + 1);

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const selectToday = () => {
    setPreferredDate(formatDate(todayDate));
  };

  const selectTomorrow = () => {
    setPreferredDate(formatDate(tomorrowDate));
  };

  const handleContinue = () => {
    if (!preferredDate) {
      setStatus("Please select a date.");
      return;
    }

    if (!preferredTime) {
      setStatus("Please select a time slot.");
      return;
    }

    setStatus("");
    setStep(3);
  };

  const submitBooking = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      setStatus("Please enter your full name.");
      return;
    }

    if (!phone.trim()) {
      setStatus("Please enter your phone number.");
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
          message,
          preferredDate,
          preferredTime,
        }),
      });

      if (response.ok) {
        setStatus(
          "Thank you! Your booking has been submitted successfully."
        );

        setName("");
        setPhone("");
        setMessage("");
        setPreferredDate("");
        setPreferredTime("");
        setBookingType("");

        setStep(1);
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
  };

  return (
    <div className="siteVisitWrapper">

      {/* =========================
          STEP 1 - BOOKING TYPE
      ========================== */}

      {step === 1 && (
        <div className="bookingContainer">

          <h2>
            What would you like to schedule?
          </h2>

          <div className="bookingOptions">

            {/* SITE VISIT */}

            <button
              type="button"
              className="bookingOption"
              onClick={() => {
                setBookingType("siteVisit");
                setStep(2);
              }}
            >
              <div className="bookingIcon">
                ♧
              </div>

              <h3>Site Visit</h3>

              <p>
                Tour properties in person with
                <br />
                our experts.
              </p>
            </button>


            {/* CONSULTATION */}

            <button
              type="button"
              className="bookingOption"
              onClick={() => {
                setBookingType("consultation");
                setStep(2);
              }}
            >
              <div className="bookingIcon">
                ♧
              </div>

              <h3>Consultation</h3>

              <p>
                Discuss investment, legality, or
                <br />
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
        <div className="bookingContainer dateTimeContainer">

          <h2>Select Date & Time</h2>


          {/* DATE */}

          <div className="selectionGroup">

            <label>
              Select Date
            </label>

            <div className="dateOptions">

              <button
                type="button"
                className={
                  preferredDate ===
                  formatDate(todayDate)
                    ? "dateButton selected"
                    : "dateButton"
                }
                onClick={selectToday}
              >
                Today
              </button>


              <button
                type="button"
                className={
                  preferredDate ===
                  formatDate(tomorrowDate)
                    ? "dateButton selected"
                    : "dateButton"
                }
                onClick={selectTomorrow}
              >
                Tomorrow
              </button>


              <div className="calendarInput">

                <input
                  type="date"
                  value={preferredDate}
                  min={formatDate(todayDate)}
                  onChange={(e) =>
                    setPreferredDate(e.target.value)
                  }
                />

              </div>

            </div>

          </div>


          {/* TIME */}

          <div className="selectionGroup timeGroup">

            <label>
              Select Time Slot
            </label>

            <div className="timeSlots">

              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={
                    preferredTime === time
                      ? "timeButton selected"
                      : "timeButton"
                  }
                  onClick={() =>
                    setPreferredTime(time)
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
              onClick={handleContinue}
            >
              Continue →
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
          STEP 3 - USER DETAILS
      ========================== */}

      {step === 3 && (
        <form
          className="bookingContainer detailsContainer"
          onSubmit={submitBooking}
        >

          <h2>Your Details</h2>


          {/* NAME */}

          <div className="formGroup">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>


          {/* PHONE */}

          <div className="formGroup">

            <label>
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="+91 9494444818"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
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
              placeholder="Any specific requests?"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              rows={4}
            />

          </div>


          {/* ACTIONS */}

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


          {status && (
            <p className="bookingStatus">
              {status}
            </p>
          )}

        </form>
      )}

    </div>
  );
}