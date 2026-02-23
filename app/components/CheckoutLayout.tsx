import StripeForm from "./PaymentElement";

export default function CheckoutLayout() {
  return (
    <div className="min-h-screen flex">
      {/* LEFT SUMMARY */}
      <div className="w-1/2 bg-[#3f4f6b] text-white p-16">
        <h2 className="text-2xl mb-6">Pay Yadaphone</h2>
        <h1 className="text-4xl font-bold mb-10">US$20.00</h1>

        <div className="space-y-6 text-sm">
          <Row label="Call Credits" value="US$20.00" />
          <Row label="Subtotal" value="US$20.00" />
          <button className="bg-[#56657f] px-4 py-2 rounded-md">
            Add promotion code
          </button>
          <Row label="Tax" value="US$0.00" />
          <Row label="Total due" value="US$20.00" bold />
        </div>
      </div>

      {/* RIGHT PAYMENT */}
      <div className="w-1/2 bg-white p-16">
        <h3 className="text-xl font-semibold mb-6">Contact information</h3>

        <input
          className="w-full border rounded-lg p-3 mb-8"
          defaultValue="email@gmail.com"
        />

        <h3 className="text-xl font-semibold mb-4">Payment method</h3>

        <StripeForm />

        <p className="text-xs text-gray-400 mt-6">
          Powered by Stripe · Terms · Privacy
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className={bold ? 'font-bold' : ''}>{label}</span>
      <span className={bold ? 'font-bold' : ''}>{value}</span>
    </div>
  );
}
