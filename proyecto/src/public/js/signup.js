async function postSignup(firstName, lastName, email, password, age) {
	const data = { firstName, lastName, email, password, age };

	try {
		const response = await fetch("/api/auth/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		const result = await response.json();
		return result;
	} catch (error) {
		return { success: false, message: "Invalid credentials" };
	}
}

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const firstName = document.getElementById("name").value;
	const lastName = document.getElementById("lastName").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const age = document.getElementById("age").value;

	const response = await postSignup(firstName, lastName, email, password, age);

	if (response.success == true) {
		window.location.href = response.redirectUrl;
	} else {
		alert(response.message);
	}
});
