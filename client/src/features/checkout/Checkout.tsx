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
import { StripeElementType } from "@stripe/stripe-js";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const steps = ["Shipping address", "Review your order", "Payment details"];

interface CardComplete {
  cardNumber: boolean;
  cardExpiry: boolean;
  cardCvc: boolean;
}

interface CardState {
  elementError: { [key in StripeElementType]?: string };
}

interface StripeInputEvent {
  complete: boolean;
  error: { message: string };
  elementType: string;
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const [orderNumber, setOrderNumber] = useState(0);
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
  const stripe = useStripe();
  const elements = useElements();

  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(currentValidationSchema),
  });

  const isValidPayment =
    activeStep !== steps.length - 1 ||
    (cardComplete.cardNumber &&
      cardComplete.cardExpiry &&
      cardComplete.cardCvc);

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

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <Review />;
      case 2:
        return (
          <PaymentForm
            onCardInputChange={onCardInputChange}
            cardState={cardState}
          />
        );
      default:
        throw new Error("Unknown step");
    }
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
        const createOderdId = await agent.Orders.createOrder({
          saveAddress,
          shippingAddress: shippingAddress as ShippingAddress,
        });
        setOrderNumber(createOderdId);
        setPaymentSucceeded(true);
        setPaymentMessage("Payment has been received.");
        setActiveStep((prev) => prev + 1);
        dispatch(clearBasket());
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

  const handleNext = async (data: FieldValues) => {
    if (activeStep == steps.length - 1) {
      await submitOrder(data);
    } else {
      setActiveStep(activeStep + 1);
    }
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
        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                {paymentMessage}
              </Typography>
              {paymentSucceeded && (
                <Typography variant="subtitle1">
                  Your order number is {orderNumber}. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              )}

              {!paymentSucceeded && (
                <Button variant="contained" onClick={handleBack}>
                  Go back and try again
                </Button>
              )}
            </>
          ) : (
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <LoadingButton
                  loading={isLoading}
                  disabled={!methods.formState.isValid || !isValidPayment}
                  variant="contained"
                  type="submit"
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </LoadingButton>
              </Box>
            </form>
          )}
        </>
      </Paper>
    </FormProvider>
  );
}
