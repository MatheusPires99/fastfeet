import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { toast } from "react-toastify";

import api from "~/services/api";
import history from "~/services/history";

import AvatarInput from "./AvatarInput";

import { FormContainer, FormLoading, Input } from "~/components/Form";
import { HeaderForm } from "~/components/ActionHeader";

const schema = Yup.object().shape({
  avatar_id: Yup.number().required("A foto do entregador é obrigatória"),
  name: Yup.string().required("O nome do entregador é obrigatório"),
  email: Yup.string()
    .email()
    .required("O e-mail do entregador é obrigatório")
});

export default function DeliverymanForm({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(false);
  const [deliveryman, setDeliveryman] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line no-inner-declarations
      async function loadOrderDetails() {
        try {
          setLoading(true);

          const response = await api.get(`deliverymans/${id}`);

          setDeliveryman(response.data);

          setLoading(false);
        } catch (err) {
          setLoading(false);
          toast.error("Falha ao carregar dados");
        }
      }
      loadOrderDetails();
    }
  }, [id]);

  async function handleSubmit({ avatar_id, name, email }) {
    try {
      setButtonLoading(true);

      const data = { avatar_id, name, email };

      if (id) {
        await api.put(`/deliverymans/${id}`, data);
      }

      if (!id) {
        await api.post("/deliverymans", data);
      }

      setButtonLoading(false);

      toast.success("Entregador salvo com sucesso");
      history.push("/deliverymans");
    } catch (err) {
      setButtonLoading(false);
      toast.error("Algo deu errado ao salvar o entregador");
    }
  }

  return (
    <>
      {loading ? (
        <FormLoading />
      ) : (
        <FormContainer
          initialData={deliveryman}
          onSubmit={handleSubmit}
          schema={schema}
        >
          <HeaderForm
            id={id}
            prevPage="/deliverymans"
            title="entregadores"
            loading={buttonLoading}
          />

          <section>
            <AvatarInput name="avatar_id" />

            <Input name="name" label="Nome" placeholder="John Doe" />
            <br />
            <Input
              name="email"
              label="Email"
              placeholder="exemple@rocketseat.com"
            />
          </section>
        </FormContainer>
      )}
    </>
  );
}

DeliverymanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired
};
