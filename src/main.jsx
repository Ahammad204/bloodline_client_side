import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";
import { router } from "./Routes/Router";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Provider/AuthProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);



AOS.init({
  duration: 800,
  once: true,
});

const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <div className="max-w-screen-xl p-2 md:p-0 mx-auto">
          <RouterProvider router={router} />
          <Toaster></Toaster>
        </div>
      </Elements>
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
