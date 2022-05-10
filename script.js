console.log( "Test" );

let currentGridSize = 0;

// Matching up the slider and text inputs, allowing input from both.

const slider = document.querySelector("#slider");
slider.oninput = changeInputValue( slider.value );
const number = document.querySelector("#number");
number.onkeyup = changeRangeValue( number.value );

function changeInputValue( a ) {
	document.querySelector("#number").value = 
		isNaN( parseInt( a ) ) ? 0 : parseInt( a );
	document.querySelector(".display-input").textContent = a;
}

function changeRangeValue( a ) {
	document.querySelector("#slider").value = 
		isNaN( parseInt( a ) ) ? 0 : parseInt( a );
	document.querySelector(".display-input").textContent = a;
}

// e