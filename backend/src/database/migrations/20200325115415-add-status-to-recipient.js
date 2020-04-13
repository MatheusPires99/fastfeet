module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("recipients", "status", {
      type: Sequelize.BOOLEAN,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: false,
      defaultValue: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn("recipients", "status");
  },
};
