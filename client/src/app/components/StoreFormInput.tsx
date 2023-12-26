import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface StoreFormInputProps extends UseControllerProps {
  label: string;
}

export default function StoreFormInput(props: StoreFormInputProps) {
  const { field, fieldState } = useController({
    ...props,
  });

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={!!fieldState.error?.message}
    />
  );
}
