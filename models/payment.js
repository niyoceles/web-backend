export default (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
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
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['success', 'fail'],
    },
  },
  {
    tableName: 'payments',
    paranoid: true,
  },);
  return Payment;
};
