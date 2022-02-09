export class AppError {
	message: string;
	statusCode: number | string;
	errors: (string | number)[];

	constructor(
		statusCode: number | string,
		message: string,
		errors?: (string | number)[]
	) {
		this.message = message;
		this.statusCode = statusCode;
		this.errors = errors;
	}
}
