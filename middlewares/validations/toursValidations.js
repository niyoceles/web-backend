import Joi from '@hapi/joi';

/**
 *  tours validaton
 */
class ToursValidation {
  /**
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {Object} toursSchema object
     *
	*/
  static async toursValidator(req, res, next) {
    const toursSchema = Joi.object().keys({
      title: Joi.string().required().label('Title'),
      toursBody: Joi.string().required().label('Tours body'),
      image: Joi.string().required().label('Image'),
    });

    const tours = {
      /**
     * create tours body
     */
      title: req.body.title,
      toursBody: req.body.toursBody,
      image: req.body.image,
    };

    const checkTours = Joi.validate(tours, toursSchema, {
      abortEarly: false,
    });

    if (checkTours.error) {
      const Errors = [];

      for (let i = 0; i < checkTours.error.details.length; i += 1) {
        Errors.push(
          checkTours.error.details[i].message.replace('"', ' ').replace('"', ' ')
        );
      }

      return res.status(400).json({
        Errors,
      });
    }

    next();
  }

  /**
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {Object} toursSlugSchema object
     *
	*/

  static async slugValidator(req, res, next) {
    const {
      slug
    } = req.params;
    switch (true) {
      case slug === null || slug === undefined:
        return res.status(400).json({
          error: 'A valid email is required',
        });
    }
    next();
  }
}

export default ToursValidation;
