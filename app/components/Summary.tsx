type SummaryProps = {
  amount: number; // ví dụ: 20
  tax?: number;   // ví dụ: 0
};

export default function Summary({ amount, tax = 0 }: SummaryProps) {
  const total = amount + tax;

  return (
    <div className="text-white text-sm w-full max-w-md">
        <p className="mb-5 text-2xl">Neo phone</p>
        <p className="text-3xl mb-20">US ${amount.toFixed(2)}</p>

      {/* Call credits */}
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">Call Credits</p>
          <p className="text-white/60 text-xs">Credits for making calls</p>
        </div>
        <p className="font-medium">US${amount.toFixed(2)}</p>
      </div>

      <hr className="border-white/10 my-6" />

      {/* Subtotal */}
      <div className="flex justify-between">
        <p className="font-medium">Subtotal</p>
        <p className="font-medium">US${amount.toFixed(2)}</p>
      </div>

      {/* Promo */}
      <button className="mt-4 bg-[#5c6b86] hover:bg-[#6b7a96] transition px-4 py-2 rounded-md text-xs font-medium">
        Add promotion code
      </button>

      <hr className="border-white/10 my-6" />

      {/* Tax */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <span>Tax</span>
          <span className="text-white/40 text-xs">ⓘ</span>
        </div>
        <p className="text-white/80">US${tax.toFixed(2)}</p>
      </div>

      <hr className="border-white/10 my-6" />

      {/* Total */}
      <div className="flex justify-between text-base font-semibold">
        <p>Total due</p>
        <p>US${total.toFixed(2)}</p>
      </div>
    </div>
  );
}
