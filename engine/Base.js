const AsyncEventEmitter = require('asynchronous-emitter');
const Utility = require("./Utility");

class Base extends AsyncEventEmitter {
  constructor(world) {
    super();
    if (!Utility.defined(world)) throw new Error("No world object specified.");
    this.id = Utility.randomID(18);
    this.world = world;
    this.deleted = false;
  }
  get guild() {
    return this.world.guild;
  }
}

module.exports = Base;