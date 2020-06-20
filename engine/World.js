const Collection = require("./Collection");
const Discord = require("discord.js");
const AsyncEventEmitter = require('asynchronous-emitter');
const Utility = require("./Utility");
const Location = require("./Location");
const Mob = require("./Mob");
const Action = require("./Action");
const Battle = require("./Battle");
const Item = require("./Item");

/**
 * Represents a world and is the main class that all other classes connect to.
 * @extends {AsyncEventEmitter}
 */
class World extends AsyncEventEmitter {
	/**
	 * @param {Object} [options] - The options to create this world with
	 * @param {String} [options.name] - A name for the world
	 * @param {Object} [options.bot]
	 * @param {String} [options.bot.prefix] - The prefix used to denote commands for this bot
	 * @param {String} [options.bot.token] - The Discord API bot token to use
	 * @param {GuildResolvable} [options.guild] - The guild this world should be attached to
	 */
	constructor(options) {
		super();
		/**
	     * A unique identifier
	     * @type {String}
	     */
		this.id = Utility.randomID(18);
		/**
		 * The Discord bot that is being used for this world
		 * @type {Client}
		 */
		this.bot;
		if (!Utility.defined(options.bot.prefix)) throw new Error("No prefix specified in bot object");
		if (!Utility.defined(options.bot.token)) throw new Error("No token specified in bot object");
		/**
		 * The prefix used to denote commands for the bot 
		 * @type {String}
		 */
		this.botPrefix = options.bot.prefix;
		/**
		 * The Discord API token being used for the bot
		 * @type {String}
		 */
		this.botToken = options.bot.token;
		/**
		 * The guild that this world is attached to
		 * @type {Guild}
		 */
		this.guild = options.guild;
		/**
		 * The name of this world
		 * @type {String}
		 */
		this.name = options.name;
		/**
		 * All locations contained within this world
		 * @type {Collection}
		 */
		this.locations = new Collection(Location);
		/**
		 * All mobs contained within this world
		 * @type {Collection}
		 */
		this.mobs = new Collection(Mob);
		/**
		 * All actions that have been performed in this world
		 * @type {Collection}
		 */
		this.actions = new Collection(Action);
		/**
		 * All battle that are currently taking place in this world
		 * @type {Collection}
		 */
		this.battles = new Collection(Battle);
		/**
		 * All items contained within this world
		 * @type {Collection}
		 */
		this.items = new Collection(Item);
	}
	/**
	 * The builder function. This must be called after construction and before using the instance of this class
	 * @returns {Promise}
	 * @async
	 */
	async init() {
		let Bot = new Discord.Client();
		Bot.login(this.botToken);
		await new Promise((resolve, reject) => {
			Bot.on("ready", () => {
				console.log("Connected");
				console.log("Logged in as: ");
				console.log(Bot.user.username + " - (" + Bot.user.id + ")");
				resolve();
			});
		});
		this.bot = Bot;
		this.guild = Bot.guilds.resolve(this.guild);
		if (this.guild == undefined || this.guild == null) throw new Error ("Guild not found");
	}
	/**
	 * Runs the `generate()` method on every location that is attached to this world
	 * @async
	 * @return {Promise}
	 */
	async generateAll() {
		for (let location of this.locations) {
			await location[1].generate();
		};
	}
	/**
	 * The reverse of `generateAll()`
	 * Runs the `ungenerate()` method on every location that is attached to this world
	 * @async
	 * @return {Promise}
	 */
	async ungenerateAll() {
		for (let location of this.locations) {
			await location[1].ungenerate();
		}
	}
	/**
	 * Creates a location inside of this world
	 * @param  {String} name - A name for the location
	 * @param  {Object} options - The options to create this location with
	 * @return {Promise<Location>}
	 * @async
	 */
	async createLocation(name, options) {
		let location = new Location(this, Utility.defined(options) ? {
			name: name,
			up: options.up,
			down: options.down,
			north: options.north,
			south: options.south,
			east: options.east,
			west: options.west
		} : { name: name })
		location.init();
		return location;
	}
}

module.exports = World;