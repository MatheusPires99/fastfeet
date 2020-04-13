import Sequelize, { Model } from "sequelize";
import sequelizePaginate from "sequelize-paginate";

class DeliveryProblems extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    sequelizePaginate.paginate(DeliveryProblems);
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
  }
}

export default DeliveryProblems;
