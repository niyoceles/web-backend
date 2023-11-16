import dotenv from 'dotenv';
import model from '../models';
import {
  HTTP_CREATED, HTTP_SERVER_ERROR
} from '../constants/httpStatusCodes';
import {
  SERVER_NOT_RESPONDING
} from '../constants/general';

dotenv.config();

const {
  Participant
} = model;

/**
 * User Controllers
 */
export default class ParticipantController {
  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {String} return token response
   *
   */
  static async createParticipant(req, res) {
    try {
      const {
        eventId,
        title,
        familyName,
        firstName,
        position,
        department,
        organization,
        address,
        country,
        town,
        phone,
        email,
        dietRequirements,
        amount,
        dataProtection,
      } = req.body;

      // Validate required attributes
      if (!title || !familyName || !firstName || !email) {
        return res.status(400).json({
          error: 'Missing required attributes',
        });
      }

      const participant = await Participant.create({
        eventId,
        title,
        familyName,
        firstName,
        position,
        department,
        organization,
        address,
        country,
        town,
        phone,
        email,
        dietRequirements,
        amount,
        dataProtection,
      });
      return res.status(HTTP_CREATED).json({
        message: 'Created successful',
        participant,
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
   * @returns {String} return member response
   *
   */

  static async getAllParticipants(req, res) {
    const {
      id
    } = req.params;
    try {
      const participants = await Participant.findAll({
        where: {
          eventId: id,
        },
      });
      return res.status(200).json(participants);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }

  static async getParticipantById(req, res) {
    try {
      const {
        id
      } = req.params;

      if (!id) {
        return res.status(400).json({
          error: 'Participant ID is required',
        });
      }

      const participant = await Participant.findByPk(id);

      if (!participant) {
        return res.status(404).json({
          error: 'Participant not found',
        });
      }

      return res.status(200).json(participant);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}
