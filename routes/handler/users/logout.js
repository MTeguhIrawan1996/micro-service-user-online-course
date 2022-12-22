const createError = require("../../../utils/error");
const { RefreshTokens, Users } = require("../../../models");

module.exports = async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const user = await Users.findByPk(user_id);
    if (!user) return next(createError(400, "User not found"));

    // const userToken = await RefreshTokens.findOne({ where: { user_id } });
    // if (!userToken)
    //   return next(createError(400, "Somthing wrong token not ready"));

    await RefreshTokens.destroy({
      where: {
        user_id: user.id,
      },
    });

    res.status(200).json({
      success: true,
      status: 200,
      message: "Logout success",
    });
  } catch (err) {
    next(err);
  }
};
