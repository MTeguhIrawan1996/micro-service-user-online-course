const bcrypt = require("bcrypt");
const validator = require("fastest-validator");
const createError = require("../../../utils/error");
const { Users } = require("../../../models");

const v = new validator();

module.exports = async (req, res, next) => {
  const schema = {
    email: "email|empty:false",
    password: "string|min:6",
  };
  const validate = v.validate(req.body, schema);
  const { email } = req.body;
  try {
    if (validate.length) return next(createError(400, validate));

    // cek Email
    const userEmail = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (!userEmail) return next(createError(404, "Your akun not found"));

    // Check Pass
    const isPassword = await bcrypt.compare(
      req.body.password,
      userEmail.password
    );
    if (!isPassword) return next(createError(400, "Wrong password"));

    const { password, ...otherDetails } = userEmail.dataValues;

    res.status(200).json({
      success: true,
      status: 200,
      message: "Login success",
      details: { ...otherDetails },
    });
  } catch (err) {
    next(err);
  }
};
