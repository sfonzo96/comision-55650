export default {
	PORT: process.env.PORT || 3000,
	DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost:27017/",
	COOKIE_SECRET: process.env.COOKIE_SECRET || "ASDFASD!@#$",
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	SENDER_EMAIL: process.env.SENDER_EMAIL,
	EMAIL_AUTH: process.env.EMAIL_AUTH,
	PERSISTENCE: process.env.PERSISTENCE || "MONGO",
};
