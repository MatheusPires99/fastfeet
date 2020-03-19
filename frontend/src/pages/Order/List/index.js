import React from "react";

import { HeaderList } from "~/components/ActionHeader";
import { TableContainer, TableAction } from "~/components/Table";

// import { Container } from './styles';

export default function OrderList() {
  return (
    <>
      <HeaderList lowercaseTitle="encomendas" page="order/new" />
      <TableContainer>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#01</td>
            <td>Matheus Pires</td>
            <td>
              <div>
                <img
                  src="https://api.adorable.io/avatars/40/abott@adorable.pngC"
                  alt="Avatar"
                />
                Paulo Henrique
              </div>
            </td>
            <td>Divinópolis</td>
            <td>Estado</td>
            <td>Status</td>
            <TableAction />
          </tr>
          <tr>
            <td>#01</td>
            <td>Matheus Pires</td>
            <td>
              <div>
                <img
                  src="https://api.adorable.io/avatars/40/abott@adorable.pngC"
                  alt="Avatar"
                />
                Paulo Henrique
              </div>
            </td>
            <td>Divinópolis</td>
            <td>Estado</td>
            <td>Status</td>
            <TableAction />
          </tr>
        </tbody>
      </TableContainer>
    </>
  );
}
