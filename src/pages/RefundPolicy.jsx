import React from 'react';

const RefundPolicy = () => {
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: 'clamp(20px, 5vw, 40px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 700, color: '#d4af37', marginBottom: '30px' }}>
          Refund Policy
        </h1>

        <div style={{ backgroundColor: '#1a1a1a', padding: 'clamp(20px, 3vw, 40px)', borderRadius: '12px', border: '1px solid #333' }}>
          <div style={{ color: '#ccc', lineHeight: '1.8', fontSize: 'clamp(14px, 2vw, 16px)' }}>
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Return Window</h2>
              <p>
                We offer a 30-day return window from the date of purchase. Items must be unused, unwashed, and in original condition with all tags attached to be eligible for return.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Eligibility for Returns</h2>
              <p>To be eligible for a return, your item must meet the following conditions:</p>
              <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                <li>Item must be returned within 30 days of purchase</li>
                <li>Item must be unused and unwashed</li>
                <li>Item must be in original condition with all tags attached</li>
                <li>Item must include original packaging</li>
                <li>Custom embroidered items cannot be returned unless defective</li>
              </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>How to Initiate a Return</h2>
              <p>To initiate a return, please follow these steps:</p>
              <ol style={{ marginLeft: '20px', marginTop: '10px' }}>
                <li>Contact our customer support team at returns@madembro.com</li>
                <li>Provide your order number and reason for return</li>
                <li>Receive a return authorization number and shipping label</li>
                <li>Ship the item back to us in original packaging</li>
                <li>Once received and inspected, we will process your refund</li>
              </ol>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Refund Processing</h2>
              <p>
                Refunds will be processed within 7-10 business days after we receive and inspect your returned item. The refund will be credited to your original payment method. Please note that it may take an additional 3-5 business days for the refund to appear in your account depending on your bank.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Shipping Costs</h2>
              <p>
                Original shipping costs are non-refundable. If you receive a defective or damaged item, we will provide a prepaid return shipping label. For other returns, customers are responsible for return shipping costs.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Defective or Damaged Items</h2>
              <p>
                If you receive a defective or damaged item, please contact us immediately with photos of the damage. We will provide a replacement or full refund at no cost to you, including return shipping.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Non-Returnable Items</h2>
              <p>The following items cannot be returned:</p>
              <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                <li>Custom embroidered items (unless defective)</li>
                <li>Items that have been worn, washed, or altered</li>
                <li>Items without original tags or packaging</li>
                <li>Items purchased on clearance or final sale</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Contact Us</h2>
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
