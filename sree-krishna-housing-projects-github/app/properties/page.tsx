"use client";

import { useState } from "react";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "04:00 PM",
  "06:00 PM"
];

export default function VisitPage() {
  const [step, setStep] = useState(1);

  const [visitType, setVisitType] = useState<
    "Site Visit" | "Consultation" | ""
  >("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  function formatDate(date: Date) {
    return date.toISOString().split("T")[0];
  }

  function formatDisplayDate(date: Date) {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  function selectToday() {
    setSelectedDate(formatDate(today));
  }

  function selectTomorrow() {
    setSelectedDate(formatDate(tomorrow));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    try {
      setMessage("Submitting your booking...");

      const response = await fetch("/api/site-visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          visitType,
          name,
          phone,
          preferredDate: selectedDate,
          preferredTime: selectedTime
        })
      });

      if (response.ok) {
        setMessage(
          "Thank you! Your booking request has been submitted successfully."
        );

        setStep(4);
      } else {
        setMessage(
          "Unable to submit your booking. Please try again."
        );
      }
    } catch (error) {
      setMessage(
        "Something went wrong. Please try again."
      );
    }
  }

  return (
    <main className="visitPage">

      {/* HEADER */}

      <header className="nav">
        <a href="/" className="brand">
          <span>SK</span>

          <div>
            <b>SREE KRISHNA</b>
            <small>HOUSING PROJECTS</small>
          </div>
        </a>

        <nav>
          <a href="/">Home</a>
          <a href="/properties">Properties</a>
          <a href="/#services">Services</a>
          <a href="/#testimonials">Testimonials</a>
          <a href="/#contact">Contact</a>
        </nav>

        <a className="btn gold" href="/visit">
          Book Site Visit
        </a>
      </header>


      {/* PAGE CONTENT */}

      <section className="visitPageContent">

        <h1>Schedule Your Visit</h1>


        {/* ================= STEP 1 ================= */}

        {step === 1 && (
          <div className="bookingContainer">

            <h2>What would you like to schedule?</h2>

            <div className="visitTypeGrid">

              <button
                type="button"
                className={`visitTypeCard ${
                  visitType === "Site Visit" ? "selected" : ""
                }`}
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
                  Tour properties in person with our experts.
                </p>
              </button>


              <button
                type="button"
                className={`visitTypeCard ${
                  visitType === "Consultation" ? "selected" : ""
                }`}
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
                  Discuss investment, legality, or construction.
                </p>
              </button>

            </div>

          </div>
        )}


        {/* ================= STEP 2 ================= */}

        {step === 2 && (
          <div className="bookingContainer">

            <h2>Select Date & Time</h2>


            <div className="bookingSection">

              <h3>Select Date</h3>

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


                <label className="calendarButton">

                  <input
                    type="date"
                    min={formatDate(today)}
                    value={
                      selectedDate !== formatDate(today) &&
                      selectedDate !== formatDate(tomorrow)
                        ? selectedDate
                        : ""
                    }
                    onChange={(e) =>
                      setSelectedDate(e.target.value)
                    }
                  />

                  <span>
                    {selectedDate &&
                    selectedDate !== formatDate(today) &&
                    selectedDate !== formatDate(tomorrow)
                      ? formatDisplayDate(
                          new Date(selectedDate + "T00:00:00")
                        )
                      : "Select Date 📅"}
                  </span>

                </label>

              </div>

            </div>


            {/* TIME SLOTS */}

            <div className="bookingSection">

              <h3>Select Time Slot</h3>

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
                    onClick={() => setSelectedTime(time)}
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


        {/* ================= STEP 3 ================= */}

        {step === 3 && (
          <div className="bookingContainer">

            <h2>Your Details</h2>


            <form
              className="bookingForm"
              onSubmit={handleSubmit}
            >

              <label>Full Name</label>

              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />


              <label>Phone Number</label>

              <input
                type="tel"
                placeholder="+91 9494444818"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                required
              />


              <label>
                Message (Optional)
              </label>

              <textarea
                placeholder="Any specific requests?"
                rows={5}
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              />


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

          </div>
        )}


        {/* ================= STEP 4 ================= */}

        {step === 4 && (
          <div className="bookingContainer bookingSuccess">

            <div className="successIcon">
              ✓
            </div>

            <h2>Booking Request Received!</h2>

            <p>
              Thank you for choosing Sree Krishna Housing Projects.
            </p>

            <div className="bookingSummary">

              <p>
                <b>Booking Type:</b>{" "}
                {visitType}
              </p>

              <p>
                <b>Date:</b>{" "}
                {selectedDate}
              </p>

              <p>
                <b>Time:</b>{" "}
                {selectedTime}
              </p>

              <p>
                <b>Name:</b>{" "}
                {name}
              </p>

            </div>

            <a
              href="/"
              className="btn gold"
            >
              Back to Home
            </a>

          </div>
        )}

      </section>

    </main>
  );
}