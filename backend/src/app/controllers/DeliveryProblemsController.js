import * as Yup from "yup";

import Order from "../models/Order";
import Recipient from "../models/Recipient";
import Deliveryman from "../models/Deliveryman";
import DeliveryProblems from "../models/DeliveryProblems";

import CancelOrderMail from "../jobs/CancelOrderMail";
import Queue from "../../lib/Queue";

class DeliveryProblemsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { docs, pages, total } = await DeliveryProblems.paginate({
      attributes: ["id", "description"],
      order: [["id", "DESC"]],
      paginate: 10,
      page,
      include: [
        {
          model: Order,
          as: "order",
          attributes: ["id", "product"],
          include: [
            {
              model: Recipient,
              as: "recipient",
              attributes: ["id", "name"],
            },
            {
              model: Deliveryman,
              as: "deliveryman",
              attributes: ["id", "name", "email"],
            },
          ],
        },
      ],
    });

    if (!docs) {
      return res.status(400).json({ error: "None delivery problems found" });
    }

    return res.json({ docs, page, pages, total });
  }

  async show(req, res) {
    const orderProblem = await DeliveryProblems.findAll({
      where: { order_id: req.params.id },
      attributes: ["id", "description"],
    });

    if (!orderProblem) {
      return res.status(401).json({ error: "Order not found" });
    }

    return res.json(orderProblem);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const { description } = req.body;

    const { id, order_id } = await DeliveryProblems.create({
      order_id: req.params.id,
      description,
    });

    return res.json({
      id,
      order_id,
      description,
    });
  }

  async delete(req, res) {
    const order_problem = await DeliveryProblems.findByPk(req.params.id);

    if (!order_problem) {
      return res.status(401).json({ error: "Order problem not found" });
    }

    const { order_id } = order_problem;

    const order = await Order.findOne({
      where: { id: order_id, canceled_at: null },
      attributes: ["id", "product", "canceled_at"],
      include: [
        {
          model: Recipient,
          as: "recipient",
          attributes: ["id", "name"],
        },
        {
          model: Deliveryman,
          as: "deliveryman",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!order) {
      return res
        .status(401)
        .json({ error: "Order does not exists or is already canceled" });
    }

    order.canceled_at = new Date();

    await Queue.add(CancelOrderMail.key, {
      order,
      order_problem,
    });

    await order.save();

    return res.json(order);
  }
}

export default new DeliveryProblemsController();
