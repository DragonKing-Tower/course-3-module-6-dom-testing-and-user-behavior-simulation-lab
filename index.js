console.log("Loaded Index.js");

const display = document.querySelector("#dynamic-content");

const button = document.querySelector("#simulate-click");
button.addEventListener("click", () => {
	const input = document.querySelector("#user-input").value;
	addElementToDOM(display, input);
}); //adds functionality to button to submit and update the display

const form = document.querySelector("#user-form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const input = document.querySelector("#user-input").value;
	addElementToDOM(display, input);
}); //adds functionality to form to submit and update the display

function addElementToDOM(targetSelectedDOM, inputString) {
	if (inputChecker(inputString) === false) {
		return;
	}
	const newItem = document.createElement("p");
	newItem.textContent = inputString;
	targetSelectedDOM.append(newItem);
} //adds the string to any specifiied element

function removeElementsFromDOMParent(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
} //removes content, so far only used for removing the errors

function inputChecker(input) {
	const error = document.querySelector("#error-message");
	if (!input) {
		addElementToDOM(error, "Input cannot be empty");
		error.classList.remove("hidden");
		return false;
	} else {
		removeElementsFromDOMParent(error);
		error.classList.add("hidden");
		return true;
	}
} //checks to make sure text is defined, returns true if everything is good, false if not
