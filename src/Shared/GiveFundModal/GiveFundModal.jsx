import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../utils/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/UseAuth";


const GiveFundModal = ({ onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFund = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: parseFloat(amount),
      });

      const clientSecret = data.clientSecret;
      const card = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.name,
            email: user?.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const fundData = {
          name: user?.name,
          email: user?.email,
          amount: parseFloat(amount),
          date: new Date().toISOString(),
        };
        await axiosSecure.post("/funds", fundData);
        toast.success("Fund successful!");
        onClose();
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#f5c0c06c] bg-opacity-30 flex justify-center items-center z-50">
      <form
        onSubmit={handleFund}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold text-[#D7263D] mb-4">Give Fund</h2>
        <input
          type="number"
          placeholder="Amount in USD"
          className="input input-bordered w-full mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <CardElement className="p-2 border rounded-md mb-4" />
        <button className="btn btn-primary gradient-red w-full" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default GiveFundModal;
