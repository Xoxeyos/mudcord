const Mob = require("./Mob");
const Utility = require("./Utility");

/**
 * Represents a monster (a non-player-controlled mob)
 * @extends {Mob}
 * @param  {World} world - The world to create this monster in
 * @param  {Object} options - The options to create this monster with
 */
function Monster(world, options) {
	return (async () => {
		await Mob.call(this, world, options);
		return this;
	})();
}
Monster.prototype = Object.create(Mob.prototype);

module.exports = Monster;