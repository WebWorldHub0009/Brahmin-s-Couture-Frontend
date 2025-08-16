// src/pages/TermsAndConditions.jsx

import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-white text-black min-h-screen px-6 py-12 md:px-16 lg:px-32">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-red-700 mb-6 border-b border-red-700 pb-2">
          Terms and Conditions
        </h1>

        <p className="text-lg mb-4 text-gray-800">
          The Website Owner, including subsidiaries and affiliates (“Website” or
          “Website Owner” or “we” or “us” or “our”) provides the information
          contained on the website or any of the pages comprising the website
          (“website”) to visitors (“visitors”) (cumulatively referred to as
          “you” or “your” hereinafter) subject to the terms and conditions set
          out in these website terms and conditions, the privacy policy and any
          other relevant terms and conditions, policies and notices.
        </p>

        <p className="text-lg mb-4 text-gray-800">
          Welcome to our website. By browsing and using this website, you agree
          to comply with and be bound by the following terms and conditions of
          use, which together with our privacy policy govern Brahmani Couture's
          relationship with you in relation to this website.
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-red-700 mb-2">
            Website Ownership
          </h2>
          <p className="text-gray-800 mb-4">
            The term "us" or "we" refers to the owner of the website whose
            registered/operational office is:
          </p>
          <p className="text-gray-800 mb-4">
            <strong className="text-black">
              House No : 5-3-23/2 Ground Floor, Sri Sai Nagar Colony, Near RNS
              Colony Bus Stop, Boduppal Hyderabad, Secunderabad, Telangana -
              500092.
            </strong>
          </p>
          <p className="text-gray-800">The term "you" refers to the user or viewer of our website.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-red-700 mb-2">
            Terms of Use
          </h2>
          <ul className="list-disc pl-5 text-gray-800 space-y-3">
            <li>
              The content of the pages is for your general information only. It
              is subject to change without notice.
            </li>
            <li>
              Neither we nor any third parties provide any warranty or
              guarantee as to the accuracy, timeliness, or completeness of the
              information.
            </li>
            <li>
              You acknowledge that information may contain errors and we
              exclude liability for such errors to the fullest extent permitted
              by law.
            </li>
            <li>
              Use of materials is at your own risk. It is your responsibility to
              ensure products or services meet your requirements.
            </li>
            <li>
              This site includes material owned or licensed to us, including
              design, layout, appearance, and graphics. Reproduction is
              prohibited.
            </li>
            <li>
              All trademarks not owned by us are acknowledged on the website.
            </li>
            <li>
              Unauthorized use may lead to claims for damages and/or criminal
              offense.
            </li>
            <li>
              Links to other websites are provided for convenience and further
              information only.
            </li>
            <li>
              You may not link to this website without prior written consent
              from Brahmani Couture.
            </li>
            <li>
              Any disputes related to this website are subject to the laws of
              India.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-red-700 mb-2">
            Payment and Transaction Terms
          </h2>
          <p className="text-gray-800 mb-4">
            We as a merchant shall not be liable for any loss or damage arising
            directly or indirectly due to the decline of authorization for any
            transaction, owing to the cardholder exceeding the preset limit
            agreed with our acquiring bank.
          </p>
        </section>

        <div className="mt-12 border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Brahmani Couture. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
