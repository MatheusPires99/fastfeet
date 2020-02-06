import Sequelize from "sequelize";

import User from "../app/models/User";
import Recipiet from "../app/models/Recipient";
import Deliveryman from "../app/models/Deliveryman";
import File from "../app/models/File";

import databaseConfig from "../config/database";

const models = [User, Recipiet, Deliveryman, File];

class Datebase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Datebase();
