export interface User {
	id: number;
	fullname: string;
	email: string;
	username: string;
	role: 'admin' | 'user';
	avatar: string;
	bio?: string;
	age?: number;
	gender: 'female' | 'man' | 'other';
	instagram_account?: string;
	twitter_account?: string;
}
