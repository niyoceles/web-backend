/* eslint-disable no-tabs */
import dotenv from 'dotenv';
import model from '../models';

dotenv.config();

const {
  RequestTravel,
} = model;

/**
 *RequestTravelController Controllers
 */
export default class RequestTravelController {
  /**
	 *
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {Object}RequestTravelController object
	 */
  static async createRequestTravel(req, res) {
    const {
      itemName,
      category,
      itemImage,
      itemImage2,
      itemDescription,
      itemPrice,
      status,
    } = req.body;

    try {
      const newItem = await RequestTravel.create({
        itemName,
        itemImage,
        itemImage2,
        category,
        itemDescription,
        itemPrice,
        status,
      });

      if (newItem) {
        return res.status(200).json({
          item: newItem,
          message: 'Request Event successful created',
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to create an item',
      });
    }
  }

  static async deleteItem(req, res) {
    const {
      id
    } = req.params;
    try {
      const deletingItem = await RequestTravel.destroy({
        where: {
          id,
          itemOwnerId: req.user.id,
        },
      });
      if (!deletingItem) {
        return res.status(404).json({
          error: 'Failed to delete an item',
        });
      }
      return res.status(200).json({
        id,
        message: 'item deleted successful',
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to delete item',
      });
    }
  }

  static async allRequestTravel(req, res) {
    try {
      // @pagination
    //   let page, limit;
    //   if (Object.keys(req.query).length === 0) {
    //     page = 1;
    //     limit = 20;
    //   } else if (req.query.limit === undefined) {
    //     ({
    //       page
    //     } = req.query);
    //     limit = 10;
    //   } else {
    //     ({
    //       page, limit
    //     } = req.query);
    //   }
      // @retrieve items
      const allitems = await RequestTravel.findAll({
        // include: [
        //   {
        //     model: User,
        //     as: 'owner',
        //     attributes: ['organization'],
        //   },
        // ],
        // order: [['createdAt', 'DESC']],
        // offset: (parseInt(page, 20) - 1) * limit,
        // limit,
      });
      if (allitems.length < 1) {
        return res.status(404).json({
          error: 'No Item found',
        });
      }
      return res.status(200).json({
        allitems,
        message: 'Get items successful',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Failed to get items',
      });
    }
  }

  // to get single item
  static async getItem(req, res) {
    const {
      id
    } = req.params;
    try {
      const item = await RequestTravel.findOne({
        where: {
          id,
        },
      });
      if (!item) {
        return res.status(404).json({
          error: 'item not found',
        });
      }
      return res.status(200).json({
        item,
        message: 'get request event successful',
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to get an item',
      });
    }
  }
}
