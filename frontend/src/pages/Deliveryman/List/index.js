import React from "react";

import { HeaderList } from "~/components/ActionHeader";
import { TableContainer } from "~/components/Table";
import Action from "./Action";

export default function OrderList() {
  return (
    <>
      <HeaderList
        lowercaseTitle="entregadores"
        page="deliveryman/new"
        visible
      />
      <TableContainer>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#01</td>
            <td>
              <div>
                <img
                  src="https://api.adorable.io/avatars/40/abott@adorable.pngC"
                  alt="Avatar"
                />
                Paulo Henrique
              </div>
            </td>
            <td>Matheus Pires</td>
            <td>matheushenriquepires99@gmail.com</td>
            <Action />
          </tr>
          <tr>
            <td>#01</td>
            <td>
              <div>
                <img
                  src="https://api.adorable.io/avatars/40/abott@adorable.pngC"
                  alt="Avatar"
                />
                Paulo Henrique
              </div>
            </td>
            <td>Matheus Pires</td>
            <td>matheushenriquepires99@gmail.com</td>
            <Action />
          </tr>
        </tbody>
      </TableContainer>
    </>
  );
}
