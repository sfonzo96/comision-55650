export default isAllowed = (permissions) => (req, res, next) => {
	// No debe estar logeado
	if (permissions.inclues("guest") && req.isAuthenticated()) {
		return res.status(401).json({ success: false, message: "Unauthorized", redirectUrl: "/home" });
	}

	// Debe estar logeado (incluye user, premium y admin)
	if (permissions.inclues("user") && !req.isAuthenticated()) {
		return res.status(401).json({ success: false, message: "Unauthorized", redirectUrl: "/error" });
	}

	// Solo roles especificos
	if ((permissions.includes("premium") || permissions.includes("admin")) && !permissions.includes(req.user.role)) {
		return res.status(403).json({ success: false, message: "Forbidden", redirectUrl: "/error" });
	}

	next();
	// Comment: verify if it works
};
