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
