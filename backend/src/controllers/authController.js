const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.register = catchAsync(async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  // check empty data
  if (!name || !email || !password || !passwordConfirm) {
    throw new AppError('Please fill out all fields.', 400);
  }

  // check existing user
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new AppError('This email is already registered.', 400);
  }

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  res.status(201).json({
    status: 'success',
    data: {
      name: newUser.name,
      email: newUser.email,
    },
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // check empty data
  if (!email || !password) {
    throw new AppError('Please fill out all fields.', 400);
  }

  // check user email and password
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password))) {
    throw new AppError('Incorrect email or password.', 401);
  }

  // generate jwt token
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '30s',
    }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '1d',
    }
  );

  // configure cookies setting
  const expiredTime = process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000;

  const cookieOptions = {
    maxAge: expiredTime,
    httpOnly: true,
    sameSite: 'None',
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  // send refreshToken to HTTPOnly Cookies
  res.cookie('jwt', refreshToken, cookieOptions);

  res.status(200).json({
    status: 'success',
    data: {
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
    },
  });
});

exports.refresh = catchAsync(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    throw new AppError('Unauthorized', 401);
  }

  const refreshToken = cookies.jwt;

  // verification token
  const decoded = await promisify(jwt.verify)(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  // check if user still exists
  const loggedUser = await User.findById(decoded.id);

  if (!loggedUser) {
    throw new AppError('Unauthorized', 401);
  }

  const accessToken = jwt.sign(
    { id: loggedUser._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '30s',
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      name: loggedUser.name,
      email: loggedUser.email,
      role: loggedUser.role,
      accessToken,
    },
  });
});

exports.logout = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    throw new AppError('Unauthorized', 401);
  }

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });

  res.status(200).json({
    status: 'success',
  });
};
