const AsyncEventEmitter = require('asynchronous-emitter');
const Utility = require("./Utility");

/**
 * The base class for most other classes
 * @extends {AsyncEventEmitter}
 * @abstract
 */
class Base extends AsyncEventEmitter {
  /**
   * @param  {World} world - The world that this ojbect should be attached to
   */
  constructor(world) {
    super();
    if (!Utility.defined(world)) throw new Error("No world object specified.");
    /**
     * A unique identifier
     * @type {String}
     */
    this.id = Utility.randomID(18);
    /**
     * The world associated with this object
     * @type {World}
     */
    this.world = world;
    /**
     * Whether this object has been deleted or not
     * @type {Boolean}
     */
    this.deleted = false;
  }
  /**
   * The guild associated with this object
   * @type {Guild}
   */
  get guild() {
    return this.world.guild;
  }
}

module.exports = Base;