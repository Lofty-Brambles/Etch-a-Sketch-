console.log( "Test" );

let currentGridSize = 25,
	currentPenColor = "#000000",
	currentMode = "normal"; // Default values

window.onload = () => {
	gridInit( currentGridSize );
	setMode( currentMode );
}; // Default modes on loading.

// The grid related functions.

// Sets up the active mode, if the function is called.

function setMode( mode ) {
	currentMode = mode;
	const butts = document.querySelectorAll(".mode");
	butts.forEach( butt => {

		butt.className = butt.className.replace( " active", "" );

		if ( butt.className.includes( mode ) ) {
			butt.className += " active";
		}

	})
}

// Matching up the slider and text inputs, allowing input from both.

const slider = document.querySelector("#slider");
slider.addEventListener("mouseup", e => {

	const a = e.target.value;
	currentGridSize = a;

	document.querySelector("#number").value = 
		isNaN( parseInt( a ) ) ? 0 : parseInt( a );
	document.querySelector(".display-input").textContent = 
		`Grid Size: ${a} x ${a}`;

});

const number = document.querySelector("#number");
number.addEventListener("keyup", e => {

	const a = e.target.value;
	currentGridSize = a;
	
	document.querySelector("#slider").value = 
		isNaN( parseInt( a ) ) ? 0 : parseInt( a );
	document.querySelector(".display-input").textContent =
		` Grid Size: ${a} x ${a}`;

});

// e