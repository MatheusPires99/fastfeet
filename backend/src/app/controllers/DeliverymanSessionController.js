import * as Yup from "yup";
import jwt from "jsonwebtoken";

import Deliveryman from "../models/Deliveryman";
import File from "../models/File";

import authConfig from "../../config/auth";

class DeliverymanSessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Field validation fails" });
    }
    const { id } = req.body;

    const deliveryman = await Deliveryman.findOne({
      where: { id, status: true },
      include: [
        { model: File, as: "avatar", attributes: ["id", "path", "url"] },
      ],
    });

    if (!deliveryman) {
      return res.status(401).json({ error: "Deliveryman not found" });
    }

    const { name, email, avatar } = deliveryman;

    return res.json({
      deliveryman: {
        id,
        name,
        email,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new DeliverymanSessionController();
