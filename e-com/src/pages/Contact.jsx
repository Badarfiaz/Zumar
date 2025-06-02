import React, { useRef, useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import Footer from "../components/Footer";

const Contact = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' or 'error'

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage("");
        setStatusType("");
      }, 5000); // message disappears after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const user_name = formData.get('user_name');
    const user_email = formData.get('user_email');
    const message = formData.get('message');

    emailjs.sendForm(
      'service_fqrzmsd',
      'template_a9ls28u',
      form.current,
      'Ac-dhmFbROV__5uNp'
    ).then(() => {
      return emailjs.send(
        'service_fqrzmsd',
        'template_wmpn0ci',
        { user_name, user_email, message },
        'Ac-dhmFbROV__5uNp'
      );
    }).then(() => {
      setStatusType("success");
      setStatusMessage("Your message has been sent successfully!");
      form.current.reset();
    }).catch((error) => {
      setStatusType("error");
      setStatusMessage("Oops! Something went wrong. Please try again.");
      console.error(error);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0B1D26] font-serif text-[#D9D6C3]">
      <div className="flex-grow bg-[#1E2E3E] max-w-xl w-full p-10 mx-auto rounded-3xl shadow-lg border border-[#4A3C31] mt-16 mb-12">
        <h2 className="text-4xl font-bold mb-10 text-[#9A7B4F] text-center tracking-wide drop-shadow-md">
          Contact Us
        </h2>

        <form ref={form} onSubmit={handleSubmit} className="space-y-8">

          <div>
            <label className="block text-lg font-semibold mb-2 tracking-wide text-[#B2A67E]">Name</label>
            <input
              type="text"
              name="user_name"
              placeholder="Your Full Name"
              required
              className="w-full px-5 py-3 border border-[#9A7B4F] rounded-lg bg-[#152A3D] text-[#D9D6C3] placeholder-[#B2A67E] focus:outline-none focus:ring-2 focus:ring-[#9A7B4F] shadow-inner"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2 tracking-wide text-[#B2A67E]">Email</label>
            <input
              type="email"
              name="user_email"
              placeholder="you@example.com"
              required
              className="w-full px-5 py-3 border border-[#9A7B4F] rounded-lg bg-[#152A3D] text-[#D9D6C3] placeholder-[#B2A67E] focus:outline-none focus:ring-2 focus:ring-[#9A7B4F] shadow-inner"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2 tracking-wide text-[#B2A67E]">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              placeholder="Write your message here..."
              className="w-full px-5 py-4 border border-[#9A7B4F] rounded-lg bg-[#152A3D] text-[#D9D6C3] placeholder-[#B2A67E] focus:outline-none focus:ring-2 focus:ring-[#9A7B4F] shadow-inner resize-none"
            ></textarea>
          </div>

          {/* Status message box */}
          {statusMessage && (
            <div
              className={`p-4 rounded-lg text-center mb-4 max-w-md mx-auto
                ${statusType === "success" 
                  ? "bg-[#9A7B4F] text-[#0B1D26] border border-[#7D6139]" 
                  : "bg-[#7D3C3C] text-[#FDE8E8] border border-[#5A1E1E]"
                } shadow-md font-semibold tracking-wide`}
              role="alert"
            >
              {statusMessage}
            </div>
          )}

          <button
            type="submit"
            className="block bg-[#9A7B4F] hover:bg-[#7D6139] text-[#0B1D26] font-semibold text-lg rounded-xl py-3 mx-auto w-48 shadow-lg transition transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>

      <Footer className="w-full" />
    </div>
  );
};

export default Contact;
