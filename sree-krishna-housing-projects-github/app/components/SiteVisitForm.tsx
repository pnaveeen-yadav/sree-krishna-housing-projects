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

  const today = new Date();

  const [calendarMonth, setCalendarMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

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
      year: "numeric",
    });
  };

  const isToday = (date: Date) => {
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const isPastDate = (date: Date) => {
    const checkDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const currentDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return checkDate < currentDate;
  };

  const selectDate = (date: Date) => {
    if (isPastDate(date)) {
      return;
    }

    setPreferredDate(formatDate(date));
    setStatus("");
  };

  const changeMonth = (direction: number) => {
    const newMonth = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() + direction,
      1
    );

    const currentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (newMonth < currentMonth) {
      return;
    }

    setCalendarMonth(newMonth);
  };

  const generateCalendarDays = () => {
    const year = calendarMonth.getFullYear();

    const month = calendarMonth.getMonth();

    const firstDay = new Date(
      year,
      month,
      1
    ).getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        new Date(year, month, day)
      );
    }

    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
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
      const response = await fetch(
        "/api/site-visit",
        {
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
        }
      );

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

  const calendarDays = generateCalendarDays();

  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

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

          <h2>Select Date &amp; Time</h2>


          {/* DATE */}

          <div className="selectionGroup">

            <label>
              Select Date
            </label>


            {/* SELECTED DATE */}

            {preferredDate && (
              <p
                style={{
                  marginBottom: "15px",
                  fontWeight: 600,
                }}
              >
                Selected:{" "}
                {formatCustomDate(
                  new Date(
                    `${preferredDate}T00:00:00`
                  )
                )}
              </p>
            )}


            {/* CALENDAR */}

            <div
              style={{
                width: "100%",
                maxWidth: "640px",
                margin: "0 auto",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "18px",
                background: "#fff",
              }}
            >

              {/* MONTH HEADER */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "18px",
                }}
              >

                <button
                  type="button"
                  onClick={() =>
                    changeMonth(-1)
                  }
                  disabled={
                    calendarMonth.getFullYear() ===
                      today.getFullYear() &&
                    calendarMonth.getMonth() ===
                      today.getMonth()
                  }
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "22px",
                    cursor: "pointer",
                    padding: "5px 12px",
                  }}
                >
                  ←
                </button>


                <strong
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {calendarMonth.toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </strong>


                <button
                  type="button"
                  onClick={() =>
                    changeMonth(1)
                  }
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "22px",
                    cursor: "pointer",
                    padding: "5px 12px",
                  }}
                >
                  →
                </button>

              </div>


              {/* WEEK DAYS */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(7, 1fr)",
                  gap: "6px",
                  marginBottom: "8px",
                }}
              >
                {weekDays.map((day) => (
                  <div
                    key={day}
                    style={{
                      textAlign: "center",
                      fontWeight: 600,
                      fontSize: "13px",
                      padding: "6px 0",
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>


              {/* CALENDAR DAYS */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(7, 1fr)",
                  gap: "6px",
                }}
              >
                {calendarDays.map(
                  (date, index) => {

                    if (!date) {
                      return (
                        <div
                          key={`empty-${index}`}
                        />
                      );
                    }

                    const dateValue =
                      formatDate(date);

                    const selected =
                      preferredDate === dateValue;

                    const past =
                      isPastDate(date);

                    const todaySelected =
                      isToday(date);

                    return (
                      <button
                        key={dateValue}
                        type="button"
                        disabled={past}
                        onClick={() =>
                          selectDate(date)
                        }
                        style={{
                          aspectRatio: "1",
                          borderRadius: "8px",
                          border:
                            selected
                              ? "1px solid #b79a63"
                              : todaySelected
                              ? "1px solid #b79a63"
                              : "1px solid #ddd",

                          background:
                            selected
                              ? "#b79a63"
                              : "#fff",

                          color:
                            selected
                              ? "#fff"
                              : past
                              ? "#bbb"
                              : "#333",

                          cursor:
                            past
                              ? "not-allowed"
                              : "pointer",

                          fontWeight:
                            selected ||
                            todaySelected
                              ? 600
                              : 400,

                          opacity:
                            past
                              ? 0.5
                              : 1,
                        }}
                      >
                        {date.getDate()}
                      </button>
                    );
                  }
                )}
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
              <span>←</span>
              Back
            </button>


            <button
              type="button"
              className="continueButton"
              onClick={handleContinue}
            >
              Continue
              <span>→</span>
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
              placeholder="+91 6303688516"
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


          {/* ACTIONS */}

          <div className="bookingActions">

            <button
              type="button"
              className="backButton"
              onClick={() => {
                setStatus("");
                setStep(2);
              }}
            >
              <span>←</span>
              Back
            </button>


            <button
              type="submit"
              className="continueButton"
            >
              Confirm Booking
              <span>→</span>
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