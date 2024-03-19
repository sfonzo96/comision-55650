export default class UserService {
	constructor(repo) {
		this.repo = repo;
	}

	async createUser(user) {
		const newUser = await this.repo.create(user);
		return newUser;
	}

	async getUserByEmail(email) {
		const user = await this.repo.get({ email });
		return user;
	}

	async getUserById(id) {
		const user = await this.repo.get({ _id: id });
		return user;
	}

	async getOrCreateUser(userData) {
		const user = await this.repo.get({ email: userData.email });
		if (user) {
			return user;
		}

		const newUser = await this.repo.create(userData);
		return newUser;
	}
}
