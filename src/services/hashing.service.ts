import bcrypt from 'bcrypt';

class HashingService {
	hash(data: string) {
		return bcrypt.hash(data, 10);
	}

	compare;
}
