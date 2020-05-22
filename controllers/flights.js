const Flight = require("../models/flight");

module.exports = {
  index,
  new: newFlightView,
  create,
  delete: deleteOne,
};

function deleteOne(req, res) {
  Flight.findByIdAndDelete(req.params.id, function (err, flight) {
    console.log('deleted', flight)
    res.redirect("/flights");
  });
}

function index(req, res) {
  Flight.find({}, function (err, flights) {
    res.render("flights/index", { flights: flights });
  });
}

function newFlightView(req, res) {
  res.render("flights/new");
}

function create(req, res) {
  if (!req.body.departs) {
    const defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() + 1);
    req.body.departs = defaultDate;
  }
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) res.redirect("/flights/new");
    console.log(flight);
    res.redirect("/flights");
  });
}
