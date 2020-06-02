const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
  index,
  new: newFlightView,
  create,
  show,
  addDest,
  newTicket,
  createNewTicket,
};

function createNewTicket(req, res) {
  const flightId = req.params.id;
  Flight.findById(flightId, function () {
    Ticket.create(
      { seat: req.body.seat, flight: req.body.flight, price: req.body.price },
      function (err) {
        if (err) console.error(err);
      }
    );
  });
  res.redirect(`/flights/show/${flightId}`);
}

function newTicket(req, res) {
  console.log(req.params);
  res.render("tickets/new", { flightId: req.params.id });
}

function show(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    Ticket.find({ flight: flight._id }, function (err, tickets) {
      res.render("flights/show", { flight, tickets });
    });
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

function addDest(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    console.log("flight", req.body);
    flight.destinations.push(req.body);
    flight.save(function (err) {
      console.error(err);
      if (err) res.redirect("/flights/show/" + flight._id);
    });
    res.redirect("/flights/show/" + flight._id);
  });
}
