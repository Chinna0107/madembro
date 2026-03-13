import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="bg-black min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Shipping Policy
        </h1>

        <div className="bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-800 space-y-8">
          <div className="text-gray-300 leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Shipping Methods</h2>
              <p className="mb-4">We offer multiple shipping options to meet your needs:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Standard Shipping:</strong> 5-7 business days - $10</li>
                <li><strong>Express Shipping:</strong> 2-3 business days - $20</li>
                <li><strong>Overnight Shipping:</strong> Next business day - $35</li>
                <li><strong>Free Shipping:</strong> On orders over $100 (Standard Shipping)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Processing Time</h2>
              <p>
                All orders are processed within 1-2 business days. Processing time does not include weekends or holidays. Once your order is shipped, you will receive a tracking number via email.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Delivery Areas</h2>
              <p>
                We currently ship to all locations within India. International shipping is available to select countries. Please check during checkout to see if we ship to your location.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Tracking Your Order</h2>
              <p>
                Once your order ships, you will receive an email with a tracking number. You can use this number to track your package on the carrier's website. We recommend keeping this number for your records.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Delivery Confirmation</h2>
              <p>
                All shipments require a signature upon delivery. If you're not available to receive your package, the carrier will leave a notice and attempt redelivery. You can also arrange for pickup at a nearby location.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Lost or Damaged Packages</h2>
              <p>
                If your package arrives damaged or is lost in transit, please contact us immediately with photos and your tracking number. We will file a claim with the carrier and either send a replacement or issue a full refund.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Customs and Duties</h2>
              <p>
                For international orders, customers are responsible for any customs duties or taxes that may apply. These charges are determined by your country's customs regulations and are not included in the shipping cost.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Shipping Address</h2>
              <p>
                Please ensure your shipping address is accurate and complete. We are not responsible for packages shipped to incorrect addresses provided by the customer. If you need to change your address, please contact us immediately after placing your order.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Bulk Orders</h2>
              <p>
                For bulk orders (10+ items), please contact our sales team at sales@madembro.com for special shipping rates and arrangements.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p>
                For any questions about shipping, please contact us at shipping@madembro.com or call our customer support team.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
