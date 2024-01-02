import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";
import Loading from "../../app/layouts/Loading";

const stripePromise = loadStripe(
  "pk_test_51OTOzPLyhi5imVwxYy2fbVHRkC8R58TeGbr3nln9YI4Pi7jt2mTLY57vffmDNNbCwLcEGcpPsRsvOvs63rmWoBkU00SdcpJ5kG"
);

export default function CheckoutContainer() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    agent.Payments.createPaymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <Loading message="Loading checkout..."></Loading>;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
