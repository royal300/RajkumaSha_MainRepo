import { useState } from "react";
import { Copy, CheckCircle2, QrCode } from "lucide-react";

const Payment = () => {
  const [copied, setCopied] = useState(false);

  const upiId = "advrajkumarsha@upi"; // TODO: replace with real UPI ID if available

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // ignore
    }
  };

  return (
    <main className="min-h-screen bg-navy text-white pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-playfair text-golden text-center mb-10">
          Make a Payment
        </h1>

        {/* QR Section */}
        <section className="bg-navy-dark/60 border border-golden/20 rounded-xl p-6 sm:p-10 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm aspect-square bg-black/20 rounded-lg border border-golden/30 flex items-center justify-center">
            {/* Image placeholder for QR */}
            <QrCode className="w-24 h-24 text-golden" />
          </div>
          <p className="text-gray-300 text-sm mt-4 text-center">
            Scan the QR with your UPI app to pay securely
          </p>
        </section>

        {/* UPI ID Section */}
        <section className="mt-10 bg-navy-dark/60 border border-golden/20 rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide">UPI ID</p>
              <p className="text-lg sm:text-xl font-medium text-white mt-1 break-all">{upiId}</p>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-golden px-5 py-2.5 text-navy font-semibold shadow hover:bg-amber-400 transition-colors"
              aria-label="Copy UPI ID"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" /> Copy UPI ID
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Payment;


