export default class UsersRepository {
	constructor(model) {
		this.userModel = model;
	}

	async createUser(user) {
		return await this.userModel.create(user);
	}

	async getById(id) {
		return await this.userModel.findOneById({ _id: id }).lean();
	}

	async getByEmail(email) {
		return await this.userModel.findOne({ email }).lean();
	}

	async userExistsBy(id) {
		return await this.userModel.exists({ _id: id });
	}

	async updatePassword(id, newPassword) {
		return await this.userModel
			.findOneAndUpdate({ _id: id }, { $set: { password: newPassword } }, { new: true })
			.lean();
	}
}
