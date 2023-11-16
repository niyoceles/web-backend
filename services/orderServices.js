/* eslint-disable no-tabs */
/* eslint-disable class-methods-use-this */
import models from '../models';

const {
  orders
} = models;
/**
 * item service
 */
class orderService {
  /**
	 * Change item status
	 *
	 * @param {email} logged email of the user
	 * @param {userType} type of the user client or supplier
	 * @returns {Object} item
	 */
  // cancel order
  async cancelOrdered(id, clientId) {
    const updatedBook = await orders.update(
      {
        status: 'cancelled',
      },
      {
        where: {
          id,
          clientId,
        },
        returning: true,
        raw: true,
        nest: true,
      }
    );

    return [updatedBook[1][0].id];
  }

  async updatedOrdered(id, status) {
    const updatedBook = await orders.update(
      {
        status,
        // isPaid: true,
        // paymentMethod: 'cash',
      },
      {
        where: {
          id,
        },
        returning: true,
        raw: true,
        nest: true,
      }
    );

    return [updatedBook[1][0].id];
  }

  // confirm order services
  async confirmOrdered(id, itemOwnerId) {
    const updatedBook = await orders.update(
      {
        status: 'confirmed',
        isPaid: true,
        paymentMethod: 'cash',
      },
      {
        where: {
          id,
          itemOwnerId,
        },
        returning: true,
        raw: true,
        nest: true,
      }
    );

    return [updatedBook[1][0].id];
  }

  // payment ordered items
  async payOrdered(id, clientId, paymentMethod) {
    const paidOrder = await orders.update(
      {
        status: 'confirmed',
        isPaid: true,
        paymentMethod,
      },
      {
        where: {
          id,
          clientId,
        },
        returning: true,
        raw: true,
        nest: true,
      }
    );

    return [paidOrder[1][0].id];
  }
}

export default new orderService();
