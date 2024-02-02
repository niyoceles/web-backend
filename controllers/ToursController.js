/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import dotenv from 'dotenv';
import model from '../models';
import ToursHelper from '../helpers/toursHelper';
// import {
//   sendToSubscribers
// } from '../helpers/mailer/maillist';
import {
  HTTP_OK,
  HTTP_CREATED,
  HTTP_NOT_FOUND,
  HTTP_SERVER_ERROR,
} from '../constants/httpStatusCodes';
import {
  SERVER_NOT_RESPONDING,
  NOT_FOUND_TOURS,
  SUCCESS_TOURS_CREATED,
  SUCCESS_FOUND_TOURS,
  SUCCESS_READ_TOURS,
  SUCCESS_PUBLISH_TOURS,
  SUCCESS_TOURS_UPDATED,
  SUCCESS_TOURS_DELETED,
  SUCCESS_FETCH_TOURS,
  SUCCESS_FETCH_FIVE_TOURS,
} from '../constants/general';

const {
  Tours,
  User,
  // Read,
  // Comment,
  //  Maillist
} = model;

dotenv.config();

/**
 * Tours Controllers
 */
export default class ToursController {
  /**
   *
   * @param {Object} req
   * @param {Object} res  get all created tours
   * @returns {Object} return all created tours
   */
  static async retrieveTours(req, res) {
    try {
      // @pagination
      let page, limit;
      if (Object.keys(req.query).length === 0) {
        page = 1;
        limit = 10;
      } else if (req.query.limit === undefined) {
        ({
          page
        } = req.query);
        limit = 10;
      } else {
        ({
          page, limit
        } = req.query);
      }
      // @retrieve tours
      const allTours = await Tours.findAll({
        // include: [
        //   // {
        //   //   as: 'author',
        //   //   model: User,
        //   //   attributes: [
        //   //     'id',
        //   //     'firstName',
        //   //     'lastName',
        //   //     'email',
        //   //     'organization',
        //   //   ],
        //   // },
        //   // {
        //   //   as: 'comments',
        //   //   model: Comment,
        //   //   attributes: [
        //   //     'id',
        //   //     'names',
        //   //     'email',
        //   //     'commentBody',
        //   //     'toursId',
        //   //     'createdAt',
        //   //   ],
        //   // },
        //   // {
        //   //   as: 'views',
        //   //   model: Read,
        //   //   attributes: ['id', 'toursSlug', 'numberOfReading'],
        //   // },
        // ],
        order: [['createdAt', 'DESC']],
        offset: (parseInt(page, 10) - 1) * limit,
        limit,
      });

      const totalTours = await Tours.findAll();
      return res.status(HTTP_OK).json({
        status: HTTP_OK,
        tours: allTours,
        metadata: {
          currentPage: parseInt(page, 10),
          previousPage: parseInt(page, 10) > 1 ? parseInt(page, 10) - 1 : null,
          nextPage:
            Math.ceil(totalTours.length / limit) > page
              ? parseInt(page, 10) + 1
              : null,
          totalPages: Math.ceil(totalTours.length / limit),
          limit: parseInt(limit, 10),
        },
        message: SUCCESS_FETCH_TOURS,
      });
    } catch (error) {
      console.log(error);
      return res.status(HTTP_SERVER_ERROR).json({
        error: SERVER_NOT_RESPONDING,
      });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res  get all created 5 tours
   * @returns {Object} return all created 5 tours
   */
  static async retrieveFiveTours(req, res) {
    try {
      // @retrieve tours
      const fiveTours = await Tours.findAll({
        where: {
          isPublished: true,
        },
        include: [
          {
            as: 'author',
            model: User,
            attributes: [
              'id',
              'firstName',
              'lastName',
              'email',
              'organization',
            ],
          },
        ],
        order: [['createdAt', 'DESC']],
        offset: (parseInt(1, 5) - 1) * 5,
        limit: 5,
      });

      return res.status(HTTP_OK).json({
        status: HTTP_OK,
        message: SUCCESS_FETCH_FIVE_TOURS,
        toursCount: fiveTours.length,
        tours: fiveTours,
      });
    } catch (error) {
      return res.status(HTTP_SERVER_ERROR).json({
        error: SERVER_NOT_RESPONDING,
      });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} tours object
   */

  static async create(req, res) {
    try {
      const createTours = await ToursHelper.createTours(req.body, req.user.id);
      console.log(createTours);
      // const {
      //   dataValues
      // } = createTours;

      // const findSubscribes = await Maillist.findAll();
      // const sendingtoAll = findSubscribes.map(async (i) => {
      //   const sendMail = await sendToSubscribers(
      //     i.email,
      //     dataValues.toursBody,
      //     `[Blog] ${dataValues.title}`,
      //     `blog/${dataValues.slug}`,
      //     i.id
      //   );
      //   return {
      //     sendMail,
      //   };
      // });

      // await Promise.all(sendingtoAll); // end send mail

      return res.status(HTTP_CREATED).json({
        status: HTTP_CREATED,
        message: SUCCESS_TOURS_CREATED,
        // dataValues,
      });
    } catch (error) {
      console.log(error);
      return res.status(HTTP_SERVER_ERROR).json({
        error: SERVER_NOT_RESPONDING,
      });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} tours object
   */

  static async update(req, res) {
    try {
      const {
        title,
        toursBody,
        price1,
        price2,
        price3,
        price4,
        price5, authorId, image
      } = req.body;

      const findTours = await Tours.findOne({
        where: {
          slug: req.params.slug,
        },
      });

      if (!findTours) {
        return res.status(HTTP_NOT_FOUND).json({
          error: NOT_FOUND_TOURS,
        });
      }

      await Tours.update(
        {
          title,
          price1,
          price2,
          price3,
          price4,
          price5,
          toursBody,
          authorId,
          image,
        },
        {
          where: {
            id: findTours.get().id,
          },
        },
      );

      const updatedTours = await Tours.findOne({
        where: {
          slug: req.params.slug,
        },
      });

      return res.status(HTTP_OK).json({
        message: SUCCESS_TOURS_UPDATED,
        data: updatedTours,
      });
    } catch (error) {
      return res.status(HTTP_SERVER_ERROR).json({
        error: SERVER_NOT_RESPONDING,
      });
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {String} acknowledgement message
   *
   */
  static async publish(req, res) {
    try {
      const findTours = await Tours.findOne({
        where: {
          slug: req.params.slug,
        },
      });
      if (!findTours) {
        return res.status(HTTP_NOT_FOUND).json({
          status: HTTP_NOT_FOUND,
          error: NOT_FOUND_TOURS,
        });
      }

      await ToursHelper.publishTours(req.params.slug, req.body.isPublished);

      return res.status(HTTP_OK).json({
        message: SUCCESS_PUBLISH_TOURS,
      });
    } catch (error) {
      return res.status(HTTP_SERVER_ERROR).json({
        message: SERVER_NOT_RESPONDING,
      });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} user object
   */

  static async read(req, res) {
    const {
      slug
    } = req.params;
    try {
      const findTours = await Tours.findOne({
        where: {
          slug,
        },
        // include: [
        //   {
        //     model: Read,
        //     as: 'views',
        //     attributes: ['numberOfReading'],
        //   },
        //   // {
        //   //   model: Comment,
        //   //   as: 'comments',
        //   //   where: {
        //   //     isActive: true,
        //   //   },
        //   //   required: false,
        //   //   attributes: [
        //   //     'id',
        //   //     'names',
        //   //     'email',
        //   //     'commentBody',
        //   //     'isActive',
        //   //     'createdAt',
        //   //   ],
        //   // },
        // ],
      });

      if (!findTours) {
        return res.status(HTTP_NOT_FOUND).json({
          error: NOT_FOUND_TOURS,
        });
      }

      // await ToursHelper.countView(slug);
      return res.status(HTTP_OK).json({
        status: HTTP_OK,
        message: SUCCESS_READ_TOURS,
        tours: findTours.get(),
      });
    } catch (error) {
      console.log(error);
      return res.status(HTTP_SERVER_ERROR).json({
        error: SERVER_NOT_RESPONDING,
      });
    }
  }
  /**
	 *
	 // eslint-disable-next-line no-tabs
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {Object} tours object
	 */

  static async myTours(req, res) {
    try {
      const tours = await ToursHelper.findMyTours(req.user.id);
      return res.status(HTTP_OK).json({
        message: SUCCESS_FOUND_TOURS,
        tours,
      });
    } catch (error) {
      return res.status(HTTP_SERVER_ERROR).json({
        error: SERVER_NOT_RESPONDING,
      });
    }
  }

  /**
	 *
	 // eslint-disable-next-line no-tabs
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {String} delete message
	 */

  static async delete(req, res) {
    try {
      const tours = await ToursHelper.deleteTours(req.params.slug);
      if (tours === 0) {
        return res.status(HTTP_NOT_FOUND).json({
          error: NOT_FOUND_TOURS,
        });
      }
      return res.status(HTTP_OK).json({
        message: SUCCESS_TOURS_DELETED,
      });
    } catch (error) {
      return res.status(HTTP_SERVER_ERROR).json({
        error: SERVER_NOT_RESPONDING,
      });
    }
  }
}
