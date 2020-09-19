const Collection = require("./Collection");
const Discord = require("discord.js");
const Utility = require("./Utility");
const AsyncEventEmitter = Utility.AsyncEventEmitter;
const Location = require("./Location");
const Mob = require("./Mob");
const Action = require("./Action");
const Battle = require("./Battle");
const Item = require("./Item");

/**
 * Represents a world and is the main class that all other classes connect to.
 * @extends {AsyncEventEmitter}
 * @param {Object} [options] - The options to create this world with
 * @param {String} [options.name] - A name for the world
 * @param {Object} [options.bot]
 * @param {String} [options.bot.prefix] - The prefix used to denote commands for this bot
 * @param {String} [options.bot.token] - The Discord API bot token to use
 * @param {GuildResolvable} [options.guild] - The guild this world should be attached to
 */
function World(options = {}) {
	return (async () => {
		if (!options.bot) throw new Error("No bot object specified.");
		if (!options.bot.prefix) throw new Error("No prefix specified in bot object.");
		if (!options.bot.token) throw new Error("No token specified in bot object.");
		if (!options.name) options.name = "My World";
		if (!options.guild) throw new Error("No guild GuildResolvable specified.");

		AsyncEventEmitter.call(this);
		/**
		 * A unique identifier
		 * @type {String}
		 */
		this.id = Utility.randomID(18);
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
		/**
		 * The Discord bot that is being used for this world
		 * @type {Client}
		 */
		this.bot = new Discord.Client();
		this.bot.login(this.botToken);
		await new Promise((_resolve, _reject) => {
			this.bot.on("ready", () => {
				console.log("Connected");
				console.log("Logged in as: ");
				console.log(this.bot.user.username + " - (" + this.bot.user.id + ")");
				_resolve();
			});
		});
		this.guild = this.bot.guilds.resolve(this.guild);
		if (this.guild == undefined || this.guild == null) throw new Error("Guild not found.");
		return this;
	})();
}
/**
 * Runs the `generate()` method on every location that is attached to this world
 * @async
 * @return {Promise}
 */
World.prototype.generateAll = async function () {
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
World.prototype.ungenerateAll = async function () {
	for (let location of this.locations) {
		await location[1].ungenerate();
	}
}

module.exports = World;