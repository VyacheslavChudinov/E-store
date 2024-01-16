import React, { ReactNode } from "react";

interface SlideWrapperProps {
  currentSlide?: number;
  slideCount?: number;
  children: ReactNode;
}

export default function SliderArrowWrapper({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  currentSlide,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  slideCount,
  children,
  ...props
}: SlideWrapperProps) {
  //   return <div {...props}>{children}</div>;
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...props });
    }
  });
}
