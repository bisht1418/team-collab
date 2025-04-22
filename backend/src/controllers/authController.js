const authService = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ status: "success", data: result });
  } catch (err) {
    err.statusCode = err.statusCode || 400;
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    err.statusCode = err.statusCode || 401;
    next(err);
  }
};


exports.logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

        const user = await User.findOne({ refreshToken });

        if (!user) return res.status(403).json({ message: "Invalid refresh token" });

        user.refreshToken = null;
        await user.save();

        return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        next(err);
    }
};


exports.refresh = async (req, res, next) => {
    try {
        const result = await authService.refresh(req.body.refreshToken);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
