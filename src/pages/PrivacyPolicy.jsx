import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-black min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Privacy Policy
        </h1>

        <div className="bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-800 space-y-8">
          <div className="text-gray-300 leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Introduction</h2>
              <p>
                Madembro ("we" or "us" or "our") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website and the choices you have associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Information Collection and Use</h2>
              <p className="mb-4">We collect several different types of information for various purposes to provide and improve our service to you.</p>
              <h3 className="text-lg font-bold text-white mb-3">Types of Data Collected:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Personal Data:</strong> Email address, first name, last name, phone number, address, city, state, postal code, cookies and usage data</li>
                <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, time and date of visit, time spent on pages</li>
                <li><strong>Payment Information:</strong> Credit card details (processed securely through payment gateways)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Use of Data</h2>
              <p className="mb-4">Madembro uses the collected data for various purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To provide and maintain our website</li>
                <li>To notify you about changes to our website</li>
                <li>To allow you to participate in interactive features of our website</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our website</li>
                <li>To monitor the usage of our website</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@madembro.com
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Your Rights</h2>
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
