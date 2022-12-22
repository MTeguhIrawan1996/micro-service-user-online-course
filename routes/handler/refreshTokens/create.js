const createError = require("../../../utils/error");
const { RefreshTokens, Users } = require("../../../models");
const validator = require("fastest-validator");
const v = new validator();

module.exports = async (req, res, next) => {
  const { user_id, token } = req.body;
  const schema = {
    token: "string",
    user_id: "number",
  };
  try {
    const validate = v.validate(req.body, schema);
    if (validate.length) return next(createError(400, validate));

    const user = await Users.findByPk(user_id);
    if (!user) return next(createError(404, "User not found"));

    // const userToken = await RefreshTokens.findOne({ where: { user_id } });
    // if (userToken) return next(createError(400, "Somthing wrong token alredy"));

    const newRT = await RefreshTokens.create({
      token,
      user_id,
    });

    res.status(200).json({
      success: true,
      status: 200,
      message: "Created success",
      details: {
        id: newRT.id,
      },
    });
  } catch (err) {
    next(err);
  }
};
