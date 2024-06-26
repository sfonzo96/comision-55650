async function postLogin(email, password) {
	const data = { email, password };

	try {
		const response = await fetch("/api/sessions/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		const result = await response.json();
		return result;
	} catch (error) {
		return { success: false, message: error.text };
	}
}

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	const response = await postLogin(email, password);

	if (response.success == true) {
		window.location.href = response.redirectUrl;
	} else {
		console.log(response);
		alert(response.message);
	}
});
