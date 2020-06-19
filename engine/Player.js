const Base = require("./Base");
const Utility = require("./Utility");
const Action = require("./Action");
const CommandHandler = require("./CommandHandler");
const Mob = require("./Mob");

class Player extends Mob {
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
		this.guildMember = this.guild.members.resolve(options.guildMember);
		this.commandHandler
	}
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