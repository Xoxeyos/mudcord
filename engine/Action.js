const Base = require("./Base");
const Utility = require("./Utility");

/**
 * Represents an action performed by a mob entity
 * @extends {Base}
 */
class Action extends Base {
	/**
	 * @param  {World} world - The world in which this action should be performed
	 * @param  {Action} options - The options to create this action with
	 */
	constructor(world, options) {
		super(world);
		/**
		 * The mob that performed this action
		 * @type {Mob}
		 */
		this.mob = options.mob;
		/**
		 * The location where this action was performed
		 * @type {Location}
		 */
		this.location = options.location;
		/**
		 * A description of the action (this is what the end-user sees)
		 * @type {String}
		 */
		this.actionString = options.actionString;
		/**
		 * The battle in which this action was performed (if any)
		 * @type {Battle}
		 */
		this.battle = options.battle;
	}
	/**
	 * The builder function. This must be called after construction and before using the instance of this class
	 * @returns {void}
	 */
	init() {
		this.world.actions.add(this);
		if (Utility.defined(this.location)) this.location.actions.add(this);
		if (Utility.defined(this.mob)) this.mob.actions.add(this);
		if (Utility.defined(this.battle)) this.battle.actions.add(this);
	}
	/**
	 * Deletes this action and all references to it
	 * @return {void}
	 */
	delete() {
		this.world.actions.remove(this);
		if (Utility.defined(this.location)) this.location.actions.remove(this);
		if (Utlility.defined(this.mob)) this.mob.actions.remove(this);
		if (Utility.defined(this.battle)) this.battle.actions.remove(this);
	}
}
module.exports = Action;