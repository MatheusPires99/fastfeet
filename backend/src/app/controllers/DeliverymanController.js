import * as Yup from "yup";
import User from "../models/User";
import Deliveryman from "../models/Deliveryman";
import File from "../models/File";

class DeliverymanController {
  async index(req, res) {
    const checkUserAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!checkUserAdmin) {
      return res
        .status(401)
        .json({ error: "Only admins can view all deliverymans" });
    }

    const deliveryman = await Deliveryman.findAll({
      attributes: ["id", "name", "email"],
      include: [
        {
          model: File,
          as: "avatar",
          attributes: ["name", "path", "url"],
        },
      ],
    });

    return res.json(deliveryman);
  }

  async store(req, res) {
    const checkUserAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!checkUserAdmin) {
      return res
        .status(401)
        .json({ error: "Only admins can create new deliverymans" });
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const deliverymanExist = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExist) {
      return res.status(401).json({ error: "Deliveryman already exist" });
    }

    const { name, email, avatar_id } = await Deliveryman.create(req.body);

    return res.json({
      name,
      email,
      avatar_id,
    });
  }

  async update(req, res) {
    const checkUserAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!checkUserAdmin) {
      return res
        .status(401)
        .json({ error: "Only admins can update deliverymans" });
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const deliveryman = await Deliveryman.findByPk(req.body.id);

    if (!deliveryman) {
      return res.status(400).json({ error: "Delivery not found" });
    }

    const { name, email } = await deliveryman.update(req.body);

    return res.json({
      name,
      email,
    });
  }

  async delete(req, res) {
    const checkUserAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!checkUserAdmin) {
      return res
        .status(401)
        .json({ error: "Only admins can delete deliverymans" });
    }

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: "Deliveryman not found" });
    }

    await deliveryman.destroy(deliveryman);

    return res.status(200).json({
      message: `${deliveryman.name} deleted with success`,
    });
  }
}

export default new DeliverymanController();
