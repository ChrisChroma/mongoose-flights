const flight = require('../models/flight');

module.exports = {
    index,
    new: newFlightView,
    create
}

function index(req, res) {
    res.render('/flights/index');
}

function newFlightView(req, res) {
    res.render('flights/new');
}

function create(req, res){
    
}