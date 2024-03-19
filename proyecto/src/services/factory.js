import serverConfig from "../config/env.config.js";
import repositories from "../dao/repositories/index.js";

const services = {};

switch (serverConfig.PERSISTENCE) {
	case "MONGO":
		const { default: ProductsServiceDb } = await import("../services/db/products.service.db.js");
		const { default: UsersServiceDb } = await import("../services/db/users.service.db.js");
		const { default: ChatServiceDb } = await import("../services/db/chat.service.db.js");
		const { default: CartsServiceDb } = await import("../services/db/carts.service.db.js");

		services.productsService = new ProductsServiceDb(repositories.products);
		services.usersService = new UsersServiceDb(repositories.users);
		services.chatService = new ChatServiceDb(repositories.chat);
		services.cartsService = new CartsServiceDb(repositories.carts);
		break;
	case "FILESYSTEM":
		// COMMENT: Hay que completar y modificar los módulos fs todavía!
		const { default: ProductsServiceFs } = await import("../services/db/products.service.fs.js");
		const { default: UsersServiceFs } = await import("../services/db/users.service.fs.js");
		const { default: ChatServiceFs } = await import("../services/db/chat.service.fs.js");
		const { default: CartsServiceFs } = await import("../services/db/carts.service.fs.js");

		services.productsService = new ProductsServiceFs("./fs/data/products.json");
		services.usersService = new UsersServiceFs("./fs/data/users.json");
		services.chatService = new ChatServiceFs("./fs/data/messages.json");
		services.cartsService = new CartsServiceFs("./fs/data/carts.json");
		break;
}

export default services;
