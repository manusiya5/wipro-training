const express = require("express");

const controller = require("../controllers/orderController");
const router = express.Router();
const { validateOrder } = require("../middleware/validateOrder");

router.post("/placeorder", validateOrder, controller.placeOrder);

module.exports = router;
