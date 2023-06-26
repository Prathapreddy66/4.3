const BaseController = require("./baseController");
const EventsModel = require("../models/eventsModel");
class Events extends BaseController {
  constructor() {
    super(EventsModel, Events);
  }
}
module.exports = new Events();
