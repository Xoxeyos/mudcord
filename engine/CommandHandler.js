const { GuildChannel } = require("discord.js");
const Base = require("./Base");
const Utility = require("./Utility");

/**
 * Handles incoming messages containing commands
 * @extends Base
 * @param {World} world - The World object to add this CommandHandler to
 * @param {Object} options - The options for this CommandHandler
 */
function CommandHandler(world, options = {}) {
	Base.call(this, world);
	/**
	 * An object containing all the commands this handler deals with.
	 * Commands are in the key value format, where the key is the command the user uses, and where the value is the function to be called.
	 * An arguments array is passed to the function that contains the rest of the user's message.
	 * @type {Object}
	 */
	this.commands = options.commands;
	/**
	 * A condition function that each message must meet in order to be passed to the CommandHandler.
	 * @example
	 * (message) => message.member.id == this.mob.guildMember.id
	 * @type {Function}
	 */
	this._condition = options.condition;
	/**
	 * An optional argument that limits the handler to a specific channel
	 * @type {GuildChannel}
	 */
	this.channel = options.channel;
	this.world.bot.on("message", async (message) => {
		if (this._condition(message) && message.content.startsWith(this.world.botPrefix) && message.guild == this.guild) {
			if(this.channel) {
				if (this.channel != message.channel) return;
			}
			await this._evalCommand(message);
		}
	});
}
/**
 * Adds commands to the handler list
 * Format for the "commands" option is similar to the one used when creating a CommandHandler
 * @param {Object} commands - An object containing the commands to be added.
 * @example
 * myCommandHandler.add({
 * 	"pickup": (args) => {
 * 		//some code
 * 	}
 * });
 */
CommandHandler.prototype.add = function (commands) {
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
CommandHandler.prototype.remove = function (...commands) {
	for (var i = commands.length - 1; i >= 0; i--) {
		delete this.commands[commands[i]];
	}
}
CommandHandler.prototype._evalCommand = async function (message) {
	let command = message.content.split(this.world.botPrefix)[1].split(" ")[0];
	let args = message.content.split(this.world.botPrefix)[1].split(" ").splice(1);
	await message.delete();
	try {
		await this.commands[command](args);
	} catch (error) {
		console.log(error);
	}
}

module.exports = CommandHandler;