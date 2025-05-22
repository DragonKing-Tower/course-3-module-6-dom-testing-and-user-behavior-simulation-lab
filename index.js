document.addEventListener("DOMContentLoaded", () => {
	// Step 1: Simulate User Behavior
	// - Add event listeners for button clicks and form submissions.
	// - Use JavaScript to dynamically update the DOM based on user actions.
	const button = document.querySelector("#simulate-click");
	const form = document.querySelector("#user-form");

	button.addEventListener("click", () => {
		const userInput = document.querySelector("#user-input").value;
		addElementToDOM("dynamic-content", userInput);
	});

	form.addEventListener("submit", (event) => {
		event.preventDefault;
	});

	// Step 2: DOM Manipulation Functions
	// - Implement functions to add, update, and remove DOM elements.
	// - Ensure all elements are dynamically created with appropriate attributes and content.

	// Step 3: Error Handling
	// - Display error messages in the DOM for invalid inputs or missing elements.
	// - Create reusable functions to handle common error cases.

	// Step 4: Reusable Utilities
	// - Create modular utility functions, such as createElement(tag, attributes).
	// - Ensure all functions follow DRY principles for maintainability.
});

function addElementToDOM(targetDOM, inputString) {
	const container = document.querySelector(`#${targetDOM}`);
	const newItem = document.createElement("p");
	newItem.textContent = inputString;
	container.append(newItem);
}

function removeElementFromDOM(targetDOM) {
	const target = document.querySelector(`#${targetDOM}`);
	target.remove();
}

function simulateClick(targetDOM, action) {
	addElementToDOM(targetDOM, action);
}

function handleFormSubmit(targetInputDOM, targetDOM) {
	const form = document.querySelector(`#${targetInputDOM}`);
	const input = form.querySelector(
		`input[type="text"], input#user-input`
	).value;
	if (input === "") {
		addElementToDOM("error-message", "Input cannot be empty");
		document.querySelector("#error-message").classList.remove("hidden");
	}
	addElementToDOM(targetDOM, input);
}

module.exports = {
	addElementToDOM,
	removeElementFromDOM,
	simulateClick,
	handleFormSubmit,
};
