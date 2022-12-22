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
    avatar: "string|optional",
  };
  const validate = v.validate(req.body, schema);
  try {
    if (validate.length) {
      return next(createError(400, validate));
    }
    // cek User
    const id = req.params.id;
    const user = await Users.findByPk(id);
    if (!user) return next(createError(404, "Akun not found"));

    const { email, name, profession, avatar } = req.body;
    if (email) {
      const checkEmail = await Users.findOne({
        where: { email },
      });
      if (checkEmail && email !== user.email)
        return next(createError(404, "Email alredy exist"));
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = await user.update({
      password: hash,
      email,
      name,
      profession,
      avatar,
    });
    const { password, role, ...OtherDetails } = newUser.dataValues;

    res.status(200).json({
      success: true,
      status: 200,
      message: "Update success",
      details: { ...OtherDetails },
    });
  } catch (err) {
    next(err);
  }
};
