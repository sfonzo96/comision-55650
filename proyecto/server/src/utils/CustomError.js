export default class CustomError extends Error {
	constructor(message, status = 500) {
		super(message);
		this.status = status;
		this.name = this.constructor.name;
		// Esto permite guarda la secuencia de funciones que se fueron llamando para identificar precisamente
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
