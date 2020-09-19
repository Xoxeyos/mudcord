const crypto = require('crypto');
const EventEmitter = require('events');

let utility = {};
/**
	 * An async function that resolves its promise after a specified number of milliseconds
	 * @param  {Number} time - The amount of time to delay (in milliseconds)
	 * @return {Promise}
	 * @static
	 */

utility.sleep = function (time) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, time);
	});
}
/**
 * Creates a random hex string of a specified length
 * @param  {Number} length - The length of the string to be generated
 * @return {String}
 * @static
 */
utility.randomID = function (length) {
	let buffer = crypto.randomBytes(length);
	let bufferHexString = buffer.toString("hex");
	return bufferHexString;
}

function AsyncEventEmitter() {
	EventEmitter.call(this);
}
AsyncEventEmitter.prototype = Object.create(EventEmitter.prototype);
AsyncEventEmitter.prototype.emit = async function (type, ...args) {
	const handler = _.get(this._events, type);
	if (_.isEmpty(handler) && !_.isFunction(handler)) {
		return false;
	}

	const promises = [];

	if (typeof handler === 'function') {
		promises.push(Reflect.apply(handler, this, args));
	} else {
		const len = handler.length;
		const listeners = _.clone(handler, len);
		for (let i = 0; i < len; i += 1) {
			promises.push(Reflect.apply(listeners[i], this, args));
		}
	}

	await Promise.all(promises);

	return true;
}
utility.AsyncEventEmitter = AsyncEventEmitter;

module.exports = utility;