/**
 * @jest-environment jsdom
 */
//instaed of importing functions, parse html file and initialize test environment in jsdom
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const fs = require("fs");
const path = require("path");
const { JSDOM, ResourceLoader } = require("jsdom");

// 1) Subclass ResourceLoader so that “http://localhost/whatever” → local files
class LocalLoader extends ResourceLoader {
	fetch(url) {
		// Convert the URL’s pathname into a local filesystem path
		const { pathname } = new URL(url);

		// Strip leading “/” and resolve relative to your project root
		const relPath = pathname.replace(/^\//, "");
		const absPath = path.resolve(__dirname, "../", relPath);

		console.log("JSDOM is requesting:", url);
		console.log("Mapped to local file:", absPath);

		// Read & return that file’s Buffer
		return fs.promises.readFile(absPath);
	}
}

describe("DOM Testing and User Behavior Simulationon HTML", () => {
	let window, document;

	beforeAll(async () => {
		const html = fs.readFileSync(
			path.resolve(__dirname, "../index.html"),
			"utf-8"
		);

		const dom = await new JSDOM(html, {
			runScripts: "dangerously",
			resources: new LocalLoader(),
			url: "http://localhost/",
		});

		// Wait for window to load all scripts
		await new Promise((resolve) => {
			dom.window.addEventListener("load", () => {
				window = dom.window;
				document = dom.window.document;

				// Expose to global scope so tests can access
				global.window = window;
				global.document = document;
				global.addElementToDOM = window.addElementToDOM;
				global.removeElementsFromDOMParent =
					window.removeElementsFromDOMParent;
				global.inputChecker = window.inputChecker;

				resolve();
			});
		});
	});

	beforeEach(() => {
		// clear DOM content so tests do not accumulate elements
		const display = document.getElementById("dynamic-content");
		const error = document.getElementById("error-message");

		if (display) {
			while (display.firstChild) display.removeChild(display.firstChild); //remove everything from displaybetween tests
		}

		if (error) {
			while (error.firstChild) error.removeChild(error.firstChild); //remove everything from error between test
			error.classList.add("hidden");
		}
	});

	afterAll(() => {
		delete global.addElementToDOM;
		delete global.removeElementsFromDOMParent; //remove them from easy access to clean up
	});

	it("Button should add an element to the DOM if it is valid without an error showing", async () => {
		const input = document.getElementById("user-input");
		const button = document.getElementById("simulate-click");
		const error = document.getElementById("error-message"); //collect the elements from the "DOM"

		input.value = "Successful Test"; //set the simulated input

		button.dispatchEvent(new window.Event("click")); //simulate a button click

		expect(
			document.getElementById("dynamic-content").textContent
		).toContain("Successful Test");
		//check the test returned the correct answer

		expect(error.textContent).toBe("");
		expect(error.classList.contains("hidden")).toBe(true); //check the errors are empty
	});

	it("Form should add an element to the DOM if it is valid without an error showing", () => {
		const input = document.getElementById("user-input");
		const form = document.getElementById("user-form");
		const error = document.getElementById("error-message"); //collect the elements from the "DOM"

		input.value = "Successful Test"; //set the simulated input

		form.dispatchEvent(new window.Event("submit", { bubbles: true })); //simulate a form submission

		expect(
			document.getElementById("dynamic-content").textContent
		).toContain("Successful Test");
		//check the test returned the correct answer

		expect(error.textContent).toBe("");
		expect(error.classList.contains("hidden")).toBe(true);
	});

	it("Error should show for incorrect submission on button", () => {
		const input = document.getElementById("user-input");
		const button = document.getElementById("simulate-click");
		const error = document.getElementById("error-message"); //collect the elements from the "DOM"

		input.value = ""; //simulate bad input

		button.dispatchEvent(new window.Event("click")); //simulate button being clicked

		expect(document.getElementById("dynamic-content").textContent).toBe("");

		expect(error.textContent).toBe("Input cannot be empty");
		expect(error.classList.contains("hidden")).toBe(false);
	});

	it("Error should show for incorrect submission on button", () => {
		const input = document.getElementById("user-input");
		const form = document.getElementById("user-form");
		const error = document.getElementById("error-message"); //collect the elements from the "DOM"

		input.value = ""; //simulate bad input

		form.dispatchEvent(new window.Event("submit", { bubbles: true })); //simulate form being submitted

		expect(document.getElementById("dynamic-content").textContent).toBe("");

		expect(error.textContent).toBe("Input cannot be empty");
		expect(error.classList.contains("hidden")).toBe(false);
	});
});
