import serverConfig from "../../config/env.config.js";
import models from "../models/index.js";

let productsRepository, usersRepository, chatRepository, cartsRepository, ticketsRepository;

switch (serverConfig.PERSISTENCE) {
	case "MONGO":
		const { default: ProductsRepositoryDB } = await import("../repositories/db/products.repository.js");
		const { default: UsersRepositoryDB } = await import("../repositories/db/users.repository.js");
		const { default: ChatRepositoryDB } = await import("../repositories/db/messages.repository.js");
		const { default: CartsRepositoryDB } = await import("../repositories/db/carts.repository.js");
		const { default: TicketsRepositoryDB } = await import("./db/tickets.repository.js");

		productsRepository = new ProductsRepositoryDB(models.product);
		usersRepository = new UsersRepositoryDB(models.user);
		chatRepository = new ChatRepositoryDB(models.message);
		cartsRepository = new CartsRepositoryDB(models.cart);
		ticketsRepository = new TicketsRepositoryDB(models.ticket);
		break;
	case "FILESYSTEM":
		// COMMENT: Hay que completar y modificar los módulos fs todavía!
		const { default: ProductsRepositoryFS } = await import("../repositories/fs/products.repository.js");
		const { default: UsersRepositoryFS } = await import("../repositories/fs/users.repository.js");
		const { default: ChatRepositoryFS } = await import("../repositories/fs/messages.repository.js");
		const { default: CartsRepositoryFS } = await import("../repositories/fs/carts.repository.js");
		const { default: TicketsRepositoryFS } = await import("./fs/tickets.repository.js");

		productsRepository = new ProductsRepositoryFS("./data/products.json");
		usersRepository = new UsersRepositoryFS("./data/users.json");
		chatRepository = new ChatRepositoryFS("./data/messages.json");
		cartsRepository = new CartsRepositoryFS("./data/carts.json");
		ticketsRepository = new TicketsRepositoryFS("./data/tickets.json");
		break;
}

export { productsRepository, usersRepository, chatRepository, cartsRepository, ticketsRepository };
