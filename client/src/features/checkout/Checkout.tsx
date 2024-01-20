import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./CheckoutValidation";
import agent from "../../app/api/agent";
import { ShippingAddress } from "../../app/models/order";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { clearBasket } from "../basket/basketSlice";
import { LoadingButton } from "@mui/lab";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CardState, CardComplete, StripeInputEvent } from "./checkoutTypes";
import { useNavigate } from "react-router-dom";

const steps = ["Shipping address", "Review your order", "Payment details"];

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const [cardState, setCardState] = useState<CardState>({ elementError: {} });
  const [cardComplete, setCardComplete] = useState<CardComplete>({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const { basket } = useAppSelector((state) => state.basket);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const currentValidationSchema = validationSchema[activeStep];
  const methods = useForm({
    mode: "all",
    resolver: yupResolver(currentValidationSchema),
  });

  const isValidPayment =
    cardComplete.cardNumber && cardComplete.cardExpiry && cardComplete.cardCvc;

  function onCardInputChange(
    event: ChangeEvent<HTMLInputElement> & StripeInputEvent
  ) {
    const elementType = event.elementType;
    const errorMessage = event.error?.message;
    const isComplete = event.complete;

    setCardState((prev: CardState) => ({
      ...prev,
      elementError: { ...prev.elementError, [elementType]: errorMessage },
    }));

    setCardComplete((prev) => ({ ...prev, [elementType]: isComplete }));
  }

  const submitOrder = async (data: FieldValues) => {
    const { cardName, saveAddress, ...shippingAddress } = data;
    if (!stripe || !elements || !basket?.clientSecret) {
      return;
    }

    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardNumberElement);
      const paymentResults = await stripe.confirmCardPayment(
        basket?.clientSecret,
        {
          payment_method: {
            card: cardElement!,
            billing_details: {
              name: cardName,
            },
          },
        }
      );

      if (paymentResults.paymentIntent?.status === "succeeded") {
        const orderId = await agent.Orders.createOrder({
          saveAddress,
          shippingAddress: shippingAddress as ShippingAddress,
        });
        setPaymentSucceeded(true);
        setActiveStep((prev) => prev + 1);
        dispatch(clearBasket());
        navigate("/order-confirmation", {
          state: { orderId },
        });
      } else {
        setPaymentSucceeded(false);
        setPaymentMessage(paymentResults.error?.message ?? "");
        setActiveStep((prev) => prev + 1);
      }

      console.log(paymentResults);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    agent.Orders.getSavedAddress().then((response) => {
      if (response) {
        methods.reset({
          ...methods.getValues(),
          ...response,
          saveAddress: false,
        });
      }
    });
  }, [methods]);

  return (
    <FormProvider {...methods}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length && !paymentSucceeded && (
          <>
            <Typography variant="h5" gutterBottom>
              {paymentMessage}
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: "20px" }}
              onClick={handleBack}
            >
              Go back and try again
            </Button>
          </>
        )}

        <form onSubmit={methods.handleSubmit(submitOrder)}>
          <div style={activeStep !== 0 ? { display: "none" } : {}}>
            <AddressForm />
          </div>
          <div style={activeStep !== 1 ? { display: "none" } : {}}>
            <Review />
          </div>
          <div style={activeStep !== 2 ? { display: "none" } : {}}>
            <PaymentForm
              onCardInputChange={onCardInputChange}
              cardState={cardState}
            />
          </div>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
            )}

            {activeStep !== steps.length - 1 && (
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                disabled={!methods.formState.isValid}
                onClick={handleNext}
              >
                Next
              </Button>
            )}

            {activeStep === steps.length - 1 && (
              <LoadingButton
                loading={isLoading}
                disabled={!methods.formState.isValid || !isValidPayment}
                variant="contained"
                type="submit"
                sx={{ mt: 3, ml: 1 }}
              >
                Place order
              </LoadingButton>
            )}
          </Box>
        </form>
      </Paper>
    </FormProvider>
  );
}
