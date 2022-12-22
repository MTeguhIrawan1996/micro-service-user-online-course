const bcrypt = require("bcrypt");
const validator = require("fastest-validator");
const createError = require("../../../utils/error");
const { Users } = require("../../../models");

const v = new validator();

module.exports = async (req, res, next) => {
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    confirmPassword: {
      type: "equal",
      field: "password",
    },
    profession: "string|optional",
  };
  const validate = v.validate(req.body, schema);
  const { name, email, password, profession } = req.body;
  try {
    if (validate.length) return next(createError(400, validate));

    const userEmail = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (userEmail) return next(createError(409, "Email already exist"));

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new Users({
      name,
      email,
      password: hash,
      profession,
      role: "student",
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      status: 200,
      message: "Register success",
      details: {
        id: newUser.id,
      },
    });
  } catch (err) {
    next(err);
  }
};
