import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { toast } from "react-toastify";

import api from "~/services/api";
import history from "~/services/history";

import {
  FormContainer,
  FormLoading,
  Input,
  InputMask
} from "~/components/Form";
import { HeaderForm } from "~/components/ActionHeader";

import { InputContainer1, InputContainer2 } from "./styles";

export default function RecipientForm({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line no-inner-declarations
      async function loadRecipientDetails() {
        try {
          setLoading(true);

          const response = await api.get(`recipients/${id}`);

          setRecipient(response.data);

          setLoading(false);
        } catch (err) {
          setLoading(false);
          toast.error("Falha ao carregar dados");
        }
      }
      loadRecipientDetails();
    }
  }, [id]);

  async function handleSubmit(data) {
    try {
      setButtonLoading(true);

      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("O nome do destinatário é obrigatório"),
        street: Yup.string().required("A rua do destinatário é obrigatório"),
        number: Yup.string().required("O número do destinatário é obrigatório"),
        complement: Yup.string(),
        city: Yup.string().required("A cidade do destinatário é obrigatório"),
        state: Yup.string().required("O estado do destinatário é obrigatório"),
        cep: Yup.string()
          .min(9, "O CEP deve ter no mínimo 9 digitos")
          .required("O CEP do destinatário é obrigatório")
      });

      await schema.validate(data, {
        abortEarly: false
      });

      if (id) {
        await api.put(`/recipients/${id}`, data);
      }

      if (!id) {
        await api.post("/recipients", data);
      }

      setButtonLoading(false);

      toast.success("Destinatário salvo com sucesso");
      history.push("/recipients");
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);

        setButtonLoading(false);
      } else {
        setButtonLoading(false);
        toast.error("Algo deu errado ao salvar o destinatário");
      }
    }
  }

  return (
    <>
      {loading ? (
        <FormLoading />
      ) : (
        <FormContainer
          initialData={recipient}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <HeaderForm
            id={id}
            prevPage="/recipients"
            title="destinatário"
            loading={buttonLoading}
          />

          <section>
            <Input name="name" label="Nome" placeholder="John Doe" />
            <InputContainer1>
              <Input name="street" label="Rua" placeholder="Rua Beethoven" />
              <Input name="number" label="Número" placeholder="1729" />
              <Input name="complement" label="Complemento" />
            </InputContainer1>
            <InputContainer2>
              <Input name="city" label="Cidade" placeholder="Diadema" />
              <Input name="state" label="Estado" placeholder="São Paulo" />
              <InputMask
                name="cep"
                label="CEP"
                mask="99999-999"
                maskChar=""
                placeholder="09960-580"
              />
            </InputContainer2>
          </section>
        </FormContainer>
      )}
    </>
  );
}

RecipientForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired
};
