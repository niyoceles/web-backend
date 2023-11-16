import SequelizeSlugify from 'sequelize-slugify';

export default (sequelize, DataTypes) => {
  const Tours = sequelize.define(
    'Tours',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        required: true,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
      },
      toursBody: {
        type: DataTypes.TEXT,
        required: true,
      },
      authorId: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'tours'
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        defaultValue: 0
      },
      departureTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tips: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
      includes: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
      excludes: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
      itenerary: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
      isPublished: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'tours',
      // paranoid: true,
    }
  );
  SequelizeSlugify.slugifyModel(Tours, {
    source: ['title'],
    slugOptions: {
      lower: true,
    },
    overwrite: true,
    column: 'slug',
  });
  Tours.associate = (models) => {
    Tours.belongsTo(models.User, {
      as: 'author',
      foreignKey: 'authorId',
    });
    // Tours.hasMany(models.Comment, {
    //   as: 'comments',
    //   foreignKey: 'toursId',
    //   sourceKey: 'id',
    // });
    Tours.hasOne(models.Read, {
      as: 'views',
      foreignKey: 'newsSlug',
      sourceKey: 'slug',
    });
  };
  return Tours;
};
