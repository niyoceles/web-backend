/* eslint-disable no-unused-vars */
/* eslint-disable no-tabs */
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import model from '../models';
// import MaillistHelper from '../helpers/maillistHelper';
import {
  subscribed,
  unsubscribed,
} from '../helpers/mailer/maillist';
import {
  HTTP_OK,
  HTTP_CREATED,
  HTTP_NOT_FOUND,
  HTTP_SERVER_ERROR,
} from '../constants/httpStatusCodes';
import {
  SERVER_NOT_RESPONDING,
  NOT_FOUND_USER,
  SUCCESS_SUBSCRIBE,
  SUCCESS_UNSUBSCRIBE,
  SUCCESS_GET_SUBSCRIBERS,
} from '../constants/general';

dotenv.config();

dotenv.config();

const {
  Maillist
} = model;

/**
 * User Controllers
 */
export default class MaillistsController {
  /**
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {String} acknowledgement message
	 *
	 */
  static async subscribe(req, res) {
    try {
      const {
        email
      } = req.body;
      if (!email) {
        return res.status(400).json({
          error: 'email is required',
        });
      }
      const findUser = await Maillist.findOrCreate({
        where: {
          email,
        },
      });
      if (findUser) {
        const {
          id
        } = findUser[0];
        await subscribed(email, id);
      }

      return res.status(HTTP_CREATED).json({
        message: SUCCESS_SUBSCRIBE,
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
	 * @returns {String} acknowledgement response
	 *
	 */
  static async unsubscribed(req, res) {
    try {
      const findUser = await Maillist.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!findUser) {
        return res.status(HTTP_NOT_FOUND).json({
          error: NOT_FOUND_USER,
        });
      }

      await unsubscribed(findUser.get().email, findUser.get().id);
      await Maillist.destroy({
        where: {
          id: findUser.get().id,
        },
      });

      return res.status(HTTP_OK).json({
        message: SUCCESS_UNSUBSCRIBE,
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
	 * @returns {String} acknowledgement response
	 *
	 */
  static async subscribers(req, res) {
    try {
      const findSubscribers = await Maillist.findAll();

      if (!findSubscribers) {
        return res.status(HTTP_NOT_FOUND).json({
          error: NOT_FOUND_USER,
        });
      }
      return res.status(HTTP_OK).json({
        message: SUCCESS_GET_SUBSCRIBERS,
        subscribers: findSubscribers,
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
	 * @returns {String} acknowledgement response
	 *
	 */
  static async sendEmailHTML(req, res) {
    const {
      sendTo,
      subject,
      html
    } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_RECEIVER,
        pass: process.env.SENDER_PWD // https://support.google.com/accounts/answer/185833?visit_id=638360865610150973-3194767862&p=InvalidSecondFactor&rd=1
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_RECEIVER,
      to: sendTo,
      subject,
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(HTTP_SERVER_ERROR).json({
          error,
        });
      }
      return res.status(HTTP_OK).json({
        message: 'Email sent successful',
      });
    });
  }

  static async sendEmailText(req, res) {
    const {
      sendTo,
      subject,
      text
    } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_RECEIVER,
        pass: process.env.SENDER_PWD // https://support.google.com/accounts/answer/185833?visit_id=638360865610150973-3194767862&p=InvalidSecondFactor&rd=1
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_RECEIVER,
      to: sendTo,
      subject,
      html: `<div style="background-color: white; border-radius: 10px;">
      <p style="font-size: 18px; padding: 30px; "> 
         Hello ${sendTo},  
          <br><br>
          <br>
          ${text}
          <br><br>
          <br>

          Best regards, 
          <br>      
          <a
              href='https://godiscoverafrica.rw/'
              style="color:#18a0fb; text-decoration:none"
          > 
         GODISCOVER
          </a>
      </p>
  </div>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(HTTP_SERVER_ERROR).json({
          error,
        });
      }
      return res.status(HTTP_OK).json({
        message: 'Email sent successful',
      });
    });
  }
}
