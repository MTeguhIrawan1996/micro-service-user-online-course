const createError = require("../../../utils/error");
const { Users } = require("../../../models");

module.exports = async (req, res, next) => {
  const userIds = req.query.user_ids || [];
  const sqlOptions = {
    attributes: ["id", "name", "email", "avatar", "profession"],
  };
  try {
    // Filter berdasarkan id tertentu
    if (userIds.length) {
      sqlOptions.where = {
        id: userIds,
      };
    }
    const users = await Users.findAll(sqlOptions);
    if (!users) return next(createError(404, "User not found"));

    res.status(200).json({
      success: true,
      status: 200,
      message: "Get user success",
      details: users,
    });
  } catch (err) {
    next(err);
  }
};
