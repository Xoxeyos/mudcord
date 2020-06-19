const Base = require("./Base");
const Utility = require("./Utility");

class Item extends Base {
	constructor(world, options) {
		super(world);
		this.name = options.name;
		this.description = options.description;
		this.mob = this.world.mobs.resolve(options.mob);
		this.location = this.world.locations.resolve(options.location);
	}
	//"build" function
	async init() {
		this.world.items.add(this);
		if (Utility.defined(this.mob)) this.mob.items.add(this);
		if (Utility.defined(this.location)) this.location.items.add(this);
	}
	async delete () {
		this.mob.items.remove(this);
		this.location.items.remove(this);
		this.world.items.remove(this);
	}
}

module.exports = Item;