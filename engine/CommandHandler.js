const Base = require("./Base");
const Utility = require("./Utility");

/**
 * Handles incoming messages containing commands
 * @extends {Base}
 */
class CommandHandler extends Base {
	/**
	 * @param {World} world - The world to add this CommandHandler to
	 * @param {Object} options - The options for this CommandHandler
	 */
	constructor(world, options) {
		super(world)
		/**
		 * An object containing all the commands this handler deals with.
		 * Commands are in the key value format, where the key is the command the user uses, and where the value is the function to be called.
		 * An arguments array is passed to the function that contains the rest of the user's message.
		 * @type {Object}
		 */
		this.commands = options.commands;
		if (!Utility.defined(options._this)) throw new Error("No _this object specified")
		/**
		 * Contains the "this" value to be used when each command function is called (this includes the ".condition" function).
		 * @type {Object}
		 */
		this._this = options._this;
		/**
		 * A condition function that each message must meet in order to be passed to the CommandHandler.
		 * @example
		 * (message) => message.member.id == this.mob.guildMember.id
		 * @type {Function}
		 */
		this._condition = options.condition;
	}
	/**
	 * The builder function. This must be called after construction and before using the instance of this class
	 */
	init() {
		this.world.bot.on("message", async (message) => {
			if (this._condition.call(this._this, message) && message.content.startsWith(this.world.botPrefix)) {
				await this._evalCommand(message);
			}
		})
	}
	/**
	 * Adds commands to the handler list
	 * Format for the "commands" option is similar to the one used when creating a CommandHandler
	 * @param {Object} commands - An object containing the commands to be added.
	 * @example
	 * myCommandHandler.add({
	 * 	"pickup": (message) => {
	 * 		//some code
	 * 	}
	 * });
	 */
	add(commands) {
		if (typeof commands != "object") throw new Error("Requires one argument that must be an object");
		for (let prop in commands) {
			if (typeof commands[prop] != "function") throw new Error("Command value in key value pair must be a function");
			this.commands[prop] = commands[prop];
		}
	}
	/**
	 * Removes commands from the handler list
	 * @param {...String} commands - Strings denoting the key of each command
	 * @example
	 * myCommandHandler.remove("pickup", "drop", "attack");
	 */
	remove(...commands) {
		for (var i = commands.length - 1; i >= 0; i--) {
			delete this.commands[commands[i]];
		}
	}
	async _evalCommand(message) {
		let command = message.content.split(this.world.botPrefix)[1].split(" ")[0];
		let args = message.content.split(this.world.botPrefix)[1].split(" ").splice(1);
		await message.delete();
		try {
			await this.commands[command].call(this._this, args);
		} catch (error) {
			console.log(error);
		}
	}
}
module.exports = CommandHandler;