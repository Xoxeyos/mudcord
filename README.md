# About
MUDcord is a Discord-based MUD client library specifically geared towards roleplay servers. The library is intentionally non-restrictive in functionality to allow roleplayers and event-makers more freedom in terms of creativity.
## Classes

<dl>
<dt><a href="#Action">Action</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Represents an action performed by a mob entity</p>
</dd>
<dt><a href="#Battle">Battle</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Represents a battle.</p>
</dd>
<dt><a href="#CommandHandler">CommandHandler</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Handles incoming messages containing commands</p>
</dd>
<dt><a href="#Collection">Collection</a> ⇐ <code>Map</code></dt>
<dd><p>A Map with some extra functions where the ID is used as an identifier</p>
</dd>
<dt><a href="#Item">Item</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Represents an item</p>
</dd>
<dt><a href="#Base">Base</a> ⇐ <code>AsyncEventEmitter</code></dt>
<dd><p>The base class for most other classes</p>
</dd>
<dt><a href="#Location">Location</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Represents a location</p>
</dd>
<dt><a href="#Mob">Mob</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Represents a mob (living entity)</p>
</dd>
<dt><a href="#Monster">Monster</a> ⇐ <code><a href="#Mob">Mob</a></code></dt>
<dd><p>Represents a monster (a non-player-controlled mob)</p>
</dd>
<dt><a href="#Player">Player</a> ⇐ <code><a href="#Mob">Mob</a></code></dt>
<dd><p>Represents a player</p>
</dd>
<dt><a href="#Utility">Utility</a></dt>
<dd><p>A group of static utility functions</p>
</dd>
<dt><a href="#World">World</a> ⇐ <code>AsyncEventEmitter</code></dt>
<dd><p>Represents a world and is the main class that all other classes connect to.</p>
</dd>
</dl>

<a name="Action"></a>

## Action ⇐ [<code>Base</code>](#Base)
Represents an action performed by a mob entity

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Action](#Action) ⇐ [<code>Base</code>](#Base)
    * [new Action(world, options)](#new_Action_new)
    * [.mob](#Action+mob) : [<code>Mob</code>](#Mob)
    * [.location](#Action+location) : [<code>Location</code>](#Location)
    * [.actionString](#Action+actionString) : <code>String</code>
    * [.battle](#Action+battle) : [<code>Battle</code>](#Battle)
    * [.id](#Base+id) : <code>String</code>
    * [.world](#Base+world) : [<code>World</code>](#World)
    * [.deleted](#Base+deleted) : <code>Boolean</code>
    * [.guild](#Base+guild) : <code>Guild</code>
    * [.init()](#Action+init) ⇒ <code>void</code>
    * [.delete()](#Action+delete) ⇒ <code>void</code>

<a name="new_Action_new"></a>

### new Action(world, options)

| Param | Type | Description |
| --- | --- | --- |
| world | [<code>World</code>](#World) | The world in which this action should be performed |
| options | [<code>Action</code>](#Action) | The options to create this action with |

<a name="Action+mob"></a>

### action.mob : [<code>Mob</code>](#Mob)
The mob that performed this action

**Kind**: instance property of [<code>Action</code>](#Action)  
<a name="Action+location"></a>

### action.location : [<code>Location</code>](#Location)
The location where this action was performed

**Kind**: instance property of [<code>Action</code>](#Action)  
<a name="Action+actionString"></a>

### action.actionString : <code>String</code>
A description of the action (this is what the end-user sees)

**Kind**: instance property of [<code>Action</code>](#Action)  
<a name="Action+battle"></a>

### action.battle : [<code>Battle</code>](#Battle)
The battle in which this action was performed (if any)

**Kind**: instance property of [<code>Action</code>](#Action)  
<a name="Base+id"></a>

### action.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>Action</code>](#Action)  
**Overrides**: [<code>id</code>](#Base+id)  
<a name="Base+world"></a>

### action.world : [<code>World</code>](#World)
The world associated with this object

**Kind**: instance property of [<code>Action</code>](#Action)  
**Overrides**: [<code>world</code>](#Base+world)  
<a name="Base+deleted"></a>

### action.deleted : <code>Boolean</code>
Whether this object has been deleted or not

**Kind**: instance property of [<code>Action</code>](#Action)  
**Overrides**: [<code>deleted</code>](#Base+deleted)  
<a name="Base+guild"></a>

### action.guild : <code>Guild</code>
The guild associated with this object

**Kind**: instance property of [<code>Action</code>](#Action)  
**Overrides**: [<code>guild</code>](#Base+guild)  
<a name="Action+init"></a>

### action.init() ⇒ <code>void</code>
The builder function. This must be called after construction and before using the instance of this class

**Kind**: instance method of [<code>Action</code>](#Action)  
<a name="Action+delete"></a>

### action.delete() ⇒ <code>void</code>
Deletes this action and all references to it

**Kind**: instance method of [<code>Action</code>](#Action)  
<a name="Battle"></a>

## Battle ⇐ [<code>Base</code>](#Base)
Represents a battle.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Battle](#Battle) ⇐ [<code>Base</code>](#Base)
    * [new Battle(world, options)](#new_Battle_new)
    * [.location](#Battle+location) : [<code>Location</code>](#Location)
    * [.name](#Battle+name) : <code>String</code>
    * [.mobs](#Battle+mobs) : [<code>Collection.&lt;Mob&gt;</code>](#Mob)
    * [.currentRound](#Battle+currentRound) : <code>Number</code>
    * [.actions](#Battle+actions) : [<code>Collection.&lt;Action&gt;</code>](#Action)
    * [.roundTimeLimit](#Battle+roundTimeLimit) : <code>Number</code>
    * [.started](#Battle+started) : <code>Boolean</code>
    * [.id](#Base+id) : <code>String</code>
    * [.world](#Base+world) : [<code>World</code>](#World)
    * [.deleted](#Base+deleted) : <code>Boolean</code>
    * [.guild](#Base+guild) : <code>Guild</code>
    * [.init()](#Battle+init)
    * [.start()](#Battle+start) ⇒ <code>void</code>
    * [.addMob(mobResolvable)](#Battle+addMob) ⇒ <code>void</code>
    * [.removeMob(mobResolvable)](#Battle+removeMob) ⇒ <code>void</code>
    * [.delete()](#Battle+delete) ⇒ <code>void</code>
    * ["roundEnd"](#Battle+event_roundEnd)
    * ["actionTaken" (action)](#Battle+event_actionTaken)
    * ["mobJoined" (mob)](#Battle+event_mobJoined)
    * ["mobLeft" (mob)](#Battle+event_mobLeft)
    * ["started"](#Battle+event_started)

<a name="new_Battle_new"></a>

### new Battle(world, options)

| Param | Type | Description |
| --- | --- | --- |
| world | [<code>World</code>](#World) | The world to create this battle in |
| options | <code>Object</code> | The options to create this battle with |

<a name="Battle+location"></a>

### battle.location : [<code>Location</code>](#Location)
The location where this battle is taking place

**Kind**: instance property of [<code>Battle</code>](#Battle)  
<a name="Battle+name"></a>

### battle.name : <code>String</code>
The name of the battle

**Kind**: instance property of [<code>Battle</code>](#Battle)  
<a name="Battle+mobs"></a>

### battle.mobs : [<code>Collection.&lt;Mob&gt;</code>](#Mob)
All mobs participating in this battle

**Kind**: instance property of [<code>Battle</code>](#Battle)  
<a name="Battle+currentRound"></a>

### battle.currentRound : <code>Number</code>
The current round number of this battle

**Kind**: instance property of [<code>Battle</code>](#Battle)  
<a name="Battle+actions"></a>

### battle.actions : [<code>Collection.&lt;Action&gt;</code>](#Action)
All actions that have been taken in this battle

**Kind**: instance property of [<code>Battle</code>](#Battle)  
<a name="Battle+roundTimeLimit"></a>

### battle.roundTimeLimit : <code>Number</code>
The amount of time all participating mobs have to perform actions before the round ends

**Kind**: instance property of [<code>Battle</code>](#Battle)  
**Default**: <code>60000</code>  
<a name="Battle+started"></a>

### battle.started : <code>Boolean</code>
Indicates whether the battle has started or not

**Kind**: instance property of [<code>Battle</code>](#Battle)  
<a name="Base+id"></a>

### battle.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>Battle</code>](#Battle)  
**Overrides**: [<code>id</code>](#Base+id)  
<a name="Base+world"></a>

### battle.world : [<code>World</code>](#World)
The world associated with this object

**Kind**: instance property of [<code>Battle</code>](#Battle)  
**Overrides**: [<code>world</code>](#Base+world)  
<a name="Base+deleted"></a>

### battle.deleted : <code>Boolean</code>
Whether this object has been deleted or not

**Kind**: instance property of [<code>Battle</code>](#Battle)  
**Overrides**: [<code>deleted</code>](#Base+deleted)  
<a name="Base+guild"></a>

### battle.guild : <code>Guild</code>
The guild associated with this object

**Kind**: instance property of [<code>Battle</code>](#Battle)  
**Overrides**: [<code>guild</code>](#Base+guild)  
<a name="Battle+init"></a>

### battle.init()
The builder function. This must be called after construction and before using the instance of this class

**Kind**: instance method of [<code>Battle</code>](#Battle)  
<a name="Battle+start"></a>

### battle.start() ⇒ <code>void</code>
Starts this battle

**Kind**: instance method of [<code>Battle</code>](#Battle)  
<a name="Battle+addMob"></a>

### battle.addMob(mobResolvable) ⇒ <code>void</code>
Adds a mob to this battle

**Kind**: instance method of [<code>Battle</code>](#Battle)  

| Param | Type |
| --- | --- |
| mobResolvable | <code>MobResolvable</code> | 

<a name="Battle+removeMob"></a>

### battle.removeMob(mobResolvable) ⇒ <code>void</code>
Removes a mob from this battle

**Kind**: instance method of [<code>Battle</code>](#Battle)  

| Param | Type |
| --- | --- |
| mobResolvable | <code>MobResolvable</code> | 

<a name="Battle+delete"></a>

### battle.delete() ⇒ <code>void</code>
Deletes this battle

**Kind**: instance method of [<code>Battle</code>](#Battle)  
<a name="Battle+event_roundEnd"></a>

### "roundEnd"
Emitted when a round has ended

**Kind**: event emitted by [<code>Battle</code>](#Battle)  
<a name="Battle+event_actionTaken"></a>

### "actionTaken" (action)
Emitted when an action is taken

**Kind**: event emitted by [<code>Battle</code>](#Battle)  

| Param | Type |
| --- | --- |
| action | [<code>Action</code>](#Action) | 

<a name="Battle+event_mobJoined"></a>

### "mobJoined" (mob)
Emitted when a mob joins this battle

**Kind**: event emitted by [<code>Battle</code>](#Battle)  

| Param | Type |
| --- | --- |
| mob | [<code>Mob</code>](#Mob) | 

<a name="Battle+event_mobLeft"></a>

### "mobLeft" (mob)
Emitted when a mob leaves this battle

**Kind**: event emitted by [<code>Battle</code>](#Battle)  

| Param | Type |
| --- | --- |
| mob | [<code>Mob</code>](#Mob) | 

<a name="Battle+event_started"></a>

### "started"
Emitted when this battle starts

**Kind**: event emitted by [<code>Battle</code>](#Battle)  
<a name="CommandHandler"></a>

## CommandHandler ⇐ [<code>Base</code>](#Base)
Handles incoming messages containing commands

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [CommandHandler](#CommandHandler) ⇐ [<code>Base</code>](#Base)
    * [new CommandHandler(world, options)](#new_CommandHandler_new)
    * [.commands](#CommandHandler+commands) : <code>Object</code>
    * [._this](#CommandHandler+_this) : <code>Object</code>
    * [._condition](#CommandHandler+_condition) : <code>function</code>
    * [.id](#Base+id) : <code>String</code>
    * [.world](#Base+world) : [<code>World</code>](#World)
    * [.deleted](#Base+deleted) : <code>Boolean</code>
    * [.guild](#Base+guild) : <code>Guild</code>
    * [.init()](#CommandHandler+init)
    * [.add(commands)](#CommandHandler+add)
    * [.remove(...commands)](#CommandHandler+remove)

<a name="new_CommandHandler_new"></a>

### new CommandHandler(world, options)

| Param | Type | Description |
| --- | --- | --- |
| world | [<code>World</code>](#World) | The world to add this CommandHandler to |
| options | <code>Object</code> | The options for this CommandHandler |

<a name="CommandHandler+commands"></a>

### commandHandler.commands : <code>Object</code>
An object containing all the commands this handler deals with.
Commands are in the key value format, where the key is the command the user uses, and where the value is the function to be called.
An arguments array is passed to the function that contains the rest of the user's message.

**Kind**: instance property of [<code>CommandHandler</code>](#CommandHandler)  
<a name="CommandHandler+_this"></a>

### commandHandler.\_this : <code>Object</code>
Contains the "this" value to be used when each command function is called (this includes the ".condition" function).

**Kind**: instance property of [<code>CommandHandler</code>](#CommandHandler)  
<a name="CommandHandler+_condition"></a>

### commandHandler.\_condition : <code>function</code>
A condition function that each message must meet in order to be passed to the CommandHandler.

**Kind**: instance property of [<code>CommandHandler</code>](#CommandHandler)  
**Example**  
```js
(message) => message.member.id == this.mob.guildMember.id
```
<a name="Base+id"></a>

### commandHandler.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>CommandHandler</code>](#CommandHandler)  
**Overrides**: [<code>id</code>](#Base+id)  
<a name="Base+world"></a>

### commandHandler.world : [<code>World</code>](#World)
The world associated with this object

**Kind**: instance property of [<code>CommandHandler</code>](#CommandHandler)  
**Overrides**: [<code>world</code>](#Base+world)  
<a name="Base+deleted"></a>

### commandHandler.deleted : <code>Boolean</code>
Whether this object has been deleted or not

**Kind**: instance property of [<code>CommandHandler</code>](#CommandHandler)  
**Overrides**: [<code>deleted</code>](#Base+deleted)  
<a name="Base+guild"></a>

### commandHandler.guild : <code>Guild</code>
The guild associated with this object

**Kind**: instance property of [<code>CommandHandler</code>](#CommandHandler)  
**Overrides**: [<code>guild</code>](#Base+guild)  
<a name="CommandHandler+init"></a>

### commandHandler.init()
The builder function. This must be called after construction and before using the instance of this class

**Kind**: instance method of [<code>CommandHandler</code>](#CommandHandler)  
<a name="CommandHandler+add"></a>

### commandHandler.add(commands)
Adds commands to the handler list
Format for the "commands" option is similar to the one used when creating a CommandHandler

**Kind**: instance method of [<code>CommandHandler</code>](#CommandHandler)  

| Param | Type | Description |
| --- | --- | --- |
| commands | <code>Object</code> | An object containing the commands to be added. |

**Example**  
```js
myCommandHandler.add({
	"pickup": (message) => {
		//some code
	}
});
```
<a name="CommandHandler+remove"></a>

### commandHandler.remove(...commands)
Removes commands from the handler list

**Kind**: instance method of [<code>CommandHandler</code>](#CommandHandler)  

| Param | Type | Description |
| --- | --- | --- |
| ...commands | <code>String</code> | Strings denoting the key of each command |

**Example**  
```js
myCommandHandler.remove("pickup", "drop", "attack");
```
<a name="Collection"></a>

## Collection ⇐ <code>Map</code>
A Map with some extra functions where the ID is used as an identifier

**Kind**: global class  
**Extends**: <code>Map</code>  

* [Collection](#Collection) ⇐ <code>Map</code>
    * [new Collection(type)](#new_Collection_new)
    * [.add(objects)](#Collection+add) ⇒ <code>void</code>
    * [.remove(objectResolvables)](#Collection+remove) ⇒ <code>void</code>
    * [.resolve(objectResolvables)](#Collection+resolve) ⇒ <code>Object</code>
    * [.every(condition)](#Collection+every) ⇒ <code>Boolean</code>
    * [.find(condition)](#Collection+find) ⇒ <code>Object</code>

<a name="new_Collection_new"></a>

### new Collection(type)

| Param | Type | Description |
| --- | --- | --- |
| type | <code>Class</code> | The class that this collection is for |

<a name="Collection+add"></a>

### collection.add(objects) ⇒ <code>void</code>
Adds objects (or an object) to the collection

**Kind**: instance method of [<code>Collection</code>](#Collection)  

| Param | Type |
| --- | --- |
| objects | <code>Object</code> \| <code>Collection.&lt;Object&gt;</code> \| <code>Array.&lt;Object&gt;</code> | 

<a name="Collection+remove"></a>

### collection.remove(objectResolvables) ⇒ <code>void</code>
Removes objects (or an object) from the collection

**Kind**: instance method of [<code>Collection</code>](#Collection)  

| Param | Type | Description |
| --- | --- | --- |
| objectResolvables | <code>undefined</code> \| <code>Collection.&lt;Object&gt;</code> \| <code>Array.&lt;ObjectResolvable&gt;</code> \| <code>ObjectResolvable</code> | If this value is undefined, all items are removed from the collection |

<a name="Collection+resolve"></a>

### collection.resolve(objectResolvables) ⇒ <code>Object</code>
Resolves ObjectResolvables (or ObjectResolvables) to an object in the collection

**Kind**: instance method of [<code>Collection</code>](#Collection)  

| Param | Type |
| --- | --- |
| objectResolvables | <code>Collection.&lt;Object&gt;</code> \| <code>Array.&lt;ObjectResolvable&gt;</code> \| <code>ObjectResolvable</code> | 

<a name="Collection+every"></a>

### collection.every(condition) ⇒ <code>Boolean</code>
Same as Array.every(). Returns true if every item in this collection passes the provided condition.

**Kind**: instance method of [<code>Collection</code>](#Collection)  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>function</code> | The condition function to test with |

<a name="Collection+find"></a>

### collection.find(condition) ⇒ <code>Object</code>
Same as Array.find(). Returns the first item in this collection that satisfies the provided condition.

**Kind**: instance method of [<code>Collection</code>](#Collection)  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>function</code> | The condition function to test with |

<a name="Item"></a>

## Item ⇐ [<code>Base</code>](#Base)
Represents an item

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Item](#Item) ⇐ [<code>Base</code>](#Base)
    * [new Item(world, options)](#new_Item_new)
    * [.name](#Item+name) : <code>String</code>
    * [.description](#Item+description) : <code>String</code>
    * [.mob](#Item+mob) : [<code>Mob</code>](#Mob)
    * [.location](#Item+location) : [<code>Location</code>](#Location)
    * [.commandHandler](#Item+commandHandler)
    * [.id](#Base+id) : <code>String</code>
    * [.world](#Base+world) : [<code>World</code>](#World)
    * [.deleted](#Base+deleted) : <code>Boolean</code>
    * [.guild](#Base+guild) : <code>Guild</code>
    * [.init()](#Item+init) ⇒ <code>void</code>
    * [.delete()](#Item+delete) ⇒ <code>void</code>

<a name="new_Item_new"></a>

### new Item(world, options)

| Param | Type | Description |
| --- | --- | --- |
| world | [<code>World</code>](#World) | The world to create this item in |
| options | <code>Object</code> | The options to create this item with |

<a name="Item+name"></a>

### item.name : <code>String</code>
The name of this item

**Kind**: instance property of [<code>Item</code>](#Item)  
<a name="Item+description"></a>

### item.description : <code>String</code>
A short description of the item

**Kind**: instance property of [<code>Item</code>](#Item)  
<a name="Item+mob"></a>

### item.mob : [<code>Mob</code>](#Mob)
The mob who possesses this item (if any)

**Kind**: instance property of [<code>Item</code>](#Item)  
<a name="Item+location"></a>

### item.location : [<code>Location</code>](#Location)
The location this item is currently at

**Kind**: instance property of [<code>Item</code>](#Item)  
<a name="Item+commandHandler"></a>

### item.commandHandler
The CommandHandler for this item

**Kind**: instance property of [<code>Item</code>](#Item)  
<a name="Base+id"></a>

### item.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>Item</code>](#Item)  
**Overrides**: [<code>id</code>](#Base+id)  
<a name="Base+world"></a>

### item.world : [<code>World</code>](#World)
The world associated with this object

**Kind**: instance property of [<code>Item</code>](#Item)  
**Overrides**: [<code>world</code>](#Base+world)  
<a name="Base+deleted"></a>

### item.deleted : <code>Boolean</code>
Whether this object has been deleted or not

**Kind**: instance property of [<code>Item</code>](#Item)  
**Overrides**: [<code>deleted</code>](#Base+deleted)  
<a name="Base+guild"></a>

### item.guild : <code>Guild</code>
The guild associated with this object

**Kind**: instance property of [<code>Item</code>](#Item)  
**Overrides**: [<code>guild</code>](#Base+guild)  
<a name="Item+init"></a>

### item.init() ⇒ <code>void</code>
The builder function. This must be called after construction and before using the instance of this class

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="Item+delete"></a>

### item.delete() ⇒ <code>void</code>
Deletes this item and all references to it

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="Base"></a>

## *Base ⇐ <code>AsyncEventEmitter</code>*
The base class for most other classes

**Kind**: global abstract class  
**Extends**: <code>AsyncEventEmitter</code>  

* *[Base](#Base) ⇐ <code>AsyncEventEmitter</code>*
    * *[new Base(world)](#new_Base_new)*
    * *[.id](#Base+id) : <code>String</code>*
    * *[.world](#Base+world) : [<code>World</code>](#World)*
    * *[.deleted](#Base+deleted) : <code>Boolean</code>*
    * *[.guild](#Base+guild) : <code>Guild</code>*

<a name="new_Base_new"></a>

### *new Base(world)*

| Param | Type | Description |
| --- | --- | --- |
| world | [<code>World</code>](#World) | The world that this ojbect should be attached to |

<a name="Base+id"></a>

### *base.id : <code>String</code>*
A unique identifier

**Kind**: instance property of [<code>Base</code>](#Base)  
<a name="Base+world"></a>

### *base.world : [<code>World</code>](#World)*
The world associated with this object

**Kind**: instance property of [<code>Base</code>](#Base)  
<a name="Base+deleted"></a>

### *base.deleted : <code>Boolean</code>*
Whether this object has been deleted or not

**Kind**: instance property of [<code>Base</code>](#Base)  
<a name="Base+guild"></a>

### *base.guild : <code>Guild</code>*
The guild associated with this object

**Kind**: instance property of [<code>Base</code>](#Base)  
<a name="Location"></a>

## Location ⇐ [<code>Base</code>](#Base)
Represents a location

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Location](#Location) ⇐ [<code>Base</code>](#Base)
    * [new Location(world, options)](#new_Location_new)
    * [.generated](#Location+generated) : <code>Boolean</code>
    * [.mobs](#Location+mobs) : [<code>Collection.&lt;Mob&gt;</code>](#Mob)
    * [.actions](#Location+actions) : [<code>Collection.&lt;Action&gt;</code>](#Action)
    * [.items](#Location+items) : [<code>Collection.&lt;Item&gt;</code>](#Item)
    * [.battle](#Location+battle) : [<code>Battle</code>](#Battle)
    * [.role](#Location+role) : <code>Role</code>
    * [.category](#Location+category) : <code>CategoryChannel</code>
    * [.textChannel](#Location+textChannel) : <code>TextChannel</code>
    * [.voiceChannel](#Location+voiceChannel) : <code>VoiceChannel</code>
    * [.spacerChannel](#Location+spacerChannel) : <code>TextChannel</code>
    * [.name](#Location+name) : <code>String</code>
    * [.north](#Location+north) : [<code>Location</code>](#Location)
    * [.south](#Location+south) : [<code>Location</code>](#Location)
    * [.east](#Location+east) : [<code>Location</code>](#Location)
    * [.west](#Location+west) : [<code>Location</code>](#Location)
    * [.up](#Location+up) : [<code>Location</code>](#Location)
    * [.down](#Location+down) : [<code>Location</code>](#Location)
    * [.buttonNorth](#Location+buttonNorth) : <code>VoiceChannel</code>
    * [.buttonSouth](#Location+buttonSouth) : <code>VoiceChannel</code>
    * [.buttonEast](#Location+buttonEast) : <code>VoiceChannel</code>
    * [.buttonWest](#Location+buttonWest) : <code>VoiceChannel</code>
    * [.buttonUp](#Location+buttonUp) : <code>VoiceChannel</code>
    * [.buttonDown](#Location+buttonDown) : <code>VoiceChannel</code>
    * [.id](#Base+id) : <code>String</code>
    * [.world](#Base+world) : [<code>World</code>](#World)
    * [.deleted](#Base+deleted) : <code>Boolean</code>
    * [.guild](#Base+guild) : <code>Guild</code>
    * [.init()](#Location+init)
    * [.generate()](#Location+generate) ⇒ <code>void</code>
    * [.ungenerate()](#Location+ungenerate) ⇒ <code>Promise</code>
    * [.createBattle(name, options)](#Location+createBattle) ⇒ [<code>Promise.&lt;Battle&gt;</code>](#Battle)
    * [.createPlayer(name, options)](#Location+createPlayer) ⇒ [<code>Promise.&lt;Player&gt;</code>](#Player)
    * [.createMonster(name, options)](#Location+createMonster) ⇒ [<code>Promise.&lt;Monster&gt;</code>](#Monster)
    * [.createItem(name, options)](#Location+createItem) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
    * [.attach(location, direction)](#Location+attach) ⇒ <code>Promise</code>
    * [.message(message)](#Location+message) ⇒ <code>Promise.&lt;Message&gt;</code>
    * [.delete()](#Location+delete) ⇒ <code>Promise</code>
    * ["generated"](#Location+event_generated)
    * ["ungenerated"](#Location+event_ungenerated)
    * ["actionTaken" ([action])](#Location+event_actionTaken)
    * ["mobLeft" ([mob])](#Location+event_mobLeft)
    * ["mobJoined" ([mob])](#Location+event_mobJoined)

<a name="new_Location_new"></a>

### new Location(world, options)

| Param | Type |
| --- | --- |
| world | [<code>World</code>](#World) | 
| options | <code>Object</code> | 

<a name="Location+generated"></a>

### location.generated : <code>Boolean</code>
Indicates whether this location has been generated

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+mobs"></a>

### location.mobs : [<code>Collection.&lt;Mob&gt;</code>](#Mob)
All mobs currently at this location

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+actions"></a>

### location.actions : [<code>Collection.&lt;Action&gt;</code>](#Action)
All actions taken at this location

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+items"></a>

### location.items : [<code>Collection.&lt;Item&gt;</code>](#Item)
All items currently at this location

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+battle"></a>

### location.battle : [<code>Battle</code>](#Battle)
The battle currently taking place at this location (if there is one)

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+role"></a>

### location.role : <code>Role</code>
The role associated with this location

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+category"></a>

### location.category : <code>CategoryChannel</code>
The category associated with this location

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+textChannel"></a>

### location.textChannel : <code>TextChannel</code>
The text channel associated with this location

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+voiceChannel"></a>

### location.voiceChannel : <code>VoiceChannel</code>
The voice channel associated with this location

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+spacerChannel"></a>

### location.spacerChannel : <code>TextChannel</code>
The channel used as a separator between the button channels and the voice/text channels

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+name"></a>

### location.name : <code>String</code>
The name of the location

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+north"></a>

### location.north : [<code>Location</code>](#Location)
The location positioned north of this one

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+south"></a>

### location.south : [<code>Location</code>](#Location)
The location positioned south of this one

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+east"></a>

### location.east : [<code>Location</code>](#Location)
The location positioned east of this one

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+west"></a>

### location.west : [<code>Location</code>](#Location)
The location positioned west of this one

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+up"></a>

### location.up : [<code>Location</code>](#Location)
The location positioned above this one

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+down"></a>

### location.down : [<code>Location</code>](#Location)
The location positioned below this one

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+buttonNorth"></a>

### location.buttonNorth : <code>VoiceChannel</code>
The voice channel being used as button to move between this location and the one north of it

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+buttonSouth"></a>

### location.buttonSouth : <code>VoiceChannel</code>
The voice channel being used as button to move between this location and the one south of it

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+buttonEast"></a>

### location.buttonEast : <code>VoiceChannel</code>
The voice channel being used as button to move between this location and the one east of it

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+buttonWest"></a>

### location.buttonWest : <code>VoiceChannel</code>
The voice channel being used as button to move between this location and the one west of it

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+buttonUp"></a>

### location.buttonUp : <code>VoiceChannel</code>
The voice channel being used as button to move between this location and the one above it

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+buttonDown"></a>

### location.buttonDown : <code>VoiceChannel</code>
The voice channel being used as button to move between this location and the one below it

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Base+id"></a>

### location.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>Location</code>](#Location)  
**Overrides**: [<code>id</code>](#Base+id)  
<a name="Base+world"></a>

### location.world : [<code>World</code>](#World)
The world associated with this object

**Kind**: instance property of [<code>Location</code>](#Location)  
**Overrides**: [<code>world</code>](#Base+world)  
<a name="Base+deleted"></a>

### location.deleted : <code>Boolean</code>
Whether this object has been deleted or not

**Kind**: instance property of [<code>Location</code>](#Location)  
**Overrides**: [<code>deleted</code>](#Base+deleted)  
<a name="Base+guild"></a>

### location.guild : <code>Guild</code>
The guild associated with this object

**Kind**: instance property of [<code>Location</code>](#Location)  
**Overrides**: [<code>guild</code>](#Base+guild)  
<a name="Location+init"></a>

### location.init()
The builder function. This must be called after construction and before using the instance of this class

**Kind**: instance method of [<code>Location</code>](#Location)  
<a name="Location+generate"></a>

### location.generate() ⇒ <code>void</code>
Creates the role and channels for this location and links the associated locations to the newly created button channels

**Kind**: instance method of [<code>Location</code>](#Location)  
<a name="Location+ungenerate"></a>

### location.ungenerate() ⇒ <code>Promise</code>
Reverses the effects of the `generate()` method

**Kind**: instance method of [<code>Location</code>](#Location)  
<a name="Location+createBattle"></a>

### location.createBattle(name, options) ⇒ [<code>Promise.&lt;Battle&gt;</code>](#Battle)
Creates a battle at this location

**Kind**: instance method of [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the battle |
| options | <code>Object</code> | The options for this battle |

<a name="Location+createPlayer"></a>

### location.createPlayer(name, options) ⇒ [<code>Promise.&lt;Player&gt;</code>](#Player)
Creates a player at this location

**Kind**: instance method of [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the player |
| options | <code>Object</code> | The options for this player |

<a name="Location+createMonster"></a>

### location.createMonster(name, options) ⇒ [<code>Promise.&lt;Monster&gt;</code>](#Monster)
Creates a monster at this location

**Kind**: instance method of [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the monster |
| options | <code>Object</code> | The options for this monster |

<a name="Location+createItem"></a>

### location.createItem(name, options) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
Creates a item at this location

**Kind**: instance method of [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the item |
| options | <code>Object</code> | The options for this item |

<a name="Location+attach"></a>

### location.attach(location, direction) ⇒ <code>Promise</code>
Places a location next to this one in a specified direction

**Kind**: instance method of [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| location | [<code>Location</code>](#Location) | The location to place |
| direction | <code>String</code> | One of the following directions: "up", "down", "north", "east", "south", or "west" |

<a name="Location+message"></a>

### location.message(message) ⇒ <code>Promise.&lt;Message&gt;</code>
Sends a message to the `textChannel` property channel

**Kind**: instance method of [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The message text |

<a name="Location+delete"></a>

### location.delete() ⇒ <code>Promise</code>
Deletes this location and all references to it

**Kind**: instance method of [<code>Location</code>](#Location)  
<a name="Location+event_generated"></a>

### "generated"
Emitted when this location is generated

**Kind**: event emitted by [<code>Location</code>](#Location)  
<a name="Location+event_ungenerated"></a>

### "ungenerated"
Emitted when this location is ungenerated

**Kind**: event emitted by [<code>Location</code>](#Location)  
<a name="Location+event_actionTaken"></a>

### "actionTaken" ([action])
Emitted when an action is taken at this location

**Kind**: event emitted by [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| [action] | [<code>Action</code>](#Action) | The action that was taken |

<a name="Location+event_mobLeft"></a>

### "mobLeft" ([mob])
Emitted when a mob leaves this location

**Kind**: event emitted by [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| [mob] | [<code>Mob</code>](#Mob) | The mob that left this location |

<a name="Location+event_mobJoined"></a>

### "mobJoined" ([mob])
Emitted when a mob joins this location

**Kind**: event emitted by [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| [mob] | [<code>Mob</code>](#Mob) | The mob that joined this location |

<a name="Mob"></a>

## Mob ⇐ [<code>Base</code>](#Base)
Represents a mob (living entity)

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Mob](#Mob) ⇐ [<code>Base</code>](#Base)
    * [.name](#Mob+name) : <code>String</code>
    * [.actions](#Mob+actions) : [<code>Collection</code>](#Collection)
    * [.items](#Mob+items) : [<code>Collection</code>](#Collection)
    * [.iconURL](#Mob+iconURL) : <code>String</code>
    * [.description](#Mob+description) : <code>String</code>
    * [.actionsPerRound](#Mob+actionsPerRound) : <code>Number</code>
    * [.actionsTakenThisRound](#Mob+actionsTakenThisRound) : <code>Number</code>
    * [.location](#Mob+location) : [<code>Location</code>](#Location)
    * [.battle](#Mob+battle) : [<code>Battle</code>](#Battle)
    * [.id](#Base+id) : <code>String</code>
    * [.world](#Base+world) : [<code>World</code>](#World)
    * [.deleted](#Base+deleted) : <code>Boolean</code>
    * [.guild](#Base+guild) : <code>Guild</code>
    * [.init()](#Mob+init) ⇒ <code>Promise</code>
    * [.createItem(name, options)](#Mob+createItem) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
    * [.action(actionString)](#Mob+action) ⇒ [<code>Promise.&lt;Action&gt;</code>](#Action)
    * [.move(locationResolvable)](#Mob+move) ⇒ <code>Promise</code>
    * [.delete()](#Mob+delete) ⇒ <code>void</code>
    * ["changedLocation" ([oldLocation], [newLocation])](#Mob+event_changedLocation)
    * ["actionTaken" ([action])](#Mob+event_actionTaken)

<a name="Mob+name"></a>

### mob.name : <code>String</code>
The name of this mob

**Kind**: instance property of [<code>Mob</code>](#Mob)  
<a name="Mob+actions"></a>

### mob.actions : [<code>Collection</code>](#Collection)
All the actions that this mob has taken

**Kind**: instance property of [<code>Mob</code>](#Mob)  
<a name="Mob+items"></a>

### mob.items : [<code>Collection</code>](#Collection)
All the items that this mob possesses

**Kind**: instance property of [<code>Mob</code>](#Mob)  
<a name="Mob+iconURL"></a>

### mob.iconURL : <code>String</code>
The URL of the picture used for icons on embeds relating to this mob

**Kind**: instance property of [<code>Mob</code>](#Mob)  
<a name="Mob+description"></a>

### mob.description : <code>String</code>
A description of this mob

**Kind**: instance property of [<code>Mob</code>](#Mob)  
<a name="Mob+actionsPerRound"></a>

### mob.actionsPerRound : <code>Number</code>
The number of actions this mob is allowed to take per-round in a battle

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Default**: <code>1</code>  
<a name="Mob+actionsTakenThisRound"></a>

### mob.actionsTakenThisRound : <code>Number</code>
The number of actions this mob has taken in the current round (if in a battle)

**Kind**: instance property of [<code>Mob</code>](#Mob)  
<a name="Mob+location"></a>

### mob.location : [<code>Location</code>](#Location)
The location this mob is currently at

**Kind**: instance property of [<code>Mob</code>](#Mob)  
<a name="Mob+battle"></a>

### mob.battle : [<code>Battle</code>](#Battle)
The battle this mob is currently in (if any)

**Kind**: instance property of [<code>Mob</code>](#Mob)  
<a name="Base+id"></a>

### mob.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Overrides**: [<code>id</code>](#Base+id)  
<a name="Base+world"></a>

### mob.world : [<code>World</code>](#World)
The world associated with this object

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Overrides**: [<code>world</code>](#Base+world)  
<a name="Base+deleted"></a>

### mob.deleted : <code>Boolean</code>
Whether this object has been deleted or not

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Overrides**: [<code>deleted</code>](#Base+deleted)  
<a name="Base+guild"></a>

### mob.guild : <code>Guild</code>
The guild associated with this object

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Overrides**: [<code>guild</code>](#Base+guild)  
<a name="Mob+init"></a>

### mob.init() ⇒ <code>Promise</code>
The builder function. This must be called after construction and before using the instance of this class

**Kind**: instance method of [<code>Mob</code>](#Mob)  
<a name="Mob+createItem"></a>

### mob.createItem(name, options) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
Create an item in this mob's possession

**Kind**: instance method of [<code>Mob</code>](#Mob)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the item |
| options | <code>Object</code> | The options to create this item with |

<a name="Mob+action"></a>

### mob.action(actionString) ⇒ [<code>Promise.&lt;Action&gt;</code>](#Action)
Have this mob take an action

**Kind**: instance method of [<code>Mob</code>](#Mob)  

| Param | Type | Description |
| --- | --- | --- |
| actionString | <code>String</code> | A description of the action itself (What will your mob do?). |

<a name="Mob+move"></a>

### mob.move(locationResolvable) ⇒ <code>Promise</code>
Move this mob to a location

**Kind**: instance method of [<code>Mob</code>](#Mob)  

| Param | Type | Description |
| --- | --- | --- |
| locationResolvable | <code>LocationResolvable</code> | A resolvable of the location to move to |

<a name="Mob+delete"></a>

### mob.delete() ⇒ <code>void</code>
Delete this mob

**Kind**: instance method of [<code>Mob</code>](#Mob)  
<a name="Mob+event_changedLocation"></a>

### "changedLocation" ([oldLocation], [newLocation])
Emitted when this mob changes locations

**Kind**: event emitted by [<code>Mob</code>](#Mob)  

| Param | Type | Description |
| --- | --- | --- |
| [oldLocation] | [<code>Location</code>](#Location) | Previous location |
| [newLocation] | [<code>Location</code>](#Location) | New location |

<a name="Mob+event_actionTaken"></a>

### "actionTaken" ([action])
Emitted when this mob takes an action

**Kind**: event emitted by [<code>Mob</code>](#Mob)  

| Param | Type | Description |
| --- | --- | --- |
| [action] | [<code>Action</code>](#Action) | The action that was taken |

<a name="Monster"></a>

## Monster ⇐ [<code>Mob</code>](#Mob)
Represents a monster (a non-player-controlled mob)

**Kind**: global class  
**Extends**: [<code>Mob</code>](#Mob)  

* [Monster](#Monster) ⇐ [<code>Mob</code>](#Mob)
    * [new Monster(world, options)](#new_Monster_new)
    * [.name](#Mob+name) : <code>String</code>
    * [.actions](#Mob+actions) : [<code>Collection</code>](#Collection)
    * [.items](#Mob+items) : [<code>Collection</code>](#Collection)
    * [.iconURL](#Mob+iconURL) : <code>String</code>
    * [.description](#Mob+description) : <code>String</code>
    * [.actionsPerRound](#Mob+actionsPerRound) : <code>Number</code>
    * [.actionsTakenThisRound](#Mob+actionsTakenThisRound) : <code>Number</code>
    * [.location](#Mob+location) : [<code>Location</code>](#Location)
    * [.battle](#Mob+battle) : [<code>Battle</code>](#Battle)
    * [.id](#Base+id) : <code>String</code>
    * [.world](#Base+world) : [<code>World</code>](#World)
    * [.deleted](#Base+deleted) : <code>Boolean</code>
    * [.guild](#Base+guild) : <code>Guild</code>
    * [.init()](#Monster+init) ⇒ <code>Promise</code>
    * [.createItem(name, options)](#Mob+createItem) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
    * [.action(actionString)](#Mob+action) ⇒ [<code>Promise.&lt;Action&gt;</code>](#Action)
    * [.move(locationResolvable)](#Mob+move) ⇒ <code>Promise</code>
    * [.delete()](#Mob+delete) ⇒ <code>void</code>
    * ["changedLocation" ([oldLocation], [newLocation])](#Mob+event_changedLocation)
    * ["actionTaken" ([action])](#Mob+event_actionTaken)

<a name="new_Monster_new"></a>

### new Monster(world, options)

| Param | Type | Description |
| --- | --- | --- |
| world | [<code>World</code>](#World) | The world to create this monster in |
| options | <code>Object</code> | The options to create this monster with |

<a name="Mob+name"></a>

### monster.name : <code>String</code>
The name of this mob

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>name</code>](#Mob+name)  
<a name="Mob+actions"></a>

### monster.actions : [<code>Collection</code>](#Collection)
All the actions that this mob has taken

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>actions</code>](#Mob+actions)  
<a name="Mob+items"></a>

### monster.items : [<code>Collection</code>](#Collection)
All the items that this mob possesses

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>items</code>](#Mob+items)  
<a name="Mob+iconURL"></a>

### monster.iconURL : <code>String</code>
The URL of the picture used for icons on embeds relating to this mob

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>iconURL</code>](#Mob+iconURL)  
<a name="Mob+description"></a>

### monster.description : <code>String</code>
A description of this mob

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>description</code>](#Mob+description)  
<a name="Mob+actionsPerRound"></a>

### monster.actionsPerRound : <code>Number</code>
The number of actions this mob is allowed to take per-round in a battle

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Default**: <code>1</code>  
**Overrides**: [<code>actionsPerRound</code>](#Mob+actionsPerRound)  
<a name="Mob+actionsTakenThisRound"></a>

### monster.actionsTakenThisRound : <code>Number</code>
The number of actions this mob has taken in the current round (if in a battle)

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>actionsTakenThisRound</code>](#Mob+actionsTakenThisRound)  
<a name="Mob+location"></a>

### monster.location : [<code>Location</code>](#Location)
The location this mob is currently at

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>location</code>](#Mob+location)  
<a name="Mob+battle"></a>

### monster.battle : [<code>Battle</code>](#Battle)
The battle this mob is currently in (if any)

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>battle</code>](#Mob+battle)  
<a name="Base+id"></a>

### monster.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>id</code>](#Base+id)  
<a name="Base+world"></a>

### monster.world : [<code>World</code>](#World)
The world associated with this object

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>world</code>](#Base+world)  
<a name="Base+deleted"></a>

### monster.deleted : <code>Boolean</code>
Whether this object has been deleted or not

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>deleted</code>](#Base+deleted)  
<a name="Base+guild"></a>

### monster.guild : <code>Guild</code>
The guild associated with this object

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>guild</code>](#Base+guild)  
<a name="Monster+init"></a>

### monster.init() ⇒ <code>Promise</code>
The builder function. This must be called after construction and before using the instance of this class

**Kind**: instance method of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>init</code>](#Mob+init)  
<a name="Mob+createItem"></a>

### monster.createItem(name, options) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
Create an item in this mob's possession

**Kind**: instance method of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>createItem</code>](#Mob+createItem)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the item |
| options | <code>Object</code> | The options to create this item with |

<a name="Mob+action"></a>

### monster.action(actionString) ⇒ [<code>Promise.&lt;Action&gt;</code>](#Action)
Have this mob take an action

**Kind**: instance method of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>action</code>](#Mob+action)  

| Param | Type | Description |
| --- | --- | --- |
| actionString | <code>String</code> | A description of the action itself (What will your mob do?). |

<a name="Mob+move"></a>

### monster.move(locationResolvable) ⇒ <code>Promise</code>
Move this mob to a location

**Kind**: instance method of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>move</code>](#Mob+move)  

| Param | Type | Description |
| --- | --- | --- |
| locationResolvable | <code>LocationResolvable</code> | A resolvable of the location to move to |

<a name="Mob+delete"></a>

### monster.delete() ⇒ <code>void</code>
Delete this mob

**Kind**: instance method of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>delete</code>](#Mob+delete)  
<a name="Mob+event_changedLocation"></a>

### "changedLocation" ([oldLocation], [newLocation])
Emitted when this mob changes locations

**Kind**: event emitted by [<code>Monster</code>](#Monster)  
**Overrides**: [<code>changedLocation</code>](#Mob+event_changedLocation)  

| Param | Type | Description |
| --- | --- | --- |
| [oldLocation] | [<code>Location</code>](#Location) | Previous location |
| [newLocation] | [<code>Location</code>](#Location) | New location |

<a name="Mob+event_actionTaken"></a>

### "actionTaken" ([action])
Emitted when this mob takes an action

**Kind**: event emitted by [<code>Monster</code>](#Monster)  
**Overrides**: [<code>actionTaken</code>](#Mob+event_actionTaken)  

| Param | Type | Description |
| --- | --- | --- |
| [action] | [<code>Action</code>](#Action) | The action that was taken |

<a name="Player"></a>

## Player ⇐ [<code>Mob</code>](#Mob)
Represents a player

**Kind**: global class  
**Extends**: [<code>Mob</code>](#Mob)  

* [Player](#Player) ⇐ [<code>Mob</code>](#Mob)
    * [new Player(world, options)](#new_Player_new)
    * [.guildMember](#Player+guildMember) : <code>GuildMember</code>
    * [.commandHandler](#Player+commandHandler)
    * [.name](#Mob+name) : <code>String</code>
    * [.actions](#Mob+actions) : [<code>Collection</code>](#Collection)
    * [.items](#Mob+items) : [<code>Collection</code>](#Collection)
    * [.iconURL](#Mob+iconURL) : <code>String</code>
    * [.description](#Mob+description) : <code>String</code>
    * [.actionsPerRound](#Mob+actionsPerRound) : <code>Number</code>
    * [.actionsTakenThisRound](#Mob+actionsTakenThisRound) : <code>Number</code>
    * [.location](#Mob+location) : [<code>Location</code>](#Location)
    * [.battle](#Mob+battle) : [<code>Battle</code>](#Battle)
    * [.id](#Base+id) : <code>String</code>
    * [.world](#Base+world) : [<code>World</code>](#World)
    * [.deleted](#Base+deleted) : <code>Boolean</code>
    * [.guild](#Base+guild) : <code>Guild</code>
    * [.init()](#Player+init) ⇒ <code>Promise</code>
    * [.createItem(name, options)](#Mob+createItem) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
    * [.action(actionString)](#Mob+action) ⇒ [<code>Promise.&lt;Action&gt;</code>](#Action)
    * [.move(locationResolvable)](#Mob+move) ⇒ <code>Promise</code>
    * [.delete()](#Mob+delete) ⇒ <code>void</code>
    * ["changedLocation" ([oldLocation], [newLocation])](#Mob+event_changedLocation)
    * ["actionTaken" ([action])](#Mob+event_actionTaken)

<a name="new_Player_new"></a>

### new Player(world, options)

| Param | Type | Description |
| --- | --- | --- |
| world | [<code>World</code>](#World) | The world to create the player in |
| options | <code>Object</code> | The options to create the player with |

<a name="Player+guildMember"></a>

### player.guildMember : <code>GuildMember</code>
The GuildMember that this player is attached to

**Kind**: instance property of [<code>Player</code>](#Player)  
<a name="Player+commandHandler"></a>

### player.commandHandler
The commandHandler for this player (The provided condition is that the message author must match this player's guildMember)

**Kind**: instance property of [<code>Player</code>](#Player)  
<a name="Mob+name"></a>

### player.name : <code>String</code>
The name of this mob

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>name</code>](#Mob+name)  
<a name="Mob+actions"></a>

### player.actions : [<code>Collection</code>](#Collection)
All the actions that this mob has taken

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>actions</code>](#Mob+actions)  
<a name="Mob+items"></a>

### player.items : [<code>Collection</code>](#Collection)
All the items that this mob possesses

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>items</code>](#Mob+items)  
<a name="Mob+iconURL"></a>

### player.iconURL : <code>String</code>
The URL of the picture used for icons on embeds relating to this mob

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>iconURL</code>](#Mob+iconURL)  
<a name="Mob+description"></a>

### player.description : <code>String</code>
A description of this mob

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>description</code>](#Mob+description)  
<a name="Mob+actionsPerRound"></a>

### player.actionsPerRound : <code>Number</code>
The number of actions this mob is allowed to take per-round in a battle

**Kind**: instance property of [<code>Player</code>](#Player)  
**Default**: <code>1</code>  
**Overrides**: [<code>actionsPerRound</code>](#Mob+actionsPerRound)  
<a name="Mob+actionsTakenThisRound"></a>

### player.actionsTakenThisRound : <code>Number</code>
The number of actions this mob has taken in the current round (if in a battle)

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>actionsTakenThisRound</code>](#Mob+actionsTakenThisRound)  
<a name="Mob+location"></a>

### player.location : [<code>Location</code>](#Location)
The location this mob is currently at

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>location</code>](#Mob+location)  
<a name="Mob+battle"></a>

### player.battle : [<code>Battle</code>](#Battle)
The battle this mob is currently in (if any)

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>battle</code>](#Mob+battle)  
<a name="Base+id"></a>

### player.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>id</code>](#Base+id)  
<a name="Base+world"></a>

### player.world : [<code>World</code>](#World)
The world associated with this object

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>world</code>](#Base+world)  
<a name="Base+deleted"></a>

### player.deleted : <code>Boolean</code>
Whether this object has been deleted or not

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>deleted</code>](#Base+deleted)  
<a name="Base+guild"></a>

### player.guild : <code>Guild</code>
The guild associated with this object

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>guild</code>](#Base+guild)  
<a name="Player+init"></a>

### player.init() ⇒ <code>Promise</code>
The builder function. This must be called after construction and before using the instance of this class

**Kind**: instance method of [<code>Player</code>](#Player)  
**Overrides**: [<code>init</code>](#Mob+init)  
<a name="Mob+createItem"></a>

### player.createItem(name, options) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
Create an item in this mob's possession

**Kind**: instance method of [<code>Player</code>](#Player)  
**Overrides**: [<code>createItem</code>](#Mob+createItem)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the item |
| options | <code>Object</code> | The options to create this item with |

<a name="Mob+action"></a>

### player.action(actionString) ⇒ [<code>Promise.&lt;Action&gt;</code>](#Action)
Have this mob take an action

**Kind**: instance method of [<code>Player</code>](#Player)  
**Overrides**: [<code>action</code>](#Mob+action)  

| Param | Type | Description |
| --- | --- | --- |
| actionString | <code>String</code> | A description of the action itself (What will your mob do?). |

<a name="Mob+move"></a>

### player.move(locationResolvable) ⇒ <code>Promise</code>
Move this mob to a location

**Kind**: instance method of [<code>Player</code>](#Player)  
**Overrides**: [<code>move</code>](#Mob+move)  

| Param | Type | Description |
| --- | --- | --- |
| locationResolvable | <code>LocationResolvable</code> | A resolvable of the location to move to |

<a name="Mob+delete"></a>

### player.delete() ⇒ <code>void</code>
Delete this mob

**Kind**: instance method of [<code>Player</code>](#Player)  
**Overrides**: [<code>delete</code>](#Mob+delete)  
<a name="Mob+event_changedLocation"></a>

### "changedLocation" ([oldLocation], [newLocation])
Emitted when this mob changes locations

**Kind**: event emitted by [<code>Player</code>](#Player)  
**Overrides**: [<code>changedLocation</code>](#Mob+event_changedLocation)  

| Param | Type | Description |
| --- | --- | --- |
| [oldLocation] | [<code>Location</code>](#Location) | Previous location |
| [newLocation] | [<code>Location</code>](#Location) | New location |

<a name="Mob+event_actionTaken"></a>

### "actionTaken" ([action])
Emitted when this mob takes an action

**Kind**: event emitted by [<code>Player</code>](#Player)  
**Overrides**: [<code>actionTaken</code>](#Mob+event_actionTaken)  

| Param | Type | Description |
| --- | --- | --- |
| [action] | [<code>Action</code>](#Action) | The action that was taken |

<a name="Utility"></a>

## Utility
A group of static utility functions

**Kind**: global class  

* [Utility](#Utility)
    * [.defined(value)](#Utility.defined) ⇒ <code>Boolean</code>
    * [.sleep(time)](#Utility.sleep) ⇒ <code>Promise</code>
    * [.randomID(length)](#Utility.randomID) ⇒ <code>void</code>

<a name="Utility.defined"></a>

### Utility.defined(value) ⇒ <code>Boolean</code>
A nice way of testing whether a value is undefined or not

**Kind**: static method of [<code>Utility</code>](#Utility)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value to test |

<a name="Utility.sleep"></a>

### Utility.sleep(time) ⇒ <code>Promise</code>
An async function that resolves its promise after a specified number of milliseconds

**Kind**: static method of [<code>Utility</code>](#Utility)  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>Number</code> | The amount of time to delay (in milliseconds) |

<a name="Utility.randomID"></a>

### Utility.randomID(length) ⇒ <code>void</code>
Creates a random hex string of a specified length

**Kind**: static method of [<code>Utility</code>](#Utility)  

| Param | Type | Description |
| --- | --- | --- |
| length | <code>Number</code> | The length of the string to be generated |

<a name="World"></a>

## World ⇐ <code>AsyncEventEmitter</code>
Represents a world and is the main class that all other classes connect to.

**Kind**: global class  
**Extends**: <code>AsyncEventEmitter</code>  

* [World](#World) ⇐ <code>AsyncEventEmitter</code>
    * [new World([options])](#new_World_new)
    * [.id](#World+id) : <code>String</code>
    * [.bot](#World+bot) : <code>Client</code>
    * [.botPrefix](#World+botPrefix) : <code>String</code>
    * [.botToken](#World+botToken) : <code>String</code>
    * [.guild](#World+guild) : <code>Guild</code>
    * [.name](#World+name) : <code>String</code>
    * [.locations](#World+locations) : [<code>Collection</code>](#Collection)
    * [.mobs](#World+mobs) : [<code>Collection</code>](#Collection)
    * [.actions](#World+actions) : [<code>Collection</code>](#Collection)
    * [.battles](#World+battles) : [<code>Collection</code>](#Collection)
    * [.items](#World+items) : [<code>Collection</code>](#Collection)
    * [.init()](#World+init) ⇒ <code>Promise</code>
    * [.generateAll()](#World+generateAll) ⇒ <code>Promise</code>
    * [.ungenerateAll()](#World+ungenerateAll) ⇒ <code>Promise</code>
    * [.createLocation(name, options)](#World+createLocation) ⇒ [<code>Promise.&lt;Location&gt;</code>](#Location)

<a name="new_World_new"></a>

### new World([options])

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | The options to create this world with |
| [options.name] | <code>String</code> | A name for the world |
| [options.bot] | <code>Object</code> |  |
| [options.bot.prefix] | <code>String</code> | The prefix used to denote commands for this bot |
| [options.bot.token] | <code>String</code> | The Discord API bot token to use |
| [options.guild] | <code>GuildResolvable</code> | The guild this world should be attached to |

<a name="World+id"></a>

### world.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>World</code>](#World)  
<a name="World+bot"></a>

### world.bot : <code>Client</code>
The Discord bot that is being used for this world

**Kind**: instance property of [<code>World</code>](#World)  
<a name="World+botPrefix"></a>

### world.botPrefix : <code>String</code>
The prefix used to denote commands for the bot

**Kind**: instance property of [<code>World</code>](#World)  
<a name="World+botToken"></a>

### world.botToken : <code>String</code>
The Discord API token being used for the bot

**Kind**: instance property of [<code>World</code>](#World)  
<a name="World+guild"></a>

### world.guild : <code>Guild</code>
The guild that this world is attached to

**Kind**: instance property of [<code>World</code>](#World)  
<a name="World+name"></a>

### world.name : <code>String</code>
The name of this world

**Kind**: instance property of [<code>World</code>](#World)  
<a name="World+locations"></a>

### world.locations : [<code>Collection</code>](#Collection)
All locations contained within this world

**Kind**: instance property of [<code>World</code>](#World)  
<a name="World+mobs"></a>

### world.mobs : [<code>Collection</code>](#Collection)
All mobs contained within this world

**Kind**: instance property of [<code>World</code>](#World)  
<a name="World+actions"></a>

### world.actions : [<code>Collection</code>](#Collection)
All actions that have been performed in this world

**Kind**: instance property of [<code>World</code>](#World)  
<a name="World+battles"></a>

### world.battles : [<code>Collection</code>](#Collection)
All battle that are currently taking place in this world

**Kind**: instance property of [<code>World</code>](#World)  
<a name="World+items"></a>

### world.items : [<code>Collection</code>](#Collection)
All items contained within this world

**Kind**: instance property of [<code>World</code>](#World)  
<a name="World+init"></a>

### world.init() ⇒ <code>Promise</code>
The builder function. This must be called after construction and before using the instance of this class

**Kind**: instance method of [<code>World</code>](#World)  
<a name="World+generateAll"></a>

### world.generateAll() ⇒ <code>Promise</code>
Runs the `generate()` method on every location that is attached to this world

**Kind**: instance method of [<code>World</code>](#World)  
<a name="World+ungenerateAll"></a>

### world.ungenerateAll() ⇒ <code>Promise</code>
The reverse of `generateAll()`
Runs the `ungenerate()` method on every location that is attached to this world

**Kind**: instance method of [<code>World</code>](#World)  
<a name="World+createLocation"></a>

### world.createLocation(name, options) ⇒ [<code>Promise.&lt;Location&gt;</code>](#Location)
Creates a location inside of this world

**Kind**: instance method of [<code>World</code>](#World)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | A name for the location |
| options | <code>Object</code> | The options to create this location with |

