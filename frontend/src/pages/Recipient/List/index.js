import React from "react";

import { HeaderList } from "~/components/ActionHeader";
import { TableContainer } from "~/components/Table";
import Action from "./Action";

export default function RecipientList() {
  return (
    <>
      <HeaderList lowercaseTitle="destinatários" page="recipient/new" visible />
      <TableContainer>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#01</td>
            <td>Matheus Pires</td>
            <td>
              Rua das Palmeiras, 125, Jardim Castelo Branco - Minas Gerais
            </td>
            <Action />
          </tr>
        </tbody>
      </TableContainer>
    </>
  );
}
