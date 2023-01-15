const express = require("express");
const router = express.Router();
const coinController = require("../controller/coinController");

router.get("/assets", coinController.getCoins);
router.all("/*", function (req, res) {
    res.status(400).send({ status: false, message: "Please Enter a valid URL." });
})


module.exports = router;