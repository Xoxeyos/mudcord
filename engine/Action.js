const Base = require("./Base");
const Utility = require("./Utility");

/**
 * Represents an action performed by a mob entity
 * @extends {Base}
 * @param  {World} world - The world in which this action should be performed
 * @param  {String} string - The string describing this action
 * @param  {Action} options - The options to create this action with
 */
function Action(world, string, options = {}) {
	Base.call(this);
	/**
	 * The mob that performed this action
	 * @type {Mob}
	 */
	this.mob = null;
	/**
	 * The location where this action was performed
	 * @type {Location}
	 */
	this.location = null;
	/**
	 * A description of the action (this is what the end-user sees)
	 * @type {String}
	 */
	this.string = string;
	/**
	 * The battle in which this action was performed (if any)
	 * @type {Battle}
	 */
	this.battle = null;

	this.world.actions.add(this);
}

/**
 * Deletes this action and all references to it
 * @return {void}
 */
Item.prototype.delete = function () {
	this.world.actions.remove(this);
	if (Utility.defined(this.location)) this.location.actions.remove(this);
	if (Utlility.defined(this.mob)) this.mob.actions.remove(this);
	if (Utility.defined(this.battle)) this.battle.actions.remove(this);
}
module.exports = Action;