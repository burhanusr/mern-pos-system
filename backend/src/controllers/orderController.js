const DeliveryAddress = require('../models/deliveryModel');
const OrderItem = require('../models/orderItemModel');
const Order = require('../models/orderModel');
const Cart = require('./../models/cartModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { delivery_fee, delivery_address } = req.body;

  const carts = await Cart.find({ user: req.user._id }).populate(
    'items.product'
  );

  if (!carts) {
    return next(new AppError('Your cart is empty', 400));
  }

  const address = await DeliveryAddress.findById(delivery_address);

  let order = new Order({
    delivery_fee: delivery_fee,
    delivery_address: {
      province: address.province,
      regency: address.regency,
      district: address.district,
      village: address.village,
      detail: address.detail,
    },
    user: req.user._id,
  });

  const [cart] = carts;

  let orderItems = await OrderItem.insertMany(
    cart.items.map((item) => ({
      ...item,
      name: item.product.name,
      quantity: parseInt(item.quantity),
      price: parseInt(item.product.price),
      order: order._id,
      product: item.product._id,
    }))
  );

  orderItems.forEach((item) => order.order_items.push(item));
  order.save();

  await Cart.deleteMany({ user: req.user._id });

  res.status(201).json({
    status: 'success',
    data: order,
  });
});

exports.getOrder = catchAsync(async (req, res) => {
  const order = await Order.find({ user: req.user._id })
    .populate('order_items')
    .populate('user');

  res.status(200).json({
    status: 'success',
    data: order,
  });
});
