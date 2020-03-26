import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";

import api from "~/services/api";

import { HeaderList } from "~/components/ActionHeader";
import { TableContainer, TableDetails, TableLoading } from "~/components/Table";
import Action from "./Action";
import Pagination from "~/components/Pagination";

import { Status } from "./styles";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [search, setSearch] = useState("");
  const [totalOrders, setTotalOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const getFormattedStatus = order => {
    let status = {};

    if (order.canceled_at) {
      status = { text: "CANCELADA", background: "#FAB0B0", color: "#DE3B3B" };
      return status;
    }

    if (order.end_date) {
      status = { text: "ENTREGUE", background: "#DFF0DF", color: "#2CA42B" };
      return status;
    }

    if (order.start_date) {
      status = { text: "RETIRADA", background: "#BAD2FF", color: "#4D85EE" };
      return status;
    }

    status = { text: "PENDENTE", background: "#F0F0DF", color: "#C1BC35" };

    return status;
  };

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await api.get("/orders", {
          params: {
            page: currentPage,
            name: search
          }
        });

        const data = response.data.docs.map(order => {
          return {
            ...order,
            formattedStatus: getFormattedStatus(order),
            street_number: `${order.recipient.street}, ${order.recipient.number}`,
            city_state: `${order.recipient.city} - ${order.recipient.state}`,
            start_date_formatted: order.start_date
              ? format(parseISO(order.start_date), "dd/MM/yyyy")
              : null,
            end_date_formatted: order.end_date
              ? format(parseISO(order.end_date), "dd/MM/yyyy")
              : null
          };
        });

        if (!response.data) {
          toast.warn("Nenhuma encomenda cadastrada");
        }

        setPages(response.data.pages);
        setTotalOrders(response.data.total);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error("Não foi possível carregar as informações das encomendas");
      }
    }

    loadOrders();
  }, [currentPage, search]);

  function handlePage(page) {
    if (page === 0) {
      setCurrentPage(1);
    } else if (page > pages) {
      setCurrentPage(pages);
    } else {
      setCurrentPage(page);
    }
  }

  function handleVisible() {
    setVisible(!visible);
  }

  function handleDetails(order) {
    setOrderDetail(order);
    handleVisible();
  }

  return (
    <>
      <HeaderList
        lowercaseTitle="encomendas"
        page="order/new"
        visible
        search={search}
        setSearch={setSearch}
      />

      {loading ? (
        <TableLoading />
      ) : (
        <>
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
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.recipient.name}</td>
                  <td>
                    <div>
                      <img
                        src={
                          order.deliveryman.avatar.url ||
                          "https://api.adorable.io/avatars/40/abott@adorable.pngC"
                        }
                        alt="Avatar"
                      />
                      {order.deliveryman.name}
                    </div>
                  </td>
                  <td>{order.recipient.city}</td>
                  <td>{order.recipient.state}</td>
                  <Status status={order.formattedStatus}>
                    <span>{order.formattedStatus.text}</span>
                  </Status>
                  <Action
                    page={`order/edit/${order.id}`}
                    handleDetails={handleDetails}
                    id={order.id}
                    order={orderDetail}
                  />
                </tr>
              ))}
            </tbody>
          </TableContainer>

          <TableDetails
            visible={visible}
            order={orderDetail}
            handleVisible={handleVisible}
          />

          <Pagination
            currentPage={currentPage}
            pages={pages}
            totalDocs={totalOrders}
            handlePage={handlePage}
          />
        </>
      )}
    </>
  );
}
