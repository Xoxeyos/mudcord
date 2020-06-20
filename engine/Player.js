const Base = require("./Base");
const Utility = require("./Utility");
const Action = require("./Action");
const CommandHandler = require("./CommandHandler");
const Mob = require("./Mob");


/**
 * Represents a player
 * @extends {Mob}
 */
class Player extends Mob {
	/**
	 * @param  {World} world - The world to create the player in
	 * @param  {Object} options - The options to create the player with
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
		if (!Utility.defined(options.guildMember)) throw new Error("No guildMember object specified.");
		/**
		 * The GuildMember that this player is attached to
		 * @type {GuildMember}
		 */
		this.guildMember = this.guild.members.resolve(options.guildMember);
		/**
		 * The commandHandler for this player (The provided condition is that the message author must match this player's guildMember)
		 */
		this.commandHandler
	}
	/**
	 * The builder function. This must be called after construction and before using the instance of this class
	 * @async
	 * @returns {Promise}
	 */
	async init() {
		this.on("changedLocation", async (oldLocation, newLocation) => {
			if (Utility.defined(oldLocation)) {
				if (oldLocation.generated) await this.guildMember.roles.remove(oldLocation.role);
			}
			if (Utility.defined(newLocation)) {
				if (newLocation.generated) {
					await this.guildMember.roles.add(newLocation.role);
					if (this.guildMember.voice.channel != undefined) await this.guildMember.voice.setChannel(newLocation.voiceChannel);
				}
			}
		});
		await super.init();
		this.commandHandler = new CommandHandler(this.world, {
			commands: {
				"a": async (args) => {
					await this.action(args.join(" "));
				}
			},
			_this: this,
			condition: message => message.member.id === this.guildMember.id
		});
		this.commandHandler.init();
	}
}

module.exports = Player;