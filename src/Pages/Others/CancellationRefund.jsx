import React from "react";

const CancellationRefund = () => {
  return (
    <div className="bg-white min-h-screen px-6 py-12 sm:px-10 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-4">
          Cancellation and Refund
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Last updated on Aug 16, 2025
        </p>

        <div className="space-y-6 text-gray-800 leading-relaxed">
          <p>
            <span className="font-semibold text-black">
              Brahmani's Couture
            </span>{" "}
            believes in helping its customers as far as possible, and has
            therefore a liberal cancellation policy. Under this policy:
          </p>

          <ul className="list-disc list-inside space-y-4 text-gray-700">
            <li>
              Cancellations will be considered only if the request is made
              immediately after placing the order. However, the cancellation
              request may not be entertained if the orders have been
              communicated to the vendors/merchants and they have initiated the
              process of shipping them.
            </li>

            <li>
              Brahmani's Couture does not accept cancellation requests for
              perishable items like flowers, eatables etc. However,
              refund/replacement can be made if the customer establishes that
              the quality of product delivered is not good.
            </li>

            <li>
              In case of receipt of damaged or defective items, please report
              the same to our Customer Service team. The request will, however,
              be entertained once the merchant has checked and determined the
              same at his own end. This should be reported within{" "}
              <span className="font-semibold text-black">7 days</span> of
              receipt of the products.
            </li>

            <li>
              In case you feel that the product received is not as shown on the
              site or as per your expectations, you must bring it to the notice
              of our customer service within{" "}
              <span className="font-semibold text-black">7 days</span> of
              receiving the product. The Customer Service Team after looking
              into your complaint will take an appropriate decision.
            </li>

            <li>
              In case of complaints regarding products that come with a warranty
              from manufacturers, please refer the issue to them.
            </li>

            <li>
              In case of any Refunds approved by the Brahmani's Couture, it’ll
              take{" "}
              <span className="font-semibold text-black">3–5 business days</span>{" "}
              for the refund to be processed to the end customer.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefund;
