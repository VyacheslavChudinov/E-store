import { Checkbox, FormControlLabel } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface StoreFormCheckboxProps extends UseControllerProps {
  label: string;
  disabled: boolean;
}

export default function StoreFormCheckbox(props: StoreFormCheckboxProps) {
  const { control, name, label, disabled } = props;
  const { field } = useController({
    control,
    name,
    defaultValue: false,
  });

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          disabled={disabled}
          color="secondary"
          value="yes"
          checked={field.value}
        />
      }
      label={label}
    />
  );
}
