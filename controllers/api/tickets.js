// const { createIndexes } = require("../../models/ticket");
const Ticket = require("../../models/ticket");

module.exports = {
  index,
  create,
  delete: deleteTicket,
  yourtickets,
  category,
  mostconfirmed,
  mostresolved,
  markerSearch,
};

async function create(req, res) {
  try {
    await Ticket.create({ ...req.body, user: req.user._id });
    res.status(200).json("Added to DB succesfully!");
  } catch (err) {
    res.status(500).json(err);
  }
}

async function index(req, res) {
  try {
    let tickets = await Ticket.find({}).sort({
      createdAt: "desc",
      // isActive: true,
    });
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteTicket(req, res) {
  try {
    let ticket = await Ticket.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully deleted");
  } catch (err) {
    res.status(500).json(err);
  }
}

async function yourtickets(req, res) {
  try {
    let tickets = await Ticket.find({
      reporter: req.params.userid,
      // isActive: true,
    });

    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function category(req, res) {
  try {
    let tickets = await Ticket.find({
      category: req.params.category,
      // isActive: true,
    });

    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json(err);
  }
}
async function mostconfirmed(req, res) {
  try {
    let tickets = await Ticket.find({}).sort({
      confirmationCount: "desc",
      // isActive: true,
    });

    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function mostresolved(req, res) {
  try {
    let tickets = await Ticket.find({}).sort({
      resolvedCount: "desc",
      // isActive: true,
    });

    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function markerSearch(req, res) {
  try {
    console.log(req.params.ticketid);
    let ticket = await Ticket.findById(req.params.ticketid);
    console.log(ticket);
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json(err);
  }
}
