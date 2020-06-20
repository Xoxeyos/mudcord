const Mob = require("./Mob");
const Utility = require("./Utility");

/**
 * Represents a monster (a non-player-controlled mob)
 * @extends {Mob}
 */
class Monster extends Mob {
	/**
	 * @param  {World} world - The world to create this monster in
	 * @param  {Object} options - The options to create this monster with
	 */
	constructor(world, options) {
		super(world, {
			location: options.location,
			name: options.name,
			description: options.description,
			battle: options.battle,
			iconURL: options.iconURL,
			actionsPerRound: options.actionsPerRound
		});
	}
	/**
	 * The builder function. This must be called after construction and before using the instance of this class
	 * @returns {Promise}
	 * @async
	 */
	async init() {
		await super.init()
	}
}
module.exports = Monster;