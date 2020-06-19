const Mob = require("./Mob");
const Utility = require("./Utility");

class Monster extends Mob {
	constructor(world, options) {
		super(world, {
			location: options.location,
			name: options.name,
			description: options.description,
			battle: options.battle,
			iconURL: options.iconURL,
			actionsPerRound: options.actionsPerRound
		});
		this.commandHandler;
	}
	async init() {
		await super.init()
	}
}
module.exports = Monster;