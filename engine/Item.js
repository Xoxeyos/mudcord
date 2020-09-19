const Base = require("./Base");
const Utility = require("./Utility");
const CommandHandler = require("./CommandHandler");

/**
 * Represents an item
 * @extends {Base}
 * @param {World} world - The world to create this item in
 * @param {Object} options - The options to create this item with
 */
function Item(world, options = {}) {
	return (async () => {
		Base.call(this, world);
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
		this.commandHandler = await CommandHandler({ _this: this, condition: (message) => this.mob ? this.mob.guildMember.id : null == message.member.id });
	
		this.world.items.add(this);
		if (this.mob) this.mob.items.add(this);
		if (this.location) this.location.items.add(this);
		return this;
	})();
}
/**
 * Deletes this item and all references to it
 * @async
 * @return {void}
 */
Item.prototype.delete = async function () {
	this.mob.items.remove(this);
	this.location.items.remove(this);
	this.world.items.remove(this);
}

module.exports = Item;