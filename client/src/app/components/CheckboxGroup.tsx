import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";

interface CheckboxGroupProps {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

function CheckboxGroup(props: CheckboxGroupProps) {
  const { items, checked, onChange } = props;
  const [checkedItems, setCheckedItems] = useState<string[]>(checked || []);

  function handleChange(value: string) {
    const itemFound = checkedItems.find((i) => i === value);
    let newItems: string[] = [];

    if (itemFound) {
      newItems = checkedItems.filter((i) => i !== value);
    } else {
      newItems = [...checkedItems, value];
    }

    setCheckedItems(newItems);
    onChange(newItems);
  }

  return (
    <FormGroup>
      {items?.map((value: string) => (
        <FormControlLabel
          control={<Checkbox onChange={() => handleChange(value)} />}
          label={value}
          key={value}
          checked={!!checkedItems.find((i) => i == value)}
        />
      ))}
    </FormGroup>
  );
}

export default CheckboxGroup;
