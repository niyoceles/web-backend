import models from '../models';

const {
  items, User,
} = models;

class supplierController {
  static async getSuppliers(req, res) {
    try {
      const allsupplier = await User.findAll({
        where: {
          userType: 'supplier',
        },
      });
      if (allsupplier.length < 1) {
        return res.status(404).json({
          error: 'No supplier found',
        });
      }
      return res.status(200).json({
        allsupplier,
        message: 'Get Supplier successful',
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to get supplier',
      });
    }
  }

  static async myprofile(req, res) {
    try {
      const {
        id
      } = req.user;
      const myprofile = await User.findAll({
        where: {
          id,
        },
        include: [
          {
            as: 'items',
            model: items,
            attributes: [
              'itemImage',
              'itemName',
              'category',
              'itemPrice',
              'itemDescription',
              'id',
            ],
          },
        ],
      });
      if (myprofile.length < 1) {
        return res.status(404).json({
          error: 'my profile error',
        });
      }
      return res.status(200).json({
        myprofile,
        message: 'Get profile successful',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Failed to get my profile',
      });
    }
  }

  static async viewSupplierAccount(req, res) {
    try {
      const {
        id
      } = req.params;
      const profile = await User.findAll({
        where: {
          id,
        },
        include: [
          {
            as: 'items',
            model: items,
            attributes: [
              'itemImage',
              'itemName',
              'category',
              'itemPrice',
              'itemDescription',
              'id',
            ],
          },
        ],
      });
      if (profile.length < 1) {
        return res.status(404).json({
          error: 'profile error',
        });
      }
      return res.status(200).json({
        profile,
        message: 'Get profile successful',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Failed to get profile',
      });
    }
  }

  static async updateProfileImage(req, res) {
    const {
      profileImages
    } = req.body;
    try {
      const updateImages = await User.update(
        {
          profileImages,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      if (updateImages.length < 1) {
        return res.status(404).json({
          error: 'No updated image',
        });
      }
      return res.status(200).json({
        message: 'Image updated successful',
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to update image',
      });
    }
  }
}

export default supplierController;
