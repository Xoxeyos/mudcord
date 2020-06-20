/**
 * A Map with some extra functions where the ID is used as an identifier
 * @extends {Map}
 */
class Collection extends Map {
	/**
	 * @param  {Class} type - The class that this collection is for
	 */
	constructor(type) {
		super();
		this.type = type;
	}
	/**
	 * Adds objects (or an object) to the collection
	 * @param {Object|Collection<Object>|Array<Object>} objects 
	 * @returns {void}
	 */
	add(objects) {
		if (typeof objects == "array") {
			for (let x = 0; x < objects; x++) {
				if (!(objects[x] instanceof this.type)) throw new TypeError(`Collection type is ${this.type.constructor.name } but got ${objects[x].constructor.name}.`);
				this.set(objects[x].id, objects[x]);
			}
		} else if (typeof objects == "object") {
			if (objects instanceof Collection) {
				objects.forEach((value, key, map) => {
					if (!(value instanceof this.type)) throw new TypeError(`Collection type is ${this.type.constructor.name } but got ${value.constructor.name}.`);
					this.set(key, value);
				});
			} else {
				this.set(objects.id, objects);
			}
		}
	}
	/**
	 * Removes objects (or an object) from the collection
	 * @param  {undefined|Collection<Object>|Array<ObjectResolvable>|ObjectResolvable} objectResolvables - If this value is undefined, all items are removed from the collection
	 * @returns {void}
	 */
	remove(objectResolvables) {
		if (typeof objectResolvables == "array") {
			for (let x = 0; x < objectResolvables; x++) {
				if (typeof objectResolvables[x] == "object") {
					if (!(objectResolvables[x] instanceof this.type)) throw new TypeError(`Collection type is ${this.type.constructor.name } but got ${objectResolvables[x].constructor.name}.`);
					let object = this.resolve(objectResolvables[x]);
					this.delete(objectResolvables[x].id);
				} else if (typeof objectResolvables[x] == "string") {
					let object = this.resolve(objectResolvables[x]);
					this.delete(objectResolvables[x]);
				}
			}
		} else if (typeof objectResolvables == "object") {
			if (objectResolvables instanceof Collection) {
				objectResolvables.forEach((value, key, map) => {
					if (!(value instanceof this.type)) throw new TypeError(`Collection type is ${this.type.constructor.name } but got ${value.constructor.name}.`);
					let object = this.resolve(value);
					this.delete(key);
				});
			} else {
				if (!(objectResolvables instanceof this.type)) throw new TypeError(`Collection type is ${this.type.constructor.name } but got ${objectResolvables.constructor.name}.`);
				let object = this.resolve(objectResolvables);
				this.delete(objectResolvables.id);
			}
		} else if (typeof objectResolvables == "string") {
			let object = this.resolve(objectResolvables);
			this.delete(objectResolvables);
		} else if (objectResolvables == undefined) {
			this.forEach((value, key, map) => {
				this.delete(key);
			});
		}
	}
	/**
	 * Resolves ObjectResolvables (or ObjectResolvables) to an object in the collection
	 * @param {Collection<Object>|Array<ObjectResolvable>|ObjectResolvable} objectResolvables
	 * @return {Object}
	 */
	resolve(objectResolvables) {
		if (typeof objectResolvables == "array") {
			let outputArray = [];
			for (let x = 0; x < objectResolvables; x++) {
				if (typeof objectResolvables[x] == "object") {
					outputArray.push(this.get(objectResolvables[x].id));
				} else if (typeof objectResolvables[x] == "string") {
					outputArray.push(this.get(objectResolvables[x]));
				}
			}
			return outputArray;
		} else if (objectResolvables instanceof Collection) {
			let outputCollection = new Collection();
			objectResolvables.forEach((value, key, map) => {
				outputCollection.set(key, this.get(key));
			});
			return outputCollection;
		} else if (typeof objectResolvables == "object") {
			return this.get(objectResolvables.id);
		} else if (typeof objectResolvables == "string") {
			return this.get(objectResolvables);
		} else if (objectResolvables == undefined) {
			return undefined;
		}
	}
	/**
	 * Same as Array.every(). Returns true if every item in this collection passes the provided condition.
	 * @param  {Function} condition - The condition function to test with
	 * @return {Boolean}
	 */
	async every(condition) {
		for (let item of this) {
			let output = await condition(item[1], item[0], this);
			if (!output) {
				return false;
			}
		}
		return true;
	}
	/**
	 * Same as Array.find(). Returns the first item in this collection that satisfies the provided condition.
	 * @param  {Function} condition - The condition function to test with
	 * @return {Object}
	 */
	async find(condition) {
		for (let item of this) {
			let output = await condition(item[1], item[0], this);
			if (output) {
				return item;
			}
		}
	}
}

module.exports = Collection;