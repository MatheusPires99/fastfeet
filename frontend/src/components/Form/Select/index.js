import React from "react";
import Select from "react-select";

export default function SelectComponent({
  name,
  options,
  onChange,
  defaultValue
}) {
  return (
    <Select
      name={name}
      options={options}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
}
