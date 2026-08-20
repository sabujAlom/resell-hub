import Link from 'next/link';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold">Terms of Service</h1>
          <div className="h-1 w-20 bg-blue-500 rounded-full" />
        </div>
        <p className="text-base-content/70 leading-relaxed">
          By accessing or using ReSell Hub, you agree to the following terms. Please read them carefully.
        </p>
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Marketplace Conduct</h2>
          <ul className="list-disc list-inside text-base-content/70 space-y-1">
            <li>List only items you own and are authorized to sell.</li>
            <li>Provide accurate descriptions and images for your listings.</li>
            <li>Do not post prohibited, illegal, or misleading content.</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Transactions</h2>
          <ul className="list-disc list-inside text-base-content/70 space-y-1">
            <li>All payments are processed securely through our payment provider.</li>
            <li>Buyers and sellers are responsible for their own arrangements.</li>
            <li>We reserve the right to suspend accounts that violate these terms.</li>
          </ul>
        </div>
        <Link href="/" className="btn btn-primary text-white w-fit">Back to Home</Link>
      </div>
    </div>
  );
};

export default TermsOfService;
