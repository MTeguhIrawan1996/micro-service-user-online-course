const createError = require("../../../utils/error");
const { RefreshTokens } = require("../../../models");

module.exports = async (req, res, next) => {
  const token = req.query.refresh_token;
  try {
    const refToken = await RefreshTokens.findOne({ where: { token } });
    if (!refToken) return next(createError(400, "Token not valid"));

    res.status(200).json({
      success: true,
      status: 200,
      details: refToken,
    });
  } catch (err) {
    next(err);
  }
};
