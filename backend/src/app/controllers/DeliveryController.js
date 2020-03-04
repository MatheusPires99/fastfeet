import { isEqual, parseISO, format } from "date-fns";
import Order from "../models/Order";
import Recipient from "../models/Recipient";
import File from "../models/File";
import Withdraw from "../models/Withdraw";

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const order = await Order.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        signature_id: null,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deliveryman_id", "recipient_id"],
      },
      order: [["id", "DESC"]],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Recipient,
          as: "recipient",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: File,
          as: "signature",
          attributes: {
            exclude: ["id", "path", "url"],
          },
        },
      ],
    });

    return res.json(order);
  }

  async update(req, res) {
    const order = await Order.findByPk(req.params.order_id, {
      where: {
        deliveryman_id: req.params.deliveryman_id,
        canceled_at: null,
        signature_id: null,
      },
    });

    if (!order) {
      return res.status(401).json({ error: "Order not found!" });
    }

    const getDate = new Date();

    const checkWithdraws = await Withdraw.findOne({
      where: {
        deliveryman_id: req.params.deliveryman_id,
        date: getDate,
      },
    });

    if (checkWithdraws) {
      const { date, count } = checkWithdraws;

      if (isEqual(parseISO(date), parseISO(format(getDate, "yyyy-MM-dd")))) {
        if (count >= 5) {
          return res
            .status(401)
            .json({ error: "You con only withdraw 5 times per day" });
        }
      }

      await checkWithdraws.update({
        count: count + 1,
      });
    } else {
      await Withdraw.create({
        deliveryman_id: req.params.deliveryman_id,
        date: getDate,
        count: 1,
      });
    }

    const {
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
    } = await order.update(req.body);

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
    });
  }
}

export default new DeliveryController();
