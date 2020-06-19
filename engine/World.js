const Collection = require("./Collection");
const Discord = require("discord.js");
const AsyncEventEmitter = require('asynchronous-emitter');
const Utility = require("./Utility");
const Location = require("./Location");
const Mob = require("./Mob");
const Action = require("./Action");
const Battle = require("./Battle");
const Item = require("./Item");

class World extends AsyncEventEmitter {
	constructor(options) {
		super();
		this.id = Utility.randomID(18);
		this.bot;
		if (!Utility.defined(options.bot.prefix)) throw new Error("No prefix specified in bot object");
		if (!Utility.defined(options.bot.token)) throw new Error("No token specified in bot object");
		this.botPrefix = options.bot.prefix;
		this.botToken = options.bot.token;
		this.guild = options.guild;
		this.name = options.name;
		this.locations = new Collection(Location);
		this.mobs = new Collection(Mob);
		this.actions = new Collection(Action);
		this.battles = new Collection(Battle);
		this.items = new Collection(Item);
	}
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
	async generateAll() {
		for (let location of this.locations) {
			await location[1].generate();
		};
	}
	async ungenerateAll() {
		for (let location of this.locations) {
			await location[1].ungenerate();
		}
	}
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