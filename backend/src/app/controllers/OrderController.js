import * as Yup from "yup";

import Order from "../models/Order";
import Recipient from "../models/Recipient";
import Deliveryman from "../models/Deliveryman";

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Field validation fails" });
    }

    const recipientExist = await Recipient.findByPk(req.body.recipient_id);

    if (!recipientExist) {
      return res.status(401).json({ error: "Recipient does not exist" });
    }

    const deliverymanExist = await Deliveryman.findByPk(
      req.body.deliveryman_id
    );

    if (!deliverymanExist) {
      return res.status(401).json({ error: "Deliveryman does not exist" });
    }

    const order = await Order.create(req.body);

    console.log(`TESTE: ${req.body}`);

    return res.json(order);
  }
}

export default new OrderController();
