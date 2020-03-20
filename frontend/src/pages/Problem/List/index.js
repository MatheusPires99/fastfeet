import React from "react";

import { HeaderList } from "~/components/ActionHeader";
import { TableContainer } from "~/components/Table";
import Action from "./Action";

export default function RecipientList() {
  return (
    <>
      <HeaderList
        lowercaseTitle="problemas na entrega"
        page="recipient/new"
        visible={false}
      />
      <TableContainer>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#01</td>
            <td>Carga roubada</td>
            <Action />
          </tr>
        </tbody>
      </TableContainer>
    </>
  );
}
