const Base = require("./Base");
const Utility = require("./Utility");
const Action = require("./Action");
const CommandHandler = require("./CommandHandler");
const Mob = require("./Mob");


/**
 * Represents a player
 * @extends {Mob}
 * @param  {World} world - The world to create the player in
 * @param  {Object} options - The options to create the player with
 */
function Player(world, options) {
	return (async () => {
		if (!options.guildMember) throw new error("No guildMember object specified.");

		await Mob.call(this, world, options);
		/**
		 * The GuildMember that this player is attached to
		 * @type {GuildMember}
		 */
		this.guildMember = this.guild.members.resolve(options.guildMember);
		/**
		 * The commandHandler for this player (The provided condition is that the message author must match this player's guildMember)
		 */
		this.commandHandler = new CommandHandler(this.world, {
			commands: {
				"a": async (args) => {
					await this.action(args.join(" "));
				}
			},
			condition: message => message.member.id === mob.guildMember.id
		});

		this.on("changedLocation", async (oldLocation, newLocation) => {
			if (oldLocation) {
				if (oldLocation.generated) await this.guildMember.roles.remove(oldLocation.role);
			}
			if (newLocation) {
				if (newLocation.generated) {
					await this.guildMember.roles.add(newLocation.role);
					if (this.guildMember.voice.channel != undefined) await this.guildMember.voice.setChannel(newLocation.voiceChannel);
				}
			}
		});
		return this;
	})();
}
Player.prototype = Object.create(Mob.prototype);

module.exports = Player;