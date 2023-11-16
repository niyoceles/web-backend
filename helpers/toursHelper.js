/* eslint-disable valid-jsdoc */
/* eslint-disable no-tabs */
import model from '../models';
import {
  HTTP_NOT_FOUND,
} from '../constants/httpStatusCodes';
import {
  NOT_FOUND_NEWS,
} from '../constants/general';

const dotenv = require('dotenv');

const {
  Tours, Read,
} = model;

dotenv.config();

/**
 * Admin middleware
 */
class ToursHelper {
  /**
	 *
	 * @param {Object} body
	 * @returns {Object} returns Tours created
	 */
  static async createTours(body, authorId) {
    const {
      title, toursBody, image, location, type, price, departureTime, includes, excludes, tips,
      itenerary,
    } = body;

    console.log(body);

    const tours = {
      title,
      toursBody,
      authorId,
      image,
      location,
      type,
      price,
      departureTime,
      includes,
      excludes,
      tips,
      itenerary
    };

    const addedTours = await Tours.create(tours);
    return addedTours;
  }

  /**
	 *
	 * @param {Object} body
	 * @returns {Object} returns all my Tours
	 */
  static async findMyTours(authorId) {
    const myTours = await Tours.findAll({
      where: {
        authorId,
      },
    });
    return myTours;
  }

  /**
	 *
	 * @param {Object} body
	 * @returns {Object} returns published Tours
	 */
  static async publishTours(slug, status) {
    const published = await Tours.update(
      {
        isPublished: status,
      },
      {
        where: {
          slug,
        },
      }
    );
    return published;
  }

  static async countView(newsSlug) {
    const [result, created] = await Read.findOrCreate({
      where: {
        newsSlug,
      },
      defaults: {
        numberOfReading: 1,
      },
    });
    if (!created) {
      const viewed = await Read.update(
        {
          numberOfReading: result.numberOfReading + 1,
        },
        {
          where: {
            newsSlug,
          },
          returning: true,
        }
      );
      return viewed;
    }
    return result;
  }

  /**
	 *
	 * @param {Object} body
	 * @returns {Object} returns destroy Tours
	 */
  static async deleteTours(slug) {
    const deleted = await Tours.destroy({
      where: {
        slug,
      },
    });
    return deleted;
  }

  static async notFoundTours(array, res) {
    if (array === null || array === undefined || array[0] !== 1) {
      return res.status(HTTP_NOT_FOUND).json({
        error: NOT_FOUND_NEWS,
        array
      });
    }
  }
}

export default ToursHelper;
