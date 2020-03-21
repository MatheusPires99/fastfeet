import React from "react";
import { MdCheck, MdChevronLeft } from "react-icons/md";

import { Container } from "./styles";

export default function HeaderForm({ id }) {
  return (
    <Container>
      <h1>{id ? "Edição de Encomendas" : "Cadastro de encomendas"}</h1>

      <div>
        <button type="button">
          <MdChevronLeft />
          Voltar
        </button>

        <button type="submit">
          <MdCheck />
          Salvar
        </button>
      </div>
    </Container>
  );
}
