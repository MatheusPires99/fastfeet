import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";

import api from "~/services/api";

import { HeaderList } from "~/components/ActionHeader";
import { TableContainer, TableDetails, TableLoading } from "~/components/Table";
import Action from "./Action";
import Pagination from "~/components/Pagination";

import { ModalTags } from "./styles";

export default function OrderList() {
  Modal.setAppElement("#root");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [search, setSearch] = useState("");
  const [totalOrders, setTotalOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  const customStyles = {
    overlay: {
      zIndex: 2
    }
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

        if (!response.data) {
          toast.warn("Nenhuma encomenda cadastrada");
        }

        setPages(response.data.pages);
        setTotalOrders(response.data.total);
        setOrders(response.data.docs);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error("Não foi possível carregar as informações das encomendas");
      }
    }

    loadOrders();
  }, [currentPage, search]);

  function handleToggleOpenModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function handlePage(page) {
    if (page === 0) {
      setCurrentPage(1);
    } else if (page > pages) {
      setCurrentPage(pages);
    } else {
      setCurrentPage(page);
    }
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
                      <img src={order.deliveryman.url} alt="Avatar" />
                      {order.deliveryman.name}
                    </div>
                  </td>
                  <td>{order.recipient.city}</td>
                  <td>{order.recipient.state}</td>
                  <td>Status</td>
                  <Action
                    page={`order/edit/${order.id}`}
                    handleToggleOpenModal={handleToggleOpenModal}
                  />
                  <TableDetails
                    isOpen={modalIsOpen}
                    onRequestClose={handleToggleOpenModal}
                    style={customStyles}
                  >
                    <ModalTags>
                      <div>
                        <strong>Informações da encomenda</strong>
                        <span>
                          {order.recipient.street}, {order.recipient.number}
                        </span>
                        <span>
                          {order.recipient.city} - {order.recipient.state}
                        </span>
                        <span>{order.recipient.zip_code}</span>
                      </div>
                      <div>
                        <strong>Datas</strong>
                        <span>
                          Retirada:{" "}
                          {order.start_date ? order.start_date : "Não retirado"}
                        </span>
                        <span>
                          Entrega:{" "}
                          {order.end_date ? order.end_date : "Não entregue"}
                        </span>
                      </div>
                      <div>
                        <strong>Assinatura do destinatário</strong>
                      </div>
                    </ModalTags>
                  </TableDetails>
                </tr>
              ))}
            </tbody>
          </TableContainer>

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
