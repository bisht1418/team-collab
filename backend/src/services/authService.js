const User = require("../models/userModel");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenUtils");

exports.register = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already exists");

  const user = await User.create({ email, password });
  return { email: user.email };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

exports.refresh = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.id);
  if (!user || user.refreshToken !== token) throw new Error("Invalid refresh token");

  const newAccessToken = generateAccessToken(user._id);
  return { accessToken: newAccessToken };
};
