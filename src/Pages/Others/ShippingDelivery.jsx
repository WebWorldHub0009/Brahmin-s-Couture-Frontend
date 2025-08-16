// ShippingDelivery.jsx

import React from "react";

const ShippingDelivery = () => {
  return (
    <div className="bg-white text-black px-4 py-10 md:px-20 lg:px-40">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl text-red-700 md:text-4xl font-bold mb-4 text-center">
          Shipping and Delivery
        </h1>
        <p className="text-gray-600 text-sm text-center mb-10">
          Last updated on Aug 16, 2025
        </p>

        <div className="space-y-6 text-gray-800 text-base leading-relaxed">
          <p>
            For International buyers, orders are shipped and delivered through
            registered international courier companies and/or International
            speed post only.
          </p>

          <p>
            For domestic buyers, orders are shipped through registered domestic
            courier companies and/or speed post only. Orders are shipped within
            0–7 days or as per the delivery date agreed at the time of order
            confirmation and delivering of the shipment subject to Courier
            Company / post office norms.
          </p>

          <p>
            <strong>Brahmani's Couture</strong> is not liable for any delay in
            delivery by the courier company / postal authorities and only
            guarantees to hand over the consignment to the courier company or
            postal authorities within 0–7 days from the date of the order and
            payment or as per the delivery date agreed at the time of order
            confirmation.
          </p>

          <p>
            Delivery of all orders will be to the address provided by the
            buyer. Delivery of our services will be confirmed on your email ID
            as specified during registration.
          </p>

          <p>
            For any issues in utilizing our services you may contact our
            helpdesk:
          </p>

          <ul className="list-disc list-inside ml-4">
            <li>📞 8179941102</li>
            <li>📧 brahmaniscouture@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShippingDelivery;
