import { Checkbox, FormControlLabel } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface StoreFormCheckboxProps extends UseControllerProps {
  label: string;
}

export default function StoreFormCheckbox(props: StoreFormCheckboxProps) {
  const { field } = useController({
    ...props,
    defaultValue: false,
  });

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          color="secondary"
          value="yes"
          checked={field.value}
        />
      }
      label={props.label}
    />
  );
}
