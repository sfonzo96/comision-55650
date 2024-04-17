export default class CartsController {
	constructor(cartsService, productsService) {
		this.cartsService = cartsService;
		this.productsService = productsService;
	}

	createCart = async (req, res) => {
		try {
			await this.cartsService.createCart({});

			res.status(200).json({
				success: true,
				message: "New empty cart successfully created",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	};

	getCarts = async (req, res) => {
		try {
			const carts = await this.cartsService.getCarts();

			res.status(200).json({
				success: true,
				data: carts,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	};

	getCart = async (req, res) => {
		try {
			const { cid } = req.params;
			const cart = await this.cartsService.getCartById(cid);

			if (!cart) {
				res.status(404).json({
					success: false,
					message: "Cart not found",
				});
				return;
			}

			res.status(200).json({
				success: true,
				message: "Cart sent",
				cart,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	};

	addProductToCart = async (req, res) => {
		// Comment: validar que el usuario premium no pueda agregar sus productos
		try {
			const { cid, pid } = req.params;

			if (req.user.role == "premium") {
				const product = await this.productsService.getProductById(pid);

				if (product.owner == req.user._id) {
					return res.status(403).json({
						success: false,
						message: "Forbidden",
					});
				}
			}

			const cart = await this.cartsService.addProductToCart(cid, pid);
			if (!cart) {
				res.status(404).json({
					success: false,
					message: "Cart not found",
				});
				return;
			}
			res.status(200).json({
				success: true,
				message: `Product ${pid} added to cart ${cid}`,
				cart,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	};

	updateProductQuantity = async (req, res) => {
		try {
			const { quantity } = req.body;
			const { cid, pid } = req.params;

			const cart = await this.cartsService.updateProductQuantity(pid, cid, quantity);
			if (!cart) {
				return res.status(404).json({
					success: false,
					message: "Cart not found",
				});
			}
			res.status(200).json({
				success: true,
				message: `Product ${pid}'s quantity was modified ${cid}`,
				cart,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	};

	removeProductFromCart = async (req, res) => {
		try {
			const { cid, pid } = req.params;

			const cart = await this.cartsService.removeProductFromCart(cid, pid);

			if (!cart) {
				return res.status(404).json({
					success: false,
					message: "Cart not found",
				});
			}

			return res.status(200).json({
				success: true,
				message: `Product ${pid} deleted from cart ${cid}`,
				cart,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	};

	deleteCart = async (req, res) => {
		const { cid } = req.params;

		try {
			await cartsService.emptyCart(cid);

			res.status(200).json({
				success: true,
				message: `Cart ${cid} was emptied`,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	};
}
