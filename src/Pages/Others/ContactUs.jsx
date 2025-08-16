// ContactUs.jsx

import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-white text-black min-h-screen py-12 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold mb-6 border-b-2 pb-2 border-gray-300">
          Contact Us
        </h1>

        <p className="text-lg mb-6">
          If you have any questions, concerns, or feedback, feel free to reach out to us using the contact details below. We're here to assist you and ensure you have a pleasant experience with Brahmani's Couture.
        </p>

        <div className="space-y-4 text-base">
          <div>
            <h2 className="text-xl font-medium mb-1">Merchant Legal Entity Name</h2>
            <p>Brahmani's Couture</p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-1">Registered Address</h2>
            <p>
              House No: 5-3-23/2, Ground Floor, Sri Sai Nagar Colony,<br />
              Near RNS Colony Bus Stop, Boduppal Hyderabad,<br />
              Secunderabad, Telangana - 500092
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-1">Operational Address</h2>
            <p>
              House No: 5-3-23/2, Ground Floor, Sri Sai Nagar Colony,<br />
              Near RNS Colony Bus Stop, Boduppal Hyderabad,<br />
              Secunderabad, Telangana - 500092
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-1">Telephone</h2>
            <p>+91 81799 41102</p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-1">Email</h2>
            <p>
              <a href="mailto:brahmaniscouture@gmail.com" className="text-blue-600 underline">
                brahmaniscouture@gmail.com
              </a>
            </p>
          </div>
        </div>

        <p className="text-sm mt-10 text-gray-500">
          Last updated on Aug 16, 2025
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
