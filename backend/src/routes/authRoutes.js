const express = require("express");
const authController = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../validators/authValidator");
const { validationResult } = require("express-validator");

const router = express.Router();

const validate = (validators) => [
  ...validators,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.details = errors.array();
      return next(error);
    }
    next();
  }
];

router.post("/register", validate(registerValidator), authController.register);
router.post("/login", validate(loginValidator), authController.login);
router.post("/refresh", authController.refresh); 
router.post("/logout", authController.logout);


module.exports = router;
