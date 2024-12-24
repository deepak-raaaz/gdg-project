"use client";

import React from "react";
import { useState } from "react";
import { FiMail } from "react-icons/fi"; // Email icon
import Background from "@/components/ui/Background";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    
      <div className="flex min-h-screen p-9 bg-gray-100">
        <Background />
        {/* Left Section */}
        <div className="flex-1 px-11">
          <h1 className="text-5xl font-bold text-black-800" style={{ marginTop: "100px" }}>
            Contact Us
          </h1>
          <p className="mt-8 text-2xl text-gray-600">
            Email, call or complete the form to know how.
          </p>
          <p className="mt-9 pt-6 text-xl text-gray-700">
            Email:{" "}
            <a href="mailto:info@gdg.com" className="underline">
              info@gdg.com
            </a>
          </p>

          <div>
            <div className="flex justify-between gap-9 mt-20 ">
              {/* Customer Support Section */}
              <div className="flex-1 text-center p-6 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Customer Support</h2>
                <p className="text-gray-600">
                  If you need assistance, please reach out to our customer support team.
                </p>
              </div>
              {/* Feedback Section */}
              <div className="flex-1 text-center p-6 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Feedback and Suggestions</h2>
                <p className="text-gray-600">
                  We value your feedback. Let us know how we can improve our services.
                </p>
              </div>
              {/* Media Inquiries Section */}
              <div className="flex-1 text-center p-6 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Media Inquiries</h2>
                <p className="text-gray-600">
                  For media inquiries, feel free to contact our media team.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white shadow-md rounded-lg p-8"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-1">Get in Touch</h2>
            <p className="text-gray-600 mb-4">We’d love to hear from you.</p>

            {/* First Name & Last Name */}
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text-gray-600 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="block text-gray-600 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-2 border rounded-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-600 mb-2">
                How can we help you?
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message here..."
                rows={5}
                maxLength={120}
                required
              ></textarea>
              <p className="text-sm text-gray-500 text-right">
                {formData.message.length}/120 characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit
            </button>

            {/* Links */}
            <p className="text-sm text-gray-500 mt-4 text-center">
              By submitting, you agree to our{" "}
              <a href="/terms" className="text-blue-500 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    
  );
};

export default ContactPage;
