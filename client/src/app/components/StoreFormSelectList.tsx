import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface StoreFormSelectListProps extends UseControllerProps {
  label: string;
  items: string[];
}

export default function StoreFormSelectList(props: StoreFormSelectListProps) {
  const { field, fieldState } = useController({ ...props, defaultValue: "" });

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{props.label}</InputLabel>
      <Select value={field.value} label={props.label} onChange={field.onChange}>
        {props.items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
