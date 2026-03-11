import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: 'clamp(20px, 5vw, 40px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 700, color: '#d4af37', marginBottom: '30px' }}>
          Privacy Policy
        </h1>

        <div style={{ backgroundColor: '#1a1a1a', padding: 'clamp(20px, 3vw, 40px)', borderRadius: '12px', border: '1px solid #333' }}>
          <div style={{ color: '#ccc', lineHeight: '1.8', fontSize: 'clamp(14px, 2vw, 16px)' }}>
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Introduction</h2>
              <p>
                Madembro ("we" or "us" or "our") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website and the choices you have associated with that data.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Information Collection and Use</h2>
              <p>We collect several different types of information for various purposes to provide and improve our service to you.</p>
              <h3 style={{ color: '#d4af37', marginTop: '15px', marginBottom: '10px' }}>Types of Data Collected:</h3>
              <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                <li><strong>Personal Data:</strong> Email address, first name, last name, phone number, address, city, state, postal code, cookies and usage data</li>
                <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, time and date of visit, time spent on pages</li>
                <li><strong>Payment Information:</strong> Credit card details (processed securely through payment gateways)</li>
              </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Use of Data</h2>
              <p>Madembro uses the collected data for various purposes:</p>
              <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                <li>To provide and maintain our website</li>
                <li>To notify you about changes to our website</li>
                <li>To allow you to participate in interactive features of our website</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our website</li>
                <li>To monitor the usage of our website</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@madembro.com
              </p>
            </section>

            <section>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>Your Rights</h2>
              <p>
                You have the right to access, update, or delete the information we have on you. If you would like to exercise this right, please contact us at privacy@madembro.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
