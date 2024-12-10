const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getMe = catchAsync(async (req, res) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

exports.updateCurrentUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new AppError('No User found with that ID', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      name: user.name,
      email: user.email,
    },
  });
});
