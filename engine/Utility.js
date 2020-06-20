const Crypto = require('crypto');

/**
 * A group of static utility functions
 */
class Utility {
	/**
	 * A nice way of testing whether a value is undefined or not
	 * @param  {*} value - Value to test
	 * @return {Boolean}
	 * @static
	 */
	static defined(value) {
		if (value === undefined) {
			return false;
		} else if (value !== undefined) {
			return true
		}
	}
	/**
	 * An async function that resolves its promise after a specified number of milliseconds
	 * @param  {Number} time - The amount of time to delay (in milliseconds)
	 * @return {Promise}
	 * @static
	 */
	static sleep(time) {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, time);
		})
	}
	/**
	 * Creates a random hex string of a specified length
	 * @param  {Number} length - The length of the string to be generated
	 * @return {void}
	 * @static
	 */
	static randomID(length) {
		let buffer = Crypto.randomBytes(length);
		let bufferHexString = buffer.toString("hex");
		return bufferHexString;
	}
}

module.exports = Utility;