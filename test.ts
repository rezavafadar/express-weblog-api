class AppError {
	message: string;
	statusCode: number | string;
	errors: (string | number)[];

	constructor(
		statusCode: number | string,
		message: string,
		errors: (string | number)[]
	) {
		this.message = message;
		this.statusCode = statusCode;
		this.errors = errors;
	}
}

const er = new AppError(100, 'user validation failed!', []);
console.log(er);
