import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";

import api from "~/services/api";

import { HeaderList } from "~/components/ActionHeader";
import { TableContainer, TableDetails, TableLoading } from "~/components/Table";
import Action from "./Action";
import Pagination from "~/components/Pagination";

import { ModalTags } from "./styles";

export default function ProblemList() {
  Modal.setAppElement("#root");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [totalProblems, setTotalProblems] = useState(null);
  const [loading, setLoading] = useState(true);

  const customStyles = {
    overlay: {
      zIndex: 2
    }
  };

  useEffect(() => {
    async function loadProblems() {
      try {
        const response = await api.get("/delivery/problems", {
          params: {
            page: currentPage
          }
        });

        if (!response.data) {
          toast.warn("Nenhum problema cadastrada");
        }

        setPages(response.data.pages);
        setTotalProblems(response.data.total);
        setProblems(response.data.docs);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error("Não foi possível carregar as informações dos problemas");
      }
    }

    loadProblems();
  }, [currentPage]);

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
        lowercaseTitle="problemas"
        page="problem/new"
        visible={false}
      />

      {loading ? (
        <TableLoading />
      ) : (
        <>
          <TableContainer>
            <thead>
              <tr>
                <th>ID</th>
                <th>ID da encomenda</th>
                <th>Problema</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {problems.map(problem => (
                <tr key={problem.id}>
                  <td>#{problem.id}</td>
                  <td>#{problem.order.id}</td>
                  <td>{problem.description}</td>
                  <Action
                    handleToggleOpenModal={handleToggleOpenModal}
                    id={problem.id}
                  />
                  <TableDetails
                    isOpen={modalIsOpen}
                    onRequestClose={handleToggleOpenModal}
                    style={customStyles}
                  >
                    <ModalTags>
                      <div>
                        <strong>VISUALIZAR PROBLEMA</strong>
                        <p>{problem.description}</p>
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
            totalDocs={totalProblems}
            handlePage={handlePage}
          />
        </>
      )}
    </>
  );
}
