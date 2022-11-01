const { saleService } = require('../services');

const saleController = {
  getAllByUserId: async (req, res) => {
    const { userId } = req.params;
    const result = await saleService.getAllByUserId(userId);

    return res.status(200).json(result);
  },

  create: async (req, res, next) => {
    const {
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      orders,
    } = req.body;
    // const { userId } = req.user;
    // console.log(req.body);
    const saleCreated = await saleService.create({
      userId, sellerId, totalPrice, deliveryAddress, deliveryNumber,
    }, orders);
    console.log(saleCreated);
    if (saleCreated === null) return next({ code: 404, message: 'Can\'t create sale' });
    return res.status(201).json(saleCreated);
  },

  updateStatus: async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const saleUpdate = await saleService.updateStatus(id, status);
    if (saleUpdate === null) return next({ code: 404, message: 'Can\'t find sale' });
    return res.status(200).json(saleUpdate);
  },
};

module.exports = saleController;