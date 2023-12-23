const toursMigration = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('tours', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      required: true,
    },
    slug: {
      type: Sequelize.STRING,
      unique: true,
      required: true,
    },
    toursBody: {
      type: Sequelize.TEXT,
      required: true,
    },
    authorId: {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true
    },
    location: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'tours'
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
      required: true,
      defaultValue: 0
    },
    departureTime: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    tips: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
    },
    includes: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
    },
    excludes: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
    },
    itenerary: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
    },
    isPublished: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
  down: (queryInterface) => queryInterface.dropTable('tours'),
};

export default toursMigration;
