export default class UsersRepository {
	constructor(model) {
		this.userModel = model;
	}

	async createUser(user) {
		return await this.userModel.create(user);
	}

	async getAll() {
		return await this.userModel.find().lean();
	}

	async getById(id) {
		return await this.userModel.findOneById({ _id: id }).lean();
	}

	async getByEmail(email) {
		return await this.userModel.findOne({ email }).lean();
	}

	async userExistsById(id) {
		return await this.userModel.exists({ _id: id });
	}

	async updateUserSocialId(id, socialId, platform) {
		let user;
		if (platform === "google") {
			user = await this.userModel.findOneAndUpdate({ _id: id }, { $set: { googleId: socialId } });
		}

		if (platform === "github") {
			user = await this.userModel.findOneAndUpdate({ _id: id }, { $set: { githubId: socialId } });
		}

		delete user.password;
		return user;
	}

	async updatePassword(id, newPassword) {
		return await this.userModel
			.findOneAndUpdate({ _id: id }, { $set: { password: newPassword } }, { new: true })
			.lean();
	}
}
