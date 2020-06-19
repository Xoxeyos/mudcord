const Base = require("./Base");
const Player = require("./Player");
const Collection = require("./Collection");
const Utility = require("./Utility");
const Mob = require("./Mob");
const Monster = require("./Monster");
const Action = require("./Action");
const Item = require("./Item");
const Battle = require("./Battle");

/**
 * Represents a location
 * @extends {Base}
 */
class Location extends Base {
	/**
	 * @param {World} world
	 * @param {Object} options
	 */
	constructor(world, options) {
		super(world);
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
		/**
		 * All items currently at this location
		 * @type {Collection<Item>}
		 */
		this.items = new Collection(Item);
		/**
		 * The battle currently taking place at this location (if there is one)
		 * @type {Battle}
		 */
		this.battle;
		/**
		 * The role associated with this location
		 * @type {Role}
		 */
		this.role;
		/**
		 * The category associated with this location
		 * @type {CategoryChannel}
		 */
		this.category;
		/**
		 * The text channel associated with this location
		 * @type {TextChannel}
		 */
		this.textChannel;
		/**
		 * The voice channel associated with this location
		 * @type {VoiceChannel}
		 */
		this.voiceChannel;
		/**
		 * The channel used as a separator between the button channels and the voice/text channels
		 * @type {TextChannel}
		 */
		this.spacerChannel;
		/**
		 * The name of the location
		 * @type {String}
		 */
		this.name = options.name;
		/**
		 * The location positioned north of this one
		 * @type {Location}
		 */
		this.north = this.world.locations.resolve(options.north);
		/**
		 * The location positioned south of this one
		 * @type {Location}
		 */
		this.south = this.world.locations.resolve(options.south);
		/**
		 * The location positioned east of this one
		 * @type {Location}
		 */
		this.east = this.world.locations.resolve(options.east);
		/**
		 * The location positioned west of this one
		 * @type {Location}
		 */
		this.west = this.world.locations.resolve(options.west);
		/**
		 * The location positioned above this one
		 * @type {Location}
		 */
		this.up = this.world.locations.resolve(options.up);
		/**
		 * The location positioned below this one
		 * @type {Location}
		 */
		this.down = this.world.locations.resolve(options.down);
		/**
		 * The voice channel being used as button to move between this location and the one north of it
		 * @type {VoiceChannel}
		 */
		this.buttonNorth;
		/**
		 * The voice channel being used as button to move between this location and the one south of it
		 * @type {VoiceChannel}
		 */
		this.buttonSouth;
		/**
		 * The voice channel being used as button to move between this location and the one east of it
		 * @type {VoiceChannel}
		 */
		this.buttonEast;
		/**
		 * The voice channel being used as button to move between this location and the one west of it
		 * @type {VoiceChannel}
		 */
		this.buttonWest;
		/**
		 * The voice channel being used as button to move between this location and the one above it
		 * @type {VoiceChannel}
		 */
		this.buttonUp;
		/**
		 * The voice channel being used as button to move between this location and the one below it
		 * @type {VoiceChannel}
		 */
		this.buttonDown;
	}
	/**
	 * The builder function. This must be called after construction and before using the instance of this class
	 */
	init() {
		this.world.locations.add(this);
		if (Utility.defined(this.battle)) this.battle._location = this;
	}
	/**
	 * Creates the role and channels for this location and links the associated locations to the newly created button channels
	 * @async
	 * @returns {void} 
	 */
	async generate() {
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
		this.spacerChannel = await this.guild.channels.create("──────────────", {
			type: "voice",
			parent: this.category,
			permissionOverwrites: [{
				id: this.role,
				allow: [, "VIEW_CHANNEL"],
				deny: ["SEND_MESSAGES", "CONNECT", "SPEAK"]
			}, {
				id: this.guild.roles.everyone,
				deny: ["SEND_MESSAGES", "CONNECT", "SPEAK", "VIEW_CHANNEL"]
			}],
			position: 3
		});
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
		if (Utility.defined(this.north)) await this.attach(this.north, "north");
		if (Utility.defined(this.south)) await this.attach(this.south, "south");
		if (Utility.defined(this.west)) await this.attach(this.west, "west");
		if (Utility.defined(this.east)) await this.attach(this.east, "east");
		if (Utility.defined(this.down)) await this.attach(this.down, "down");
		if (Utility.defined(this.up)) await this.attach(this.up, "up");
	}
	/**
	 * Reverses the effects of the `generate()` method
	 * @async
	 * @returns {void}
	 */
	async ungenerate() {
		if (!this.generated) throw new Error("Location must be generated to ungenerate");
		if (Utility.defined(this.buttonDown)) await this.buttonDown.delete();
		if (Utility.defined(this.buttonUp)) await this.buttonUp.delete();
		if (Utility.defined(this.buttonWest)) await this.buttonWest.delete();
		if (Utility.defined(this.buttonEast)) await this.buttonEast.delete();
		if (Utility.defined(this.buttonSouth)) await this.buttonSouth.delete();
		if (Utility.defined(this.buttonNorth)) await this.buttonNorth.delete();
		await this.textChannel.delete();
		await this.voiceChannel.delete();
		if (Utility.defined(this.spacerChannel)) await this.spacerChannel.delete();
		await this.category.delete();
		await this.role.delete();
		this.generated = false;
		await this.emit("ungenerated");
	}
	async _registerAction(action) {
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
	 * @returns {Battle}
	 */
	async createBattle(name, options) {
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
	 * @returns {Player}
	 */
	async createPlayer(name, options) {
		let player = new Player(this.world, {
			location: this,
			name: name,
			description: Utility.defined(options) ? options.description : undefined,
			iconURL: Utility.defined(options) ? options.iconURL : undefined,
			actionsPerRound: Utility.defined(options) ? options.actionsPerRound : undefined,
			guildMember: Utility.defined(options) ? options.guildMember : undefined
		});
		await player.init();
		return player;
	}
	/**
	 * Creates a monster at this location
	 * @async
	 * @param {String} name - The name of the monster
	 * @param {Object} options - The options for this monster
	 * @returns {Monster}
	 */
	async createMonster(name, options) {
		let monster = new Monster(this.world, {
			location: this,
			name: name,
			description: Utility.defined(options) ? options.description : undefined,
			iconURL: Utility.defined(options) ? options.iconURL : undefined,
			actionsPerRound: Utility.defined(options) ? options.actionsPerRound : undefined
		});
		await monster.init();
		return monster;
	}
	/**
	 * Creates a item at this location
	 * @async
	 * @param {String} name - The name of the item
	 * @param {Object} options - The options for this item
	 * @returns {Item}
	 */
	async createItem(name, options) {
		let item = new Item(this.world, {
			location: this,
			name: name,
			description: Utility.defined(options) ? options.description : undefined,
		})
		item.init();
		return item;
	}
	/**
	 * Places a location next to this one in a specified direction
	 * @param {Location} location - The location to place
	 * @param {String} direction - One of the following directions: "up", "down", "north", "east", "south", or "west"
	 * @async
	 * @returns {void}
	 */
	async attach(location, direction) {
		if (!Utility.defined(location) || !Utility.defined(direction)) {
			throw new Error(`Requires two arguments`);
		}
		switch (direction) {
			case "north":
			case "south":
			case "east":
			case "west":
			case "up":
			case "down":
				break;
			default:
				throw new Error(`Invalid direction ${direction}`);
		}
		this[direction] = this.world.locations.resolve(location);
		if (this.generated && Utility.defined(this[direction])) {
			let buttonString = `button${direction.charAt(0).toUpperCase() + direction.slice(1)}`;
			if (Utility.defined(this[buttonString])) await this[buttonString].delete();
			if (location === null) return;
			this[buttonString] = await this.guild.channels.create(this[direction].name, {
				type: "voice",
				parent: this.category,
				position: 4
			});
			await Location._bindVCButtonToLocation(this[buttonString], this[direction]);
		}
	}
	/**
	 * Sends a message to the `textChannel` property channel
	 * @param {String} message - The message text
	 * @async
	 * @returns {Message}
	 */
	async message(message) {
		if (!this.generated) throw new Error(`Location not generated`);
		if (!Utility.defined(message)) throw new Error(`Requires one argument`);
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
	 * @returns {void}
	 */
	async delete() {
		this.mobs.remove();
		this.items.remove();
		this.actions.remove();
		this.battles.remove();
		await this.up.attach(null, "down");
		await this.down.attach(null, "up");
		await this.east.attach(null, "west");
		await this.west.attach(null, "east");
		await this.south.attach(null, "north");
		await this.north.attach(null, "south");
		this.world.locations.remove(this);
		this.deleted = true;
	}
	static async _bindVCButtonToLocation(voiceChannel, location) {
		if (!Utility.defined(location) || !Utility.defined(voiceChannel)) {
			throw new Error(`Requires two arguments`);
		}
		let world = location.world;
		let voiceStateFunc = async (oldState, newState) => {
			if (voiceChannel.deleted) return;
			if (newState.channel == location.guild.channels.resolve(voiceChannel)) {
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

	}
}

module.exports = Location;