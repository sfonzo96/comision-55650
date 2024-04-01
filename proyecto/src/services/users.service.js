export default class UserService {
	static instance;

	constructor(repo) {
		this.repo = repo;
	}

	async createUser(user) {
		const newUser = await this.repo.createUser(user);
		delete newUser.password;
		return newUser;
	}

	async getUserByEmail(email) {
		const user = await this.repo.getByEmail(email);
		delete user.password;
		return user;
	}

	async getUserById(id) {
		const user = await this.repo.getById(id);
		return user;
	}

	async getOrCreateUser(userData) {
		const user = await this.repo.getByEmail(userData.email);
		if (user) {
			delete user.password;
			return user;
		}

		const newUser = await this.repo.createUser(userData);
		delete newUser.password;
		return newUser;
	}

	async updatePassword(id, newPassword) {
		const user = await this.repo.updatePassword(id, newPassword);
		delete user.password;
		return user;
	}

	static getInstance(repo) {
		if (!UserService.instance) {
			UserService.instance = new UserService(repo);
		}
		return UserService.instance;
	}
}
