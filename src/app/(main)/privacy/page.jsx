import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold">Privacy Policy</h1>
          <div className="h-1 w-20 bg-blue-500 rounded-full" />
        </div>
        <p className="text-base-content/70 leading-relaxed">
          At ReSell Hub, we respect your privacy and are committed to protecting your personal data. This policy explains what information we collect and how we use it.
        </p>
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Information We Collect</h2>
          <ul className="list-disc list-inside text-base-content/70 space-y-1">
            <li>Account details such as name, email, phone, and location.</li>
            <li>Product listings, orders, and transaction records.</li>
            <li>Usage data such as pages visited and preferences.</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold">How We Use Information</h2>
          <ul className="list-disc list-inside text-base-content/70 space-y-1">
            <li>To provide, maintain, and improve our marketplace.</li>
            <li>To process orders and communicate with you about them.</li>
            <li>To keep the platform safe and prevent fraud.</li>
          </ul>
        </div>
        <p className="text-base-content/70 leading-relaxed">
          We never sell your personal data to third parties. You may request access to or deletion of your data at any time.
        </p>
        <Link href="/" className="btn btn-primary text-white w-fit">Back to Home</Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
