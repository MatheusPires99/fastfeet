import React from "react";
import PropTypes from "prop-types";

import { Container } from "./styles";

export default function ClearBackground({ visible }) {
  return <Container visible={visible} />;
}

ClearBackground.propTypes = {
  visible: PropTypes.bool.isRequired
};
