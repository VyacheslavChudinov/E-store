import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OTOzPLyhi5imVwxYy2fbVHRkC8R58TeGbr3nln9YI4Pi7jt2mTLY57vffmDNNbCwLcEGcpPsRsvOvs63rmWoBkU00SdcpJ5kG"
);

export default function CheckoutContainer() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
