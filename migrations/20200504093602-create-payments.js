export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('payments', {
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is required',
        },
        isEmail: {
          args: true,
          msg: 'Invalid email',
        },
      },
    },
    status: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['success', 'fail'],
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('payments'),
};
