import CustomError from "../utils/CustomError.js";

const errorHandler = (error, req, res, next) => {
	if (error instanceof CustomError) {
		return res.status(error.status).json({ success: false, message: error.message, cause: error.cause });
	}
	return res.status(500).json({ success: false, message: "Something went wrong", cause: error.message });
};

export default errorHandler;
