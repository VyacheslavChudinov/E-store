import { StripeElementType } from "@stripe/stripe-js";

export interface CardComplete {
  cardNumber: boolean;
  cardExpiry: boolean;
  cardCvc: boolean;
}

export interface CardState {
  elementError: { [key in StripeElementType]?: string };
}

export interface StripeInputEvent {
  complete: boolean;
  error: { message: string };
  elementType: string;
}
