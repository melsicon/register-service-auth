const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const users = require("../users");

router.get("/", (req, res) => {
  res.send("Register API");
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const { email, firstName, lastName, password } = req.body;

  if (users.find((user) => user.email === email)) {
    return res.status(400).send({ message: "User already registered." });
  }

  const salt = await bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(password, salt);

  users.push({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return res.status(200).send({ message: "User successfully registered." });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().min(6).max(320).lowercase().trim().required(),
    firstName: Joi.string().min(2).max(255).trim().required(),
    lastName: Joi.string().min(2).max(255).trim().required(),
    password: Joi.string().min(8).max(128).required(),
    confirmPassword: Joi.valid(Joi.ref("password")).required(),
  });

  return schema.validate(req);
}

module.exports = router;
