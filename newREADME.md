## Classes

<dl>
<dt><a href="#Battle">Battle</a> ⇐ <code>Base</code></dt>
<dd><p>Represents a battle.</p>
</dd>
<dt><a href="#Location">Location</a> ⇐ <code>Base</code></dt>
<dd><p>Represents a location</p>
</dd>
<dt><a href="#CommandHandler">CommandHandler</a> ⇐ <code>Base</code></dt>
<dd><p>Handles incoming messages containing commands</p>
</dd>
</dl>

<a name="Battle"></a>

## Battle ⇐ <code>Base</code>
Represents a battle.

**Kind**: global class  
**Extends**: <code>Base</code>  

* [Battle](#Battle) ⇐ <code>Base</code>
    * [new Battle(world, options)](#new_Battle_new)
    * [.location](#Battle+location) : [<code>Location</code>](#Location)
    * [.name](#Battle+name) : <code>String</code>
    * [.mobs](#Battle+mobs) : <code>Collection.&lt;Mob&gt;</code>
    * [.currentRound](#Battle+currentRound) : <code>Number</code>
    * [.actions](#Battle+actions) : <code>Collection.&lt;Action&gt;</code>
    * [.roundTimeLimit](#Battle+roundTimeLimit) : <code>Number</code>
    * [.started](#Battle+started) : <code>Boolean</code>
    * [.init()](#Battle+init)
    * [.start()](#Battle+start) ⇒ <code>void</code>
    * [.addMob(mobResolvable)](#Battle+addMob) ⇒ <code>void</code>
    * [.removeMob(mobResolvable)](#Battle+removeMob) ⇒ <code>void</code>
    * [.delete()](#Battle+delete) ⇒ <code>void</code>

<a name="new_Battle_new"></a>

### new Battle(world, options)

| Param | Type | Description |
| --- | --- | --- |
| world | <code>World</code> | The world to create this battle in |
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

### battle.mobs : <code>Collection.&lt;Mob&gt;</code>
All mobs participating in this battle

**Kind**: instance property of [<code>Battle</code>](#Battle)  
<a name="Battle+currentRound"></a>

### battle.currentRound : <code>Number</code>
The current round number of this battle

**Kind**: instance property of [<code>Battle</code>](#Battle)  
<a name="Battle+actions"></a>

### battle.actions : <code>Collection.&lt;Action&gt;</code>
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
<a name="Location"></a>

## Location ⇐ <code>Base</code>
Represents a location

**Kind**: global class  
**Extends**: <code>Base</code>  

* [Location](#Location) ⇐ <code>Base</code>
    * [new Location(world, options)](#new_Location_new)
    * [.generated](#Location+generated) : <code>Boolean</code>
    * [.mobs](#Location+mobs) : <code>Collection.&lt;Mob&gt;</code>
    * [.actions](#Location+actions) : <code>Collection.&lt;Action&gt;</code>
    * [.items](#Location+items) : <code>Collection.&lt;Item&gt;</code>
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
    * [.init()](#Location+init)
    * [.generate()](#Location+generate) ⇒ <code>void</code>
    * [.ungenerate()](#Location+ungenerate) ⇒ <code>void</code>
    * [.createBattle(name, options)](#Location+createBattle) ⇒ [<code>Battle</code>](#Battle)
    * [.createPlayer(name, options)](#Location+createPlayer) ⇒ <code>Player</code>
    * [.createMonster(name, options)](#Location+createMonster) ⇒ <code>Monster</code>
    * [.createItem(name, options)](#Location+createItem) ⇒ <code>Item</code>
    * [.attach(location, direction)](#Location+attach) ⇒ <code>void</code>
    * [.message(message)](#Location+message) ⇒ <code>Message</code>
    * [.delete()](#Location+delete) ⇒ <code>void</code>

<a name="new_Location_new"></a>

### new Location(world, options)

| Param | Type |
| --- | --- |
| world | <code>World</code> | 
| options | <code>Object</code> | 

<a name="Location+generated"></a>

### location.generated : <code>Boolean</code>
Indicates whether this location has been generated

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+mobs"></a>

### location.mobs : <code>Collection.&lt;Mob&gt;</code>
All mobs currently at this location

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+actions"></a>

### location.actions : <code>Collection.&lt;Action&gt;</code>
All actions taken at this location

**Kind**: instance property of [<code>Location</code>](#Location)  
<a name="Location+items"></a>

### location.items : <code>Collection.&lt;Item&gt;</code>
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
<a name="Location+init"></a>

### location.init()
The builder function. This must be called after construction and before using the instance of this class

**Kind**: instance method of [<code>Location</code>](#Location)  
<a name="Location+generate"></a>

### location.generate() ⇒ <code>void</code>
Creates the role and channels for this location and links the associated locations to the newly created button channels

**Kind**: instance method of [<code>Location</code>](#Location)  
<a name="Location+ungenerate"></a>

### location.ungenerate() ⇒ <code>void</code>
Reverses the effects of the `generate()` method

**Kind**: instance method of [<code>Location</code>](#Location)  
<a name="Location+createBattle"></a>

### location.createBattle(name, options) ⇒ [<code>Battle</code>](#Battle)
Creates a battle at this location

**Kind**: instance method of [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the battle |
| options | <code>Object</code> | The options for this battle |

<a name="Location+createPlayer"></a>

### location.createPlayer(name, options) ⇒ <code>Player</code>
Creates a player at this location

**Kind**: instance method of [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the player |
| options | <code>Object</code> | The options for this player |

<a name="Location+createMonster"></a>

### location.createMonster(name, options) ⇒ <code>Monster</code>
Creates a monster at this location

**Kind**: instance method of [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the monster |
| options | <code>Object</code> | The options for this monster |

<a name="Location+createItem"></a>

### location.createItem(name, options) ⇒ <code>Item</code>
Creates a item at this location

**Kind**: instance method of [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the item |
| options | <code>Object</code> | The options for this item |

<a name="Location+attach"></a>

### location.attach(location, direction) ⇒ <code>void</code>
Places a location next to this one in a specified direction

**Kind**: instance method of [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| location | [<code>Location</code>](#Location) | The location to place |
| direction | <code>String</code> | One of the following directions: "up", "down", "north", "east", "south", or "west" |

<a name="Location+message"></a>

### location.message(message) ⇒ <code>Message</code>
Sends a message to the `textChannel` property channel

**Kind**: instance method of [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The message text |

<a name="Location+delete"></a>

### location.delete() ⇒ <code>void</code>
Deletes this location and all references to it

**Kind**: instance method of [<code>Location</code>](#Location)  
<a name="CommandHandler"></a>

## CommandHandler ⇐ <code>Base</code>
Handles incoming messages containing commands

**Kind**: global class  
**Extends**: <code>Base</code>  

* [CommandHandler](#CommandHandler) ⇐ <code>Base</code>
    * [new CommandHandler(world, options)](#new_CommandHandler_new)
    * [.commands](#CommandHandler+commands) : <code>Object</code>
    * [._this](#CommandHandler+_this) : <code>Object</code>
    * [._condition](#CommandHandler+_condition) : <code>function</code>

<a name="new_CommandHandler_new"></a>

### new CommandHandler(world, options)

| Param | Type | Description |
| --- | --- | --- |
| world | <code>World</code> | The world to add this CommandHandler to |
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
