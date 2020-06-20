const Base = require("./Base");
const Utility = require("./Utility");
const CommandHandler = require("./CommandHandler");

/**
 * Represents an item
 * @extends {Base}
 */
class Item extends Base {
	/**
	 * @param {World} world - The world to create this item in
	 * @param {Object} options - The options to create this item with
	 */
	constructor(world, options) {
		super(world);
		/**
		 * The name of this item
		 * @type {String}
		 */
		this.name = options.name;
		/**
		 * A short description of the item
		 * @type {String}
		 */
		this.description = options.description;
		/**
		 * The mob who possesses this item (if any)
		 * @type {Mob}
		 */
		this.mob = this.world.mobs.resolve(options.mob);
		/**
		 * The location this item is currently at
		 * @type {Location}
		 */
		this.location = this.world.locations.resolve(options.location);
		/**
		 * The CommandHandler for this item
		 */
		this.commandHandler;
	}
	/**
	 * The builder function. This must be called after construction and before using the instance of this class
	 * @async
	 * @return {void}
	 */
	async init() {
		this.world.items.add(this);
		if (Utility.defined(this.mob)) this.mob.items.add(this);
		if (Utility.defined(this.location)) this.location.items.add(this);
		this.commandHandler = new CommandHandler({ _this: this, condition: (message) => Utility.defined(this.mob) ? this.mob.guildMember.id : null == message.member.id})
	}
	/**
	 * Deletes this item and all references to it
	 * @async
	 * @return {void}
	 */
	async delete () {
		this.mob.items.remove(this);
		this.location.items.remove(this);
		this.world.items.remove(this);
	}
}

module.exports = Item;