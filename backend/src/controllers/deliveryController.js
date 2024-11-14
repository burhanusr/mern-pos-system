const DeliveryAddress = require('./../models/deliveryModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllDeliveries = catchAsync(async (req, res) => {
  const deliveries = await DeliveryAddress.find();

  res.status(200).json({
    status: 'success',
    result: deliveries.length,
    data: deliveries,
  });
});

exports.getAllDeliveriesUser = catchAsync(async (req, res) => {
  const deliveries = await DeliveryAddress.find({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    result: deliveries.length,
    data: deliveries,
  });
});

exports.getDelivery = catchAsync(async (req, res) => {
  const delivery = await DeliveryAddress.findById(req.params.id);

  if (!delivery) {
    throw new AppError('There is no delivery found with that ID!', 404);
  }

  res.status(200).json({
    status: 'success',
    data: delivery,
  });
});

exports.createDelivery = catchAsync(async (req, res) => {
  const payload = Object.assign({}, req.body);
  payload.user = req.user.id;

  const delivery = await DeliveryAddress.create(payload);

  res.status(201).json({
    status: 'success',
    data: delivery,
  });
});

exports.updateDelivery = catchAsync(async (req, res) => {
  const delivery = await DeliveryAddress.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!delivery) {
    throw new AppError('There is no delivery found with that ID!', 404);
  }

  res.status(200).json({
    status: 'success',
    data: delivery,
  });
});

exports.deleteDelivery = catchAsync(async (req, res) => {
  const delivery = await DeliveryAddress.findByIdAndDelete(req.params.id);

  if (!delivery) {
    throw new AppError('There is no delivery found with that ID!', 404);
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
