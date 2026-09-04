"use client";

import { useState } from "react";

export default function ContactPage() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("Thank you! Your message has been received. We will contact you shortly.");

    e.currentTarget.reset();
  }

  return (
    <main className="contactPage">

      {/* Navigation */}
      <header className="nav contactNav">

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
          <a href="/contact">Contact</a>
        </nav>

        <a className="btn gold" href="/#visit">
          Book Site Visit
        </a>

      </header>


      <div className="contactContainer">

        {/* LEFT SIDE */}
        <section className="contactLeft">

          <h1>Direct Contact</h1>

          <div className="contactCards">

            {/* CALL */}
            <a
              href="tel:+919494441818"
              className="contactCard"
            >
              <div className="contactIcon">☎</div>

              <div className="contactCardContent">
                <small>Call Us</small>
                <b>+91 9494441818</b>
              </div>
            </a>


            {/* WHATSAPP */}
            <a
              href="https://wa.me/919494441818"
              target="_blank"
              className="contactCard"
            >
              <div className="contactIcon">◉</div>

              <div className="contactCardContent">
                <small>WhatsApp</small>
                <b>Chat Now</b>
              </div>
            </a>


            {/* EMAIL */}
            <a
              href="mailto:sreekrishna.housingprojects@gmail.com"
              className="contactCard"
            >
              <div className="contactIcon">✉</div>

              <div className="contactCardContent">
                <small>Email Us</small>
                <b>sreekrishna.housingprojects@gmail.com</b>
              </div>
            </a>

          </div>


          {/* OFFICE LOCATION */}

          <div className="officeLocation">

            <h2>Office Location</h2>

            <div className="locationRow">

              <div className="locationIcon">⌖</div>

              <div className="locationContent">

                <b>Sree Krishna Housing Projects</b>

                <p>
                  2nd Floor, American Towers,
                  <br />
                  Opp. Renigunta Medicals,
                  <br />
                  LeelaMahal Circle,
                  <br />
                  Tirupati, Andhra Pradesh
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* RIGHT SIDE */}

        <section className="contactFormBox">

          <h2>Send us a Message</h2>

          <p>
            Interested in a property? Have a question?
            Fill out the form below.
          </p>


          <form
            className="contactForm"
            onSubmit={handleSubmit}
          >

            <label>Full Name</label>

            <input
              type="text"
              placeholder="Your Name"
              required
            />


            <label>Phone Number</label>

            <input
              type="tel"
              placeholder="+91 9494441818"
              required
            />


            <label>Email (Optional)</label>

            <input
              type="email"
              placeholder="you@example.com"
            />


            <label>Message</label>

            <textarea
              placeholder="How can we help you?"
              required
            />


            <button type="submit">
              Send Message
            </button>

            {message && (
              <p className="contactSuccess">
                {message}
              </p>
            )}

          </form>

        </section>

      </div>

    </main>
  );
}