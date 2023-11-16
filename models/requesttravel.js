export default (sequelize, DataTypes) => {
  const RequestTravel = sequelize.define('RequestTravel', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: false,
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
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    },
    place: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    description: {
      type: DataTypes.TEXT,
      required: true
    },
  },
  {
    tableName: 'requesttravels',
    // paranoid: true,
  });
  return RequestTravel;
};
