import CartsService from "./carts.service.js";
import ChatService from "./chat.service.js";
import ProductsService from "./products.service.js";
import UsersService from "./users.service.js";
import TicketsService from "./tickets.service.js";

import {
	productsRepository,
	usersRepository,
	chatRepository,
	cartsRepository,
	ticketsRepository,
} from "../dao/repositories/factory.js";

const cartsService = CartsService.getInstance(cartsRepository);
const chatService = ChatService.getInstance(chatRepository);
const productsService = ProductsService.getInstance(productsRepository);
const usersService = UsersService.getInstance(usersRepository);
const ticketsService = TicketsService.getInstance(ticketsRepository, productsRepository, cartsRepository);

export { cartsService, chatService, productsService, usersService, ticketsService };
