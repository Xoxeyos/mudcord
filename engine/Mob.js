var Base = require("./Base");
var Collection = require("./Collection");
var Utility = require("./Utility");
var Item = require("./Item");
var Action = require("./Action");

class Mob extends Base {
  constructor(world, options) {
    super(world);
    this.name = options.name;
    this.actions = new Collection(Action);
    this.items = new Collection(Item);
    this.location = options.location;
    this.battle = options.battle;
    this.iconURL = options.iconURL;
    this.actionsPerRound = Utility.defined(options.actionsPerRound) ? 1 : options.actionsPerRound;
    this.actionsTakenThisRound;
    this._location;
    this._battle;
    this._init(options);
  }
  _init(options) {
    this.world.mobs._add(this);
    this.actions.on("add", (action) => {
      action.mob = this;
      this.emit("actionTaken", action);
    })
  }
  //getters and setters
  get guild() {
    return this.world.guild;
  }
  set location(locationResolvable) {
    let currentLocation = this._location;
    let newLocation = this.world.locations.resolve(locationResolvable);
    let flag;
    if (Utility.defined(currentLocation)) {
      if(Utility.defined(currentLocation.mobs.resolve(this))) {
        currentLocation.mobs.remove(this);
        flag = true
      }
    }
    if (Utility.defined(newLocation)) {
    if(!Utility.defined(newLocation.mobs.resolve(this))) {
        newLocation.mobs.add(this);
        flag = true;
      }
    }
    if (flag) this.emit("changedLocation", currentLocation, newLocation);
  }
  get location() {
    return this._location;
  }
  set battle(battleResolvable) {
    let newBattle = this.world.battles.resolve(battleResolvable);
    let currentBattle = this._battle;
    let flag;
    if (Utility.defined(currentBattle)) {
      if (Utility.defined(currentBattle.mobs.resolve(this))) {
        currentBattle.mobs.remove(this);
        flag = true;
      }
    }
    if (Utility.defined(newBattle)) {
      if (!Utility.defined(newBattle.mobs.resolve(this))) {
        newBattle.mobs.add(this);
        flag = true
      }
    }
    this._battle = newBattle;
    if(flag) this.emit("changedBattle", currentBattle, newBattle);
  }
  get battle() {
    return this._battle;
  }
  //methods
  async takeAction(actionOptions) {
    let action = new Action(this.world, actionOptions);
    if (!Utility.defined(action.mob)) action.mob = this;
    if (!Utility.defined(action.location)) action.location = this.location;
    if (Utility.defined(this.battle)) {
      let registered = await this.battle._registerAction(action);
      if (!registered) {
        action.delete();
        return;
      }
    }
    await this.location.textChannel.send({
      embed: {
        author: {
          name: this.name,
          iconURL: this.iconURL
        },
        description: action.actionString
      }
    });
    this.actions.add(action);
    this.location.actions.add(action);
    return action;
  }
}
module.exports = Mob;