import React from "react";
import { ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

import { Container, Text } from "./styles";

export default function Button({ children, background, loading, ...rest }) {
  return (
    <Container {...rest} background={background}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};
