var express = require("express");
var router = express.Router();
const flightsCtrl = require("../controllers/flights");

router.get("/", flightsCtrl.index);
router.get("/new", flightsCtrl.new);
router.get('/show/:id', flightsCtrl.show);
router.post('/', flightsCtrl.create);
// router.delete('/tacos/:idx', flightsCtrl.deleteOne)
// router.post("/:id/destinations", flightsCtrl.addDest);

module.exports = router;
