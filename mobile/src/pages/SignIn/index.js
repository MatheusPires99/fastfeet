import React, { useState } from "react";
import { Image } from "react-native";

import logo from "~/assets/logo.png";

import { Container, Form, FormInput, SubmitButton } from "./styles";

export default function SignIn() {
  const [id, setId] = useState("");

  function handleSubmit() {}

  return (
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          keyboardType="numeric"
          autoCorrect={false}
          placeholder="Informe seu ID de cadastro"
          returnKeyType="next"
          onSubmitEditing={handleSubmit}
          value={id}
          onChangeText={setId}
        />

        <SubmitButton background="#82BF18" onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
