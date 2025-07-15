"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    const res = await fetch("/api/join-waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    if (res.ok) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#45715A] px-2">
      <div className="flex flex-col items-center w-full px-4">
        <h1
          className="text-center font-sans mb-10 leading-[1] w-full text-3xl sm:text-[128px] font-medium sm:tracking-[-0.48em]"
          style={{
            color: "#FFF",
            fontFamily: 'Satoshi Variable, Satoshi, Arial, Helvetica, sans-serif',
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "100%",
            letterSpacing: "-2px", // Tighter for mobile only
            marginBottom: "6rem",
          }}
        >
          Save more<br />Waste less
        </h1>
        <div className="mb-8 sm:mb-12 w-full">
          <span
            className="block text-center w-full text-lg sm:text-[24px] sm:tracking-[-0.09em]"
            style={{
              color: "#FFF",
              textAlign: "center",
              fontFamily: 'Fraunces, serif',
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "100%",
              letterSpacing: "-0.5px", // Tighter for mobile only
              display: "block",
            }}
          >
            Join the waitlist
          </span>
        </div>
        {submitted ? (
          <div className="text-white text-center mt-4">Thank you for joining the waitlist!</div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <div className="w-full flex flex-row items-center justify-center relative max-w-xs sm:max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-2 py-2 sm:px-4 sm:py-3 border border-white bg-transparent text-white rounded-none focus:outline-none focus:ring-2 focus:ring-white text-base transition text-center text-sm sm:text-[18px]"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
                style={{
                  fontFamily: 'Satoshi Variable, Satoshi, Arial, Helvetica, sans-serif',
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "100%",
                  letterSpacing: "-1.44px",
                  color: "#FFF",
                }}
                onFocus={e => e.target.placeholder = ''}
                onBlur={e => e.target.placeholder = 'Enter your email'}
              />
              <style>{`
                input::placeholder {
                  color: rgba(225, 225, 225, 0.32) !important;
                  text-align: center;
                  font-family: 'Satoshi Variable', Satoshi, Arial, Helvetica, sans-serif;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: 100%;
                  letter-spacing: -1.44px;
                }
                @media (min-width: 640px) {
                  input::placeholder {
                    font-size: 18px;
                  }
                }
              `}</style>
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
                aria-label="Submit email"
                style={{ background: "none", border: "none" }}
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin" width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ display: 'block', margin: 'auto' }}>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#FFF"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="#FFF"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                ) : (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-opacity duration-200"
                    style={{ opacity: 1 }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    <path d="M8 16H24" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 10L24 16L18 22" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
            {error && <div className="text-red-200 text-sm mt-1">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
}
