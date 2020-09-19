const Base = require("./Base");
const Collection = require("./Collection");
const Action = require("./Action");
const Utility = require("./Utility");
const Mob = require("./Mob");

/**
 * Represents a battle.
 * @extends {Base}
 * @param {World} world - The world to create this battle in
 * @param {Object} options - The options to create this battle with
 */
function Battle(world, options = {}) {
	Base.call(this, world);
	/**
	 * The location where this battle is taking place
	 * @type {Location}
	 */
	this.location = this.world.locations.resolve(options.location);
	/**
	 * The name of the battle
	 * @type {String}
	 */
	this.name = options.name;
	/**
	 * All mobs participating in this battle
	 * @type {Collection<Mob>}
	 */
	this.mobs = new Collection(Mob);
	/**
	 * The current round number of this battle
	 * @type {Number}
	 */
	this.currentRound = 0;
	/**
	 * All actions that have been taken in this battle
	 * @type {Collection<Action>}
	 */
	this.actions = new Collection(Action);
	/**
	 * The amount of time all participating mobs have to perform actions before the round ends
	 * @type {Number}
	 * @default 60000 
	 */
	this.roundTimeLimit = !options.roundTimeLimit ? 60000 : options.roundTimeLimit;
	this._currentTimeout;
	/**
	 * Indicates whether the battle has started or not
	 * @type {Boolean}
	 */
	this.started = false;
	this.world.battles.add(this);
	if (this.location) this.location.battle = this;
}
Battle.prototype = Object.create(Base.prototype);

/**
 * Starts this battle
 * @async
 * @returns {void}
 */
Battle.prototype.start = async function () {
	await this.location.textChannel.send({
		embed: {
			title: "A battle has begun!"
		}
	})
	this._currentTimeout = setTimeout(this._endRound.bind(this), this.roundTimeLimit);
	this.started = true;
	await this.emit("started");
}
/**
 * Adds a mob to this battle
 * @async
 * @param {MobResolvable} mobResolvable
 * @returns {void}
 */
Battle.prototype.addMob = async function (mobResolvable) {
	let mob = this.world.mobs.resolve(mobResolvable);
	if (!Utility.defined(mob)) throw new Error("Missing required option: mobResolvable");
	if (mob.location != this.location) await mob.move(this.location);
	this.mobs.add(mob);
	mob.battle = this;
	if (this.started) {
		await this.location.textChannel.send({
			embed: {
				author: {
					name: mob.name,
					iconURL: mob.iconURL
				},
				description: `joined the battle.`
			}
		});
	}
	await this.emit("mobJoined", mob);
}
/**
 * Removes a mob from this battle
 * @async
 * @param {MobResolvable} mobResolvable
 * @returns {void}
 */
Battle.prototype.removeMob = async function (mobResolvable) {
	let mob = this.world.mobs.resolve(mobResolvable);
	if (!Utility.defined(mob)) throw new Error("Missing required option: mobResolvable");
	this.mobs.remove(mob);
	mob.battle = undefined;
	if (this.started) {
		await this.location.textChannel.send({
			embed: {
				author: {
					name: mob.name,
					iconURL: mob.iconURL
				},
				description: `left the battle.`
			}
		});
	}
	await this.emit("mobLeft", mob);
}
/**
 * Deletes this battle
 * @async
 * @returns {void}
 */
Battle.prototype.delete = async function () {
	for (let mob of this.mobs) {
		mob[1].battle = undefined;
	}
	for (let action of this.actions) {
		action[1].battle = undefined;
	}
	this.mobs.remove();
	this.actions.remove();
	this.location.battle = undefined;
	this.location = undefined;
	this.world.battles.remove(this);
	this.deleted = true;
}
Battle.prototype._registerAction = async function (action) {
	action.battle = this;
	this.actions.add(action);
	action.mob.actionsTakenThisRound++;
	await this.emit("actionTaken", action);
	if (this.mobs.every((value, key, map) => value.actionsTakenThisRound == value.actionsPerRound)) {
		await this._endRound();
	}
	return true;
}
Battle.prototype._endRound = async function () {
	clearTimeout(this._currentTimeout);
	debugger;
	for (let mob of this.mobs) {
		mob[1].takenActionThisRound = false;
	}
	this.currentRound++;
	await this.emit("roundEnd");
	this._currentTimeout = setTimeout(this._endRound.bind(this), this.roundTimeLimit);
}

module.exports = Battle;

/**
 * Emitted when a round has ended
 * @event Battle#roundEnd
 */

/**
 * Emitted when an action is taken
 * @event Battle#actionTaken
 * @param {Action} action
 */

/**
 * Emitted when a mob joins this battle
 * @event Battle#mobJoined
 * @param {Mob} mob
 */

/**
 * Emitted when a mob leaves this battle
 * @event Battle#mobLeft
 * @param {Mob} mob
 */

/**
 * Emitted when this battle starts
 * @event Battle#started
 */