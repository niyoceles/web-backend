/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('orders', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    clientEmail: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
    // itemOwnerId: {
    //   type: Sequelize.UUID,
    //   allowNull: false,
    //   required: true,
    // },
    itemsArray: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: true,
      defaultValue: [],
    },
    needDate: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
    deadline: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
    pickup: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    dropoff: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM,
      allowNull: false,
      defaultValue: 'PENDING',
      values: ['PAID', 'APPROVED', 'REJECTED', 'DELETED', 'PENDING'],
    },
    isPaid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.0,
      allowNull: false,
    },
    paymentMethod: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('orders'),
};
