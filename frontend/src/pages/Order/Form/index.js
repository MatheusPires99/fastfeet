import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import api from "~/services/api";

import { FormContainer, FormLoading, Input, Select } from "~/components/Form";
import { HeaderForm } from "~/components/ActionHeader";

import { SelectContainer } from "./styles";

export default function OrderForm({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line no-inner-declarations
      async function loadOrderDetails() {
        try {
          setLoading(true);

          const response = await api.get(`/orders/${id}`);

          setOrder(response.data);

          setLoading(false);
        } catch (err) {
          toast.error("Falha ao carregar dados");
        }
      }

      loadOrderDetails();
    }
  }, [id]);

  return (
    <>
      {loading ? (
        <FormLoading />
      ) : (
        <FormContainer initialData={order}>
          <HeaderForm id={id} prevPage="/orders" title="encomendas" />

          <section>
            <SelectContainer>
              <Select
                name="recipient.name"
                label="Destinatário"
                placeholder="Ludwig van Beethoven"
              />
              <Select
                name="deliveryman.name"
                label="Entregador"
                placeholder="John Doe"
              />
            </SelectContainer>

            <Input
              name="product"
              label="Nome do produto"
              placeholder="Yamaha SX7"
            />
          </section>
        </FormContainer>
      )}
    </>
  );
}

OrderForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired
};
