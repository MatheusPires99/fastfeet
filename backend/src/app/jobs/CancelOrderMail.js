import Mail from "../../lib/Mail";

class CancelOrderMail {
  get key() {
    return "CancelOrderMail";
  }

  async handle({ data }) {
    const { order, order_problem } = data;

    await Mail.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: "Novo cancelamente de encomenda",
      template: "cancel",
      context: {
        deliveryman: order.deliveryman.name,
        order_id: order.id,
        product: order.product,
        problem_description: order_problem.description,
      },
    });
  }
}

export default new CancelOrderMail();
