var Crypto = require('crypto');

class Utility {
	static defined(value) {
		if (value === undefined) {
			return false;
		} else if (value !== undefined) {
			return true
		}
	}
	static sleep(time) {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, time);
		})
	}
	static randomID(length) {
		let buffer = Crypto.randomBytes(length);
		return parseInt(buffer.toString("hex"), 10).toString();
	}
}

module.exports = Utility;