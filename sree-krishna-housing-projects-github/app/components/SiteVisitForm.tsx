"use client";

import { useRef, useState } from "react";

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

  const dateInputRef = useRef<HTMLInputElement>(null);

  const todayDate = new Date();

  const tomorrowDate = new Date();
  tomorrowDate.setDate(todayDate.getDate() + 1);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatCustomDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const selectToday = () => {
    setPreferredDate(formatDate(todayDate));
    setStatus("");
  };

  const selectTomorrow = () => {
    setPreferredDate(formatDate(tomorrowDate));
    setStatus("");
  };

  const openCalendar = () => {
    if (!dateInputRef.current) return;

    try {
      if (
        typeof dateInputRef.current.showPicker ===
        "function"
      ) {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.click();
      }
    } catch (error) {
      dateInputRef.current.click();
    }
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

      const data = await response.json();

      if (!response.ok) {
        console.error("Booking error:", data);

        setStatus(
          "Unable to submit your booking. Please try again."
        );

        return;
      }

      setStatus(
        "Thank you! Your booking has been submitted successfully."
      );

      setName("");
      setPhone("");
      setMessage("");
      setPreferredDate("");
      setPreferredTime("");
      setBookingType("");

      setTimeout(() => {
        setStep(1);
        setStatus("");
      }, 2500);

    } catch (error) {
      console.error("Booking error:", error);

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
                setStatus("");
                setStep(2);
              }}
            >
              <div className="bookingIcon">

                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 10C20 15.5 12 21 12 21C12 21 4 15.5 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>

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
                setStatus("");
                setStep(2);
              }}
            >
              <div className="bookingIcon">

                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M2 21V18C2 15.79 3.79 14 6 14H12C14.21 14 16 15.79 16 18V21"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M17 11C19.21 11 21 12.79 21 15V18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M16 3.5C17.75 3.9 19 5.45 19 7.25C19 9.05 17.75 10.6 16 11"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>

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

          <h2>
            Select Date &amp; Time
          </h2>


          {/* DATE */}

          <div className="selectionGroup">

            <label>
              Select Date
            </label>

            <div className="dateOptions">


              {/* TODAY */}

              <button
                type="button"
                className={
                  preferredDate === formatDate(todayDate)
                    ? "dateButton selected"
                    : "dateButton"
                }
                onClick={selectToday}
              >
                Today
              </button>


              {/* TOMORROW */}

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


              {/* SELECT CUSTOM DATE */}

              <div className="customDateWrapper">

                <button
                  type="button"
                  className={
                    preferredDate &&
                    preferredDate !==
                      formatDate(todayDate) &&
                    preferredDate !==
                      formatDate(tomorrowDate)
                      ? "dateButton selected"
                      : "dateButton"
                  }
                  onClick={openCalendar}
                >
                  📅{" "}

                  {preferredDate &&
                  preferredDate !==
                    formatDate(todayDate) &&
                  preferredDate !==
                    formatDate(tomorrowDate)
                    ? formatCustomDate(
                        new Date(
                          `${preferredDate}T00:00:00`
                        )
                      )
                    : "Select Date"}

                </button>


                {/* HIDDEN NATIVE DATE PICKER */}

                <input
                  ref={dateInputRef}
                  type="date"
                  value={preferredDate}
                  min={formatDate(todayDate)}
                  className="hiddenDateInput"
                  onChange={(e) => {
                    setPreferredDate(e.target.value);
                    setStatus("");
                  }}
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
                  onClick={() => {
                    setPreferredTime(time);
                    setStatus("");
                  }}
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
              onClick={() => {
                setStatus("");
                setStep(1);
              }}
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

          <h2>
            Your Details
          </h2>


          {/* FULL NAME */}

          <div className="formGroup">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setStatus("");
              }}
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
              placeholder="Your Number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setStatus("");
              }}
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
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              rows={4}
            />

          </div>


          {/* BUTTONS */}

          <div className="bookingActions">

            <button
              type="button"
              className="backButton"
              onClick={() => {
                setStatus("");
                setStep(2);
              }}
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