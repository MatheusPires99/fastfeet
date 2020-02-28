import Mail from "../../lib/Mail";

class NewOrderMail {
  get key() {
    return "NewOrderMail";
  }

  async handle({ data }) {
    const { deliverymanExist, recipientExist, order } = data;

    await Mail.sendMail({
      to: `${deliverymanExist.name} <${deliverymanExist.email}>`,
      subject: "Nova entrega",
      template: "order",
      context: {
        deliveryman: deliverymanExist.name,
        product: order.product,
        recipient: recipientExist.name,
        street: recipientExist.street,
        number: recipientExist.number,
        city: recipientExist.city,
        state: recipientExist.state,
      },
    });
  }
}

export default new NewOrderMail();
