import React from 'react';

const ShippingPolicy = () => {
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: 'clamp(20px, 5vw, 40px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 700, color: '#d4af37', marginBottom: '30px' }}>
          Shipping Policy
        </h1>

        <div style={{ backgroundColor: '#1a1a1a', padding: 'clamp(20px, 3vw, 40px)', borderRadius: '12px', border: '1px solid #333' }}>
          <div style={{ color: '#ccc', lineHeight: '1.8', fontSize: 'clamp(14px, 2vw, 16px)' }}>
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Shipping Methods</h2>
              <p>We offer multiple shipping options to meet your needs:</p>
              <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                <li><strong>Standard Shipping:</strong> 5-7 business days - $10</li>
                <li><strong>Express Shipping:</strong> 2-3 business days - $20</li>
                <li><strong>Overnight Shipping:</strong> Next business day - $35</li>
                <li><strong>Free Shipping:</strong> On orders over $100 (Standard Shipping)</li>
              </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Processing Time</h2>
              <p>
                All orders are processed within 1-2 business days. Processing time does not include weekends or holidays. Once your order is shipped, you will receive a tracking number via email.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Delivery Areas</h2>
              <p>
                We currently ship to all locations within India. International shipping is available to select countries. Please check during checkout to see if we ship to your location.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Tracking Your Order</h2>
              <p>
                Once your order ships, you will receive an email with a tracking number. You can use this number to track your package on the carrier's website. We recommend keeping this number for your records.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Delivery Confirmation</h2>
              <p>
                All shipments require a signature upon delivery. If you're not available to receive your package, the carrier will leave a notice and attempt redelivery. You can also arrange for pickup at a nearby location.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Lost or Damaged Packages</h2>
              <p>
                If your package arrives damaged or is lost in transit, please contact us immediately with photos and your tracking number. We will file a claim with the carrier and either send a replacement or issue a full refund.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Customs and Duties</h2>
              <p>
                For international orders, customers are responsible for any customs duties or taxes that may apply. These charges are determined by your country's customs regulations and are not included in the shipping cost.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Shipping Address</h2>
              <p>
                Please ensure your shipping address is accurate and complete. We are not responsible for packages shipped to incorrect addresses provided by the customer. If you need to change your address, please contact us immediately after placing your order.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Bulk Orders</h2>
              <p>
                For bulk orders (10+ items), please contact our sales team at sales@madembro.com for special shipping rates and arrangements.
              </p>
            </section>

            <section>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Contact Us</h2>
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
