import Link from 'next/link';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold">Cookie Policy</h1>
          <div className="h-1 w-20 bg-blue-500 rounded-full" />
        </div>
        <p className="text-base-content/70 leading-relaxed">
          ReSell Hub uses cookies and similar technologies to keep you signed in and to improve your experience.
        </p>
        <div className="space-y-3">
          <h2 className="text-xl font-bold">What We Use Cookies For</h2>
          <ul className="list-disc list-inside text-base-content/70 space-y-1">
            <li>Maintaining your authentication session.</li>
            <li>Remembering your preferences and theme.</li>
            <li>Understanding how the site is used to improve it.</li>
          </ul>
        </div>
        <p className="text-base-content/70 leading-relaxed">
          You can control or clear cookies through your browser settings at any time.
        </p>
        <Link href="/" className="btn btn-primary text-white w-fit">Back to Home</Link>
      </div>
    </div>
  );
};

export default CookiePolicy;
