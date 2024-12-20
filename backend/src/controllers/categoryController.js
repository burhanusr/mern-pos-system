const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllCategories = catchAsync(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({
    status: 'success',
    result: categories.length,
    data: categories,
  });
});

exports.getCategory = catchAsync(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new AppError('There is no category found with that ID!', 404);
  }

  res.status(200).json({
    status: 'success',
    data: category,
  });
});

exports.createCategory = catchAsync(async (req, res) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    status: 'success',
    data: category,
  });
});

exports.updateCategory = catchAsync(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new AppError('There is no category found with that ID!', 404);
  }

  res.status(200).json({
    status: 'success',
    data: category,
  });
});

exports.deleteCategory = catchAsync(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    throw new AppError('There is no category found with that ID!', 404);
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
