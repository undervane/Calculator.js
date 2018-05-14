'use strict';

// KEY-MAPS

var numbers = {

    42: "x",
    43: "+",
    45: "−",
    47: "/",

    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9"

};

var actions = {

    61: "calculate",
    13: "calculate"

};

// OPERATORS

var operation = "";
var textOnDisplay = "";
var position = 0;

// Functions

/*  Input receives a key as parameter, checks if the key 
    exists in keymap, and does the proper display and 
    control flow operations  */

function input(key){

    if (key in numbers){

        operation += numbers[key];

        display(operation, "input");

    } else if (key in actions){

        calculate();

    } else if (key == "clear"){

        clear();

    } else {

        console.warn("Key not recognized");

    }
}

// Reset screen and all variables to default value

function clear(){

    display("0", "input");
    operation = "";

}

// Displays the text parameter on screen

function display(text, mode){

    if (mode == "input"){

        // On user input, when text is bigger than screen

        if (text.length > 9){

            position = 0;
            textOnDisplay = determinePosition(0);
            console.log(textOnDisplay);

        // On user input, when text is smaller than screen

        } else {

            textOnDisplay = text;

        } 

    } else if (mode == "result"){

        // On calculation result, when text is bigger than screen

        if (text.length > 9){

            position = text.length - 9;
            textOnDisplay = determinePosition(0);
            console.log(textOnDisplay);
    
        // On calculation result, when text is smaller than screen

        } else {
    
            textOnDisplay = text;

        }
    }

    document.getElementById("input").innerHTML = textOnDisplay;

}

// Makes possible to show text by moving 
// to the right or left on large operations

function move(direction){

    if ((operation.length > 9)){

        let text;

        if ((direction == "right") & (position > 0)){

            text = determinePosition(-1);

            document.getElementById("input").innerHTML = text;
    
        } else if ((direction == "left") & (position < operation.length - 9)){
    
            text = determinePosition(1);

            document.getElementById("input").innerHTML = text;
    
        }
    }
}

// Determines the actual text to be displayed on screenS

function determinePosition(number){

    position += number;
    
    return operation.slice(((operation.length - 9) - position), (operation.length - position));

}

// When executed, does the proper operation

function calculate(){

    try {

    let filteredOperation = operation.replace(/x/g,"*").replace(/−/g,"-");

    let operationInt = eval(filteredOperation);

    operation = operationInt.toString();

    display(operation, "result");

    } catch {

        // If user writes a mathematically 
        // incorrect operation, we throw an error

        display("Error", "result");
        operation = "";

    }

}

/* ------- CODE EXECUTION STARTS HERE ------- */

// Keyboard keyPress or keyDown event listeners

var body = document.querySelector('body');

// Detects special non-character keyboard keys

body.onkeydown = function(event){

    var key = event.which || event.keyCode;

    if (key == 8 || key == 27){

        // ESC and Delete Keys

        clear();

    } else if (key == 37){

        // Left Arrow Key

        move("left");

    } else if (key == 39){

        // Right Arrow Key

        move("right");

    }
}

// Detects rest of keyboard keys

body.onkeypress = function(event) {

    var key = event.which || event.keyCode;

    input(key);

}