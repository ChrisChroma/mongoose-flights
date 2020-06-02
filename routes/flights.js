var express = require("express");
var router = express.Router();
const flightsCtrl = require("../controllers/flights");

router.get("/", flightsCtrl.index);
router.get("/new", flightsCtrl.new);
router.get("/show/:id", flightsCtrl.show);
router.post("/", flightsCtrl.create);
router.post("/show/:id", flightsCtrl.addDest);
router.get("/:id/tickets/new", flightsCtrl.newTicket);
router.post("/:id/tickets/new", flightsCtrl.createNewTicket);

module.exports = router;
