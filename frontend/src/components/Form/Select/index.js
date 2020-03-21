import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

import { Container } from "./styles";

export default function SelectComponent({
  label,
  placeholder,
  name,
  options,
  onChange,
  defaultValue
}) {
  return (
    <Container>
      <label>{label}</label>
      <Select
        name={name}
        options={options}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#7d40e7"
          }
        })}
      />
    </Container>
  );
}

SelectComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.array]).isRequired
};
