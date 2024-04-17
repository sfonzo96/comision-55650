import bcrypt from "bcrypt";
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
		console.log(user);
		delete user.password;
		return user;
	}

	async getUserById(id) {
		const user = await this.repo.getById(id);
		return user;
	}

	async getAllUsers() {
		const users = await this.repo.getAll();
		return users;
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

	async updateUserSocialId(id, socialId, platform) {
		const user = await this.repo.updateProfile(id, socialId, platform);
		return user;
	}

	async updatePassword(id, newPassword) {
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		const user = await this.repo.updatePassword(id, hashedPassword);
		console.log(user);
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
