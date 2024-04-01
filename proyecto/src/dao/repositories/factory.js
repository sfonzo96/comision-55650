import serverConfig from "../../config/env.config.js";
import models from "../models/index.js";

let productsRepository, usersRepository, chatRepository, cartsRepository;

switch (serverConfig.PERSISTENCE) {
	case "MONGO":
		const { default: ProductsRepositoryDB } = await import("../repositories/db/products.repository.js");
		const { default: UsersRepositoryDB } = await import("../repositories/db/products.repository.js");
		const { default: ChatRepositoryDB } = await import("../repositories/db/products.repository.js");
		const { default: CartsRepositoryDB } = await import("../repositories/db/products.repository.js");

		productsRepository = new ProductsRepositoryDB(models.product);
		usersRepository = new UsersRepositoryDB(models.user);
		chatRepository = new ChatRepositoryDB(models.message);
		cartsRepository = new CartsRepositoryDB(models.cart);
		break;
	case "FILESYSTEM":
		// COMMENT: Hay que completar y modificar los módulos fs todavía!
		const { default: ProductsRepositoryFS } = await import("../repositories/fs/products.repository.js");
		const { default: UsersRepositoryFS } = await import("../repositories/fs/products.repository.js");
		const { default: ChatRepositoryFS } = await import("../repositories/fs/products.repository.js");
		const { default: CartsRepositoryFS } = await import("../repositories/fs/products.repository.js");

		productsRepository = new ProductsRepositoryFS("./data/products.json");
		usersRepository = new UsersRepositoryFS("./data/users.json");
		chatRepository = new ChatRepositoryFS("./data/messages.json");
		cartsRepository = new CartsRepositoryFS("./data/carts.json");
		break;
}

export { productsRepository, usersRepository, chatRepository, cartsRepository };
