import { Op } from "sequelize";
import * as Yup from "yup";

import Recipient from "../models/Recipient";

class RecipientController {
  async index(req, res) {
    const { page = 1, name = "" } = req.query;

    const { docs, pages, total } = await Recipient.paginate({
      where: {
        status: true,
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      attributes: [
        "id",
        "name",
        "street",
        "number",
        "complement",
        "city",
        "state",
        "cep",
        "status",
      ],
      paginate: 10,
      page,
      order: [["id", "DESC"]],
    });

    return res.json({ docs, page, pages, total });
  }

  async show(req, res) {
    const recipient = await Recipient.findByPk(req.params.id, {
      where: { status: true },
      attributes: [
        "id",
        "name",
        "street",
        "number",
        "complement",
        "city",
        "state",
        "cep",
        "status",
      ],
    });

    if (!recipient) {
      return res.status(400).json({ error: "Recipient not found" });
    }

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cep: Yup.string()
        .required()
        .min(9)
        .max(9),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().notRequired(),
      city: Yup.string().required(),
      state: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Field validation fails" });
    }

    const recipientExist = await Recipient.findOne({
      where: {
        name: req.body.name,
        street: req.body.street,
        number: req.body.number,
      },
    });

    if (recipientExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const recipient = await Recipient.create(req.body);

    return res.json({ recipient });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      cep: Yup.string()
        .min(9)
        .max(9),
      street: Yup.string(),
      number: Yup.string().when("street", (street, field) =>
        street ? field.required() : field
      ),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string().when("state", (state, field) =>
        state ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Field validation fails" });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    const {
      id,
      name,
      cep,
      street,
      number,
      complement,
      city,
      state,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      cep,
      street,
      number,
      complement,
      city,
      state,
    });
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id, {
      where: { status: true },
    });

    if (!recipient) {
      return res.status(400).json({ error: "Recipient not found" });
    }

    recipient.status = false;

    await recipient.save();

    return res.status(200).json({
      message: `${recipient.name} deleted with success`,
    });
  }
}

export default new RecipientController();
