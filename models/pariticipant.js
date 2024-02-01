export default (sequelize, DataTypes) => {
  const Participant = sequelize.define(
    'Participant',
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      eventName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      familyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
      },
      department: {
        type: DataTypes.STRING,
      },
      organization: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      town: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      dietRequirements: {
        type: DataTypes.STRING,
      },
      paymentType: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.STRING,
      },
      dataProtection: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'participants',
      paranoid: true,
    },
  );

  return Participant;
};
