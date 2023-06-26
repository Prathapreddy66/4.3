var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");
const eventsController = require("../controllers/eventsController");

router.post("/add-event", async (req, res) => {
  data = req.body;
  data.event_id = uuidv4();
  eventsController.create(data, (err, eventResponse) => {
    if (err) {
      return res.send({ response: err });
    }
    res.send({
      response: eventResponse,
    });
  });
});

router.post("/update-event", (req, res) => {
  let data = req.body;
  eventsController.findOneAndUpdate(
    { event_id: req.body.event_id },
    data,
    (err, updatedEvent) => {
      if (err) {
        return res.send({ response: err });
      }
      res.send({
        response: updatedEvent,
      });
    }
  );
});

router.get("/find-event/:id", (req, res) => {
  eventsController.find({ event_id: req.params.id }, (err, eventDetails) => {
    if (err) {
      return res.send({ response: err });
    }
    res.json({
      response: eventDetails,
    });
  });
});

router.post("/delete-event", (req, res) => {
  eventsController.findOneAndRemove(
    { event_id: req.body.event_id },
    (err, deletedEvent) => {
      if (err) {
        return res.send({ response: err });
      }

      res.send({
        response: deletedEvent,
      });
    }
  );
});

router.get("/find-all-events", (req, res) => {
  eventsController.find({}, (err, allEventDetails) => {
    if (err) {
      return res.send({ response: err });
    }
    res.json({
      response: allEventDetails,
    });
  });
});

module.exports = router;
