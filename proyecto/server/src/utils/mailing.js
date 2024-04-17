import nodemailer from "nodemailer";
import envConfig from "../config/env.config.js";

const transporter = nodemailer.createTransport({
	service: "gmail",
	port: 587,
	auth: {
		user: envConfig.SENDER_EMAIL,
		pass: envConfig.EMAIL_AUTH,
	},
});

const sendPasswordChangeMail = async (email, token) => {
	const mailOptions = {
		from: envConfig.SENDER_EMAIL,
		to: email,
		subject: "Cambio de contraseña",
		text: `Tu enlace para cambiar la contraseña es localhost:8080/api/users/password-change/${token} . Tiene una validez de 1 hora y un único uso.`,
	};
	// Comment: en el front se renderiza un formulario SOLO si el token es valido, caso contrario se muestra vista de error. Para verificar se usa endpoint del servidor
	// Luego se envia la nueva contraseña al back
	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error(error);
	}
};

export default { sendPasswordChangeMail };
