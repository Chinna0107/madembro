import React from 'react';

const TermsAndConditions = () => {
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: 'clamp(20px, 5vw, 40px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 700, color: '#d4af37', marginBottom: '30px' }}>
          Terms & Conditions
        </h1>

        <div style={{ backgroundColor: '#1a1a1a', padding: 'clamp(20px, 3vw, 40px)', borderRadius: '12px', border: '1px solid #333' }}>
          <div style={{ color: '#ccc', lineHeight: '1.8', fontSize: 'clamp(14px, 2vw, 16px)' }}>
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>1. Agreement to Terms</h2>
              <p>
                By accessing and using the Madembro website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on Madembro's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>3. Disclaimer</h2>
              <p>
                The materials on Madembro's website are provided on an 'as is' basis. Madembro makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>4. Limitations</h2>
              <p>
                In no event shall Madembro or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Madembro's website.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>5. Accuracy of Materials</h2>
              <p>
                The materials appearing on Madembro's website could include technical, typographical, or photographic errors. Madembro does not warrant that any of the materials on its website are accurate, complete, or current. Madembro may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>6. Links</h2>
              <p>
                Madembro has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Madembro of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>7. Modifications</h2>
              <p>
                Madembro may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '15px' }}>9. Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at support@madembro.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
