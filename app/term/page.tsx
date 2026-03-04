import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#1a1c1e] text-[#e2e2e2] py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-white">Privacy Policy</h1>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-white">1. Information We Collect</h2>
          <p className="mb-4 text-gray-400">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Account information (email, password)</li>
            <li>Phone numbers and call history</li>
            <li>Payment and billing information</li>
            <li>Usage data and interaction with our services</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-white">2. How We Use Your Information</h2>
          <p className="mb-4 text-gray-400">We use the collected information to:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Provide phone and calling services</li>
            <li>Process payments and maintain billing records</li>
            <li>Improve call quality and service reliability</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
        </section>

        {/* Section 3 (Nên thêm để Google duyệt nhanh hơn) */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-white">3. Data Security</h2>
          <p className="text-gray-400">
            We implement industry-standard security measures to protect your personal information 
            from unauthorized access, disclosure, or destruction.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;