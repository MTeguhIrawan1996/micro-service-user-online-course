const router = require("express").Router();
const refreshTokensHandler = require("./handler/refreshTokens");

router.post("/created", refreshTokensHandler.create);
router.get("/getToken", refreshTokensHandler.getToken);

module.exports = router;
