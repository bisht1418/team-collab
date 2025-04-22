const User = require("../models/userModel");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenUtils");

exports.register = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.create({ email, password });
  return { email: user.email };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};
