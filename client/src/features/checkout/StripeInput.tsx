/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputBaseComponentProps } from "@mui/material";
import { Ref, forwardRef, useImperativeHandle, useRef } from "react";

interface StripeInputProps extends InputBaseComponentProps {}

export const StripeInput = forwardRef(function StripeInput(
  { component: Component, ...props }: StripeInputProps,
  ref: Ref<unknown>
) {
  const elementRef = useRef<any>();

  useImperativeHandle(ref, () => ({
    focus: () => elementRef.current.focus,
  }));

  return (
    <Component
      onReady={(element: any) => (elementRef.current = element)}
      {...props}
    ></Component>
  );
});
