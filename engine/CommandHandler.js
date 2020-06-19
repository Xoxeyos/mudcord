const Base = require("./Base");
const Utility = require("./Utility");

class CommandHandler extends Base {
	constructor(world, options) {
		super(world)
		if (!Utility.defined(options.commands)) throw new Error("No commands object specified")
		this.commands = options.commands;
		if (!Utility.defined(options._this)) throw new Error("No _this object specified")
		this._this = options._this;
		this._condition = options.condition;
	}
	init() {
		this.world.bot.on("message", async (message) => {
			if (this._condition(message) && message.content.startsWith(this.world.botPrefix)) {
				await this._evalCommand(message);
			}
		})
	}
	add(commands) {
		if (typeof commands != "object") throw new Error("Requires one argument that must be an object");
		for (let prop in commands) {
			if (typeof commands[prop] != "function") throw new Error("Command value in key value pair must be a function");
			this.commands[prop] = commands[prop];
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