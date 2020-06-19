const Base = require("./Base");
const Utility = require("./Utility");
const CommandHandler = require("./CommandHandler");

class Item extends Base {
	constructor(world, options) {
		super(world);
		this.name = options.name;
		this.description = options.description;
		this.mob = this.world.mobs.resolve(options.mob);
		this.location = this.world.locations.resolve(options.location);
		this.commandHandler;
	}
	//"build" function
	async init() {
		this.world.items.add(this);
		if (Utility.defined(this.mob)) this.mob.items.add(this);
		if (Utility.defined(this.location)) this.location.items.add(this);
		this.commandHandler = new CommandHandler({ _this: this, condition: (message) => Utility.defined(this.mob) ? this.mob.guildMember.id : null == message.member.id})
	}
	async delete () {
		this.mob.items.remove(this);
		this.location.items.remove(this);
		this.world.items.remove(this);
	}
}

module.exports = Item;