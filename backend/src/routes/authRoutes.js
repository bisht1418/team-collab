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
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.post("/register", validate(registerValidator), authController.register);
router.post("/login", validate(loginValidator), authController.login);
router.post("/refresh", authController.refresh); 
router.post("/logout", authController.logout);


module.exports = router;
