import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface StoreFormTextInputProps extends UseControllerProps {
  label: string;
  rows?: number;
  multiline?: boolean;
}

export default function StoreFormTextInput(props: StoreFormTextInputProps) {
  const { field, fieldState } = useController({
    ...props,
    defaultValue: "",
  });

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
}
