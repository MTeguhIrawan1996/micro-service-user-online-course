const createError = require("../../../utils/error");
const { Users } = require("../../../models");

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await Users.findByPk(id);
    if (!user) return next(createError(404, "User not found"));

    const { password, role, ...OtherDetails } = user.dataValues;

    res.status(200).json({
      success: true,
      status: 200,
      message: "Get user success",
      details: {
        ...OtherDetails,
      },
    });
  } catch (err) {
    next(err);
  }
};
