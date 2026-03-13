import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="bg-black min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Refund Policy
        </h1>

        <div className="bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-800 space-y-8">
          <div className="text-gray-300 leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Return Window</h2>
              <p>
                We offer a 30-day return window from the date of purchase. Items must be unused, unwashed, and in original condition with all tags attached to be eligible for return.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Eligibility for Returns</h2>
              <p className="mb-4">To be eligible for a return, your item must meet the following conditions:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Item must be returned within 30 days of purchase</li>
                <li>Item must be unused and unwashed</li>
                <li>Item must be in original condition with all tags attached</li>
                <li>Item must include original packaging</li>
                <li>Custom embroidered items cannot be returned unless defective</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">How to Initiate a Return</h2>
              <p className="mb-4">To initiate a return, please follow these steps:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Contact our customer support team at returns@madembro.com</li>
                <li>Provide your order number and reason for return</li>
                <li>Receive a return authorization number and shipping label</li>
                <li>Ship the item back to us in original packaging</li>
                <li>Once received and inspected, we will process your refund</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Refund Processing</h2>
              <p>
                Refunds will be processed within 7-10 business days after we receive and inspect your returned item. The refund will be credited to your original payment method. Please note that it may take an additional 3-5 business days for the refund to appear in your account depending on your bank.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Shipping Costs</h2>
              <p>
                Original shipping costs are non-refundable. If you receive a defective or damaged item, we will provide a prepaid return shipping label. For other returns, customers are responsible for return shipping costs.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Defective or Damaged Items</h2>
              <p>
                If you receive a defective or damaged item, please contact us immediately with photos of the damage. We will provide a replacement or full refund at no cost to you, including return shipping.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Non-Returnable Items</h2>
              <p className="mb-4">The following items cannot be returned:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Custom embroidered items (unless defective)</li>
                <li>Items that have been worn, washed, or altered</li>
                <li>Items without original tags or packaging</li>
                <li>Items purchased on clearance or final sale</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p>
                For any questions about our refund policy, please contact us at returns@madembro.com or call our customer support team.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
