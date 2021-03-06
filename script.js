console.log( "Test" );

let currentGridSize = 25,
	currentPenColor = "#000000",
	currentMode = "normal"; // Default values

window.onload = () => {
	changeGridSize( currentGridSize );
	document.querySelector("#slider").value = currentGridSize;
	document.querySelector("#number").value = currentGridSize;
	setMode( currentMode );

}; // Default modes on loading.


// The grid related functions.

function gridInit( size ) {

	const grid = document.querySelector(".container");
	grid.style.gridTemplateColumns = `repeat( ${ size }, 1fr )`;
	grid.style.gridTemplateRows = `repeat( ${ size }, 1fr )`;

	for ( let i = 0; i < size * size; i++ ) {
		const element = document.createElement("div");
		element.classList.add("grid-element");
		element.style.opacity = 1.0;
		element.addEventListener( "mouseover", paint );
		element.addEventListener( "mousedown", paint );
		grid.appendChild( element );
	}

}

function changeGridSize( size ) {
	const grid = document.querySelector(".container");
	grid.innerHTML = "";
	gridInit( size );
}

let clicked = false;
document.addEventListener( "mousedown", () => { clicked = true;} );
document.addEventListener( "mouseup", () => { clicked = false;} );

function paint( e ) {

	if ( ( e.type === "mouseover" ) && !clicked ) return;

	if ( currentMode === "rainbow" ) {

		e.target.style.backgroundColor = genColor();
		e.target.style.opacity = 1.0;
		delete e.target.dataset["inked"];

	} else if ( currentMode === "eraser" ) {

		e.target.style.backgroundColor = "#ffffff";
		e.target.style.opacity = 1.0;
		delete e.target.dataset["inked"];

	} else if ( currentMode === "shader" ) {

		if ( !e.target.dataset.inked ) {
			e.target.style.backgroundColor = currentPenColor;
			e.target.style.opacity = 0.1;
			e.target.dataset.inked = "yes";
		} else {
			e.target.style.opacity = 
				Math.min( 
					parseFloat( e.target.style.opacity ) + 0.1,
					1.0 
				);
		}

	} else if ( currentMode === "lightener" ) {

		if ( !e.target.dataset.inked ) {
			e.target.style.backgroundColor = currentPenColor;
			e.target.style.opacity = 1.0;
			e.target.dataset.inked = "yes";
		} else {
			e.target.style.opacity = 
				Math.max( 
					parseFloat( e.target.style.opacity ) - 0.1,
					0.0
				);
		}

	} else {

		e.target.style.backgroundColor = currentPenColor;
		e.target.style.opacity = 1.0;
		delete e.target.dataset["inked"];

	}

}

function genColor() {
	const letters = "0123456789abcdef";
	let code = "#";
	for ( let i = 0; i < 6; i++ ) {
		code += letters[ Math.floor( Math.random() * letters.length ) ];
	}
	return code;
}

// Sets up the active mode, if the function is called.

function setMode( mode ) {
	currentMode = mode;
	const butts = document.querySelectorAll(".mode");
	butts.forEach( butt => {

		butt.className = butt.className.replace( " active", "" );

		if ( butt.id === mode ) {
			butt.className += " active";
		}

	})
}

// Adds button listeners to the modes.

const butts = document.querySelectorAll(".mode");
butts.forEach( butt => {
	butt.addEventListener( "click", e => {
		setMode( e.target.id );
	} )
} );

// Adds the "clear board" functionality.

const clearButton = document.querySelector("#clear");
clearButton.addEventListener( "click", e => {
	changeGridSize( currentGridSize );
} );

// Matching up the slider and text inputs, allowing input from both.

const slider = document.querySelector("#slider");
slider.addEventListener("mouseup", e => {

	const a = e.target.value;
	currentGridSize = a;
	changeGridSize( currentGridSize );

	document.querySelector("#number").value = 
		isNaN( parseInt( a ) ) ? 0 : parseInt( a );
	document.querySelector(".display-input").textContent = 
		`Grid Size: ${a} x ${a}`;

});

const number = document.querySelector("#number");
number.addEventListener("keyup", e => {

	const a = e.target.value;
	currentGridSize = a;
	changeGridSize( currentGridSize );
	
	document.querySelector("#slider").value = 
		isNaN( parseInt( a ) ) ? 0 : parseInt( a );
	document.querySelector(".display-input").textContent =
		` Grid Size: ${a} x ${a}`;

});

// Adds a handler to the colour picker.

const colorPicker = document.querySelector("#color");
colorPicker.addEventListener( "change", e => {
	currentPenColor = e.target.value;
} )