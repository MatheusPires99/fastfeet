import Sequelize, { Model } from "sequelize";
import sequelizePaginate from "sequelize-paginate";

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    sequelizePaginate.paginate(Deliveryman);
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: "avatar_id", as: "avatar" });
  }
}

export default Deliveryman;
