import Sequelize from "sequelize";

import User from "../app/models/User";
import Recipiet from "../app/models/Recipient";

import databaseConfig from "../config/database";

const models = [User, Recipiet];

class Datebase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Datebase();
