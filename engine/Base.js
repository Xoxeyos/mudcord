const Utility = require("./Utility");
const AsyncEventEmitter = Utility.AsyncEventEmitter;

/**
 * The base class for most other classes
 * @extends {AsyncEventEmitter}
 * @abstract
 * @param  {World} world - The world that this ojbect should be attached to
 */
function Base(world) {
	if (!world) throw new Error("No world object specified.");

	AsyncEventEmitter.call(this);
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
	/**
	 * The guild associated with this object
	 * @type {Guild}
	 */
	this.guild = this.world.guild;
	return this;
}
Base.prototype = Object.create(AsyncEventEmitter.prototype);

module.exports = Base;