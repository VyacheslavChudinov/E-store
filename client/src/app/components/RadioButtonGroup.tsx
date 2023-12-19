import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface RadioButtonGroupProps {
  sortOptions: { label: string; value: string }[];
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function RadioButtonGroup(props: RadioButtonGroupProps) {
  const { sortOptions, selectedValue, onChange } = props;

  return (
    <FormControl component={"fieldset"}>
      <RadioGroup onChange={onChange} value={selectedValue}>
        {sortOptions.map((sortOption) => (
          <FormControlLabel
            value={sortOption.value}
            control={<Radio />}
            label={sortOption.label}
            key={sortOption.value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButtonGroup;
