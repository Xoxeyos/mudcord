const Base = require("./Base");
const Utility = require("./Utility");

class Action extends Base {
	constructor(world, options) {
		super(world);
		this.mob = options.mob;
		this.location = options.location;
		this.actionString = options.actionString;
		this.battle = options.battle;
	}
	init() {
		this.world.actions.add(this);
		if (Utility.defined(this.location)) this.location.actions.add(this);
		if (Utility.defined(this.mob)) this.mob.actions.add(this);
		if (Utility.defined(this.battle)) this.battle.actions.add(this);
	}
	delete() {
		this.world.actions.remove(this);
		if (Utility.defined(this.location)) this.location.actions.remove(this);
		if (Utlility.defined(this.mob)) this.mob.actions.remove(this);
		if (Utility.defined(this.battle)) this.battle.actions.remove(this);
	}
}
module.exports = Action;