import Order from "../models/Order";
import Recipient from "../models/Recipient";
import File from "../models/File";

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
}

export default new DeliveryController();
