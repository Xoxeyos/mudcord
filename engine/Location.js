const Base = require("./Base");
const Player = require("./Player");
const Collection = require("./Collection");
const Utility = require("./Utility");
const Mob = require("./Mob");
const Monster = require("./Monster");
const Action = require("./Action");
const Battle = require("./Battle");

/**
 * Represents a location
 * @extends {Base}
 * @param {World} world
 * @param {Object} options
 */
function Location(world, options = {}) {
	return (async () => {
		if (!options.locations) options.locations = new Collection(Location);

		Base.call(this, world);
		/**
		 * Indicates whether this location has been generated
		 * @type {Boolean}
		 */
		this.generated = false;
		/**
		 * All mobs currently at this location
		 * @type {Collection<Mob>}
		 */
		this.mobs = new Collection(Mob);
		/**
		 * All actions taken at this location
		 * @type {Collection<Action>}
		 */
		this.actions = new Collection(Action);
		this.battle = null;
		/**
		 * The role associated with this location
		 * @type {Role}
		 */
		this.role = null;
		/**
		 * The category associated with this location
		 * @type {CategoryChannel}
		 */
		this.category = null;
		/**
		 * The text channel associated with this location
		 * @type {TextChannel}
		 */
		this.textChannel = null;
		/**
		 * The voice channel associated with this location
		 * @type {VoiceChannel}
		 */
		this.voiceChannel = null;
		/**
		 * The channel used as a separator between the button channels and the voice/text channels
		 * @type {TextChannel}
		 */
		this.spacerChannel = null;
		/**
		 * The name of the location
		 * @type {String}
		 */
		this.name = options.name;
		/**
		 * Any and all locations attached to this location
		 * @type {Collection<Location>}
		 */
		this.locations = options.locations;
		/**
		 * Contains all the voice channel buttons for moving between locations
		 * @type {Collection}
		 */
		this.buttons = new Collection();
		this.world.locations.add(this);
		await this.generate();
	})();
}
Location.prototype = Object.create(Base.prototype);

/**
 * Creates the role and channels for this location and links the associated locations to the newly created button channels
 * @async
 * @returns {void} 
 */
Location.prototype.generate = async function () {
	if (this.generated) throw new Error("Location must not be generated to be generated");
	this.role = await this.guild.roles.create({
		data: {
			name: this.name
		}
	});
	this.category = await this.guild.channels.create(this.name, {
		type: "category",
		permissionOverwrites: [{
			id: this.role,
			allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
			deny: ["READ_MESSAGE_HISTORY", "EMBED_LINKS", "ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "SEND_TTS_MESSAGES", "ADD_REACTIONS"]
		}, {
			id: this.guild.roles.everyone,
			deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "CONNECT"]
		}]
	});
	this.textChannel = await this.guild.channels.create("text", {
		type: "text",
		parent: this.category,
		position: 1
	});
	this.voiceChannel = await this.guild.channels.create("voice", {
		type: "voice",
		parent: this.category,
		position: 2
	});
	if (this.locations.size > 0) {
		this.spacerChannel = await this.guild.channels.create("──────────────", {
			type: "voice",
			parent: this.category,
			permissionOverwrites: [{
				id: this.role,
				allow: ["VIEW_CHANNEL"],
				deny: ["SEND_MESSAGES", "CONNECT", "SPEAK"]
			}, {
				id: this.guild.roles.everyone,
				deny: ["SEND_MESSAGES", "CONNECT", "SPEAK", "VIEW_CHANNEL"]
			}],
			position: 3
		});
	}
	for (let location of this.locations) {
		await this._addLocationButton(location);
	}
	for (let mob of this.mobs) {
		if (mob[1] instanceof Player) {
			await mob[1].guildMember.roles.add(this.role);
			if (mob[1].guildMember.voice.speaking != null) {
				await mob[1].guildMember.voice.setChannel(this.voiceChannel);
			}
			await this.textChannel.send({
				embed: {
					description: `${mob[1].name} enters.`
				}
			});
		}
	}
	this.generated = true;
	await this.emit("generated");
}
/**
 * Reverses the effects of the `generate()` method
 * @async
 * @returns {Promise}
 */
Location.prototype.ungenerate = async function () {
	if (!this.generated) throw new Error("Location must be generated to ungenerate");
	for (let button of this.buttons) {
		await button[1].delete();
	}
	await this.textChannel.delete();
	await this.voiceChannel.delete();
	if (this.spacerChannel) await this.spacerChannel.delete();
	await this.category.delete();
	await this.role.delete();
	this.generated = false;
	await this.emit("ungenerated");
}
Location.prototype._registerAction = async function (action) {
	action.location = this;
	this.actions.add(action);
	await this.textChannel.send({
		embed: {
			author: {
				name: action.mob.name,
				iconURL: action.mob.iconURL
			},
			description: action.actionString
		}
	});
	await this.emit("actionTaken", action);
}
/**
 * Creates a battle at this location
 * @param {String} name - The name of the battle
 * @param {Object} options - The options for this battle
 * @async
 * @returns {Promise<Battle>}
 *
Location.prototype.createBattle = async function (name, options) {
	let battle = new Battle(this.world, {
		location: this,
		name: name,
		roundTimeLimit: Utility.defined(options) ? options.roundTimeLimit : undefined
	});
	battle.init();
	return battle;
}
/**
 * Creates a player at this location
 * @param {String} name - The name of the player
 * @param {Object} options - The options for this player
 * @async
 * @returns {Promise<Player>}
 *
Location.prototype.createPlayer = async function (name, options) {
	let player = new Player(this.world, {
		location: this,
		name: name,
		description: Utility.defined(options) ? options.description : undefined,
		iconURL: Utility.defined(options) ? options.iconURL : undefined,
		actionsPerRound: Utility.defined(options) ? options.actionsPerRound : undefined,
		guildMember: Utility.defined(options) ? options.guildMember : undefined
	});
	await player.move(this);
	return player;
}
/**
 * Creates a monster at this location
 * @async
 * @param {String} name - The name of the monster
 * @param {Object} options - The options for this monster
 * @returns {Promise<Monster>}
 *
Location.prototype.createMonster = async function (name, options) {
	let monster = new Monster(this.world, {
		location: this,
		name: name,
		description: Utility.defined(options) ? options.description : undefined,
		iconURL: Utility.defined(options) ? options.iconURL : undefined,
		actionsPerRound: Utility.defined(options) ? options.actionsPerRound : undefined
	});
	await monster.init();
	return monster;
}*/
Location.prototype._addLocationButton = async function (location) {
	let button = await this.guild.channels.create(location.name, {
		type: "voice",
		parent: this.category,
		permissionOverwrites: [{
			id: this.role,
			allow: ["VIEW_CHANNEL", "CONNECT"],
			deny: ["SPEAK"]
		}, {
			id: this.guild.roles.everyone,
			deny: ["SEND_MESSAGES", "CONNECT", "SPEAK", "VIEW_CHANNEL"]
		}],
		position: count
	});
	this.buttons.add(button);
	let world = location.world;
	let voiceStateFunc = async (oldState, newState) => {
		if (button.deleted) return;
		if (newState.channel == location.guild.channels.resolve(button)) {
			for (let mob of world.mobs) {
				if (mob[1] instanceof Player) {
					if (newState.member == world.guild.members.resolve(mob[1].guildMember)) {
						mob[1].location = location;
					}
				}
			}
		}
	};
	world.bot.on("voiceStateUpdate", voiceStateFunc);
	return button;
}
/**
 * Places a location next to this one
 * @param {LocationResolvable} locationResolvable - The location to attach
 * @async
 * @returns {Promise}
 */
Location.prototype.attach = async function (locationResolvable) {
	if (!locationResolvable) throw new Error(`Requires a location.`);
	let location = this.world.locations.resolve(location);
	this.locations.add(location);
	if (this.generated) {
		await this._addLocationButton(this[buttonString], this[direction]);
	}
}
/**
 * Sends a message to the `textChannel` property channel
 * @param {String} message - The message text
 * @async
 * @returns {Promise<Message>}
 */
Location.prototype.message = async function (message) {
	if (!this.generated) throw new Error(`Location not generated.`);
	if (!message) throw new Error(`Requires a string.`);
	let actualMessage = await this.textChannel.send({
		embed: {
			description: message
		}
	});
	return actualMessage;
}
/**
 * Deletes this location and all references to it
 * @async
 * @returns {Promise}
 */
Location.prototype.delete = async function () {
	this.mobs.remove();
	this.items.remove();
	this.actions.remove();
	this.battles.remove();
	this.world.locations.remove(this);
	this.deleted = true;
}


module.exports = Location;

/**
 * Emitted when this location is generated
 * @event Location#generated
 */

/**
 * Emitted when this location is ungenerated
 * @event Location#ungenerated
 */

/**
 * Emitted when an action is taken at this location
 * @event Location#actionTaken
 * @param {Action} [action] - The action that was taken
 */

/**
 * Emitted when a mob leaves this location
 * @event Location#mobLeft
 * @param {Mob} [mob] - The mob that left this location
 */

/**
 * Emitted when a mob joins this location
 * @event Location#mobJoined
 * @param {Mob} [mob] - The mob that joined this location
 */