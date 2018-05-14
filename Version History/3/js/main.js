'use strict';

// KEY-MAPS

var numbers = {

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

var operators = {

    42: "x",
    43: "+",
    45: "−",
    47: "/",
    46: ".",
    40: "(",
    41: ")",
    101: "e",

}

var actions = {

    61: "calculate",
    13: "calculate"

};

// Global Variables

var operation = "";
var textOnDisplay = "";
var position = 0;
var position2 = 0;
var expanded = true;
var savedAns = "";
var ansOnDisplay = "";
var focus = "main";

var number = false;
var operator = false;
var dot = false;

var hideErrors = true;

// Functions

/*  Input receives a key as parameter, checks if the key 
    exists in keymap, and does the proper display and 
    control flow operations  */

function input(key){

    if (key in numbers){

        if (numbers[key] == 0){

            if (error("0") == false || hideErrors) {

                operation += "0";

                display(operation, "input", "main");

            }

        } else {

            operation += numbers[key];

            display(operation, "input", "main");

            number = true;
            operator = false;      

        }

    } else if (key in operators){

        if (error(key) == false || hideErrors) {

            operation += operators[key];

            display(operation, "input", "main");

            number = false;
            operator = true;

            if (key == 46){

                dot = true;
                operator = false;

            } else { dot = false; }

        }

    } else if (key in actions){

        calculate();

    } else if (key == "clear"){

        allClear();

    } else if (key == "deleteLast"){

        deleteLast();

    } else if (key == "pi"){

        if (error(key) == false || hideErrors){

            operation += "π";

            display(operation, "input", "main");

        }

    } else if (key == "sqrt"){

        if (error(key) == false || hideErrors){

            operation += "√";

            display(operation, "input", "main");

        }

    } else if (key == "ans"){

        ans();

    } else {

        console.warn(`Key not recognized: ${key}`);

    }
}

// Reset screen and all variables to default value

function allClear(){

    if(operation == ""){

        save("0");

    }

    display("0", "input", "main");
    operation = "";

    number = false;
    operator = false;
    dot = false;

    positionIndicator();

}

// Deletes last character

function deleteLast(input){

    let lastDeleted = operation.slice(0, -1);
    operation = lastDeleted;

    if (operation == ""){

        display("0", "input", "main");

    } else {

    display(operation, 'input', "main");

    }

    positionIndicator();

}

// Displays the text entered as argument on screen

function display(text, mode, display){

    if (display == "main"){

        if (mode == "input"){

            // On user input, when text is bigger than screen

            if (text.length > 9){

                position = 0;
                textOnDisplay = determinePosition(0, "main");
                console.log(textOnDisplay);

            // On user input, when text is smaller than screen

            } else {

                textOnDisplay = text;

            } 

        } else if (mode == "result"){

            // On calculation result, when text is bigger than screen

            if (text.length > 9){

                position = text.length - 9;
                textOnDisplay = determinePosition(0, "main");
                console.log(textOnDisplay);
        
            // On calculation result, when text is smaller than screen

            } else {
        
                textOnDisplay = text;

            }
            
        }

        document.getElementById("input").innerHTML = textOnDisplay;
        positionIndicator();

    } else if (display == "additional") {

        // Displays text on Additional Screen

        if (text.length > 4){

            // On user input, when text is bigger than screen

            position2 = text.length - 4;
            ansOnDisplay = determinePosition(0, "additional");
            console.log(ansOnDisplay);

        } else {

            // On user input, when text is smaller than screen

            ansOnDisplay = text;

        } 

        document.getElementById("additional-input").innerHTML = ansOnDisplay;

    } else {

        console.warn("Wrong display");

    }

}

// Makes possible to show text by moving 
// to the right or left on large operations

function move(direction, display){

    // IN MAIN SCREEN

    if ((operation.length > 9) & (display == "main")){

        let text;

        if ((direction == "right") & (position > 0)){

            text = determinePosition(-1, "main");

            document.getElementById("input").innerHTML = text;

            positionIndicator();
    
        } else if ((direction == "left") & (position < operation.length - 9)){
    
            text = determinePosition(1, "main");

            document.getElementById("input").innerHTML = text;

            positionIndicator();
    
        }

    } else if ((savedAns.length > 4) & (display == "additional")){

        // IN ADDITIONAL SCREEN

        let text;

        if ((direction == "right") & (position2 > 0)){

            text = determinePosition(-1, "additional");

            document.getElementById("additional-input").innerHTML = text;

            positionIndicator();
    
        } else if ((direction == "left") & (position2 < savedAns.length - 4)){
    
            text = determinePosition(1, "additional");

            document.getElementById("additional-input").innerHTML = text;

            positionIndicator();
    
        }

    }
}

// Allows arrows to indicate whether 
// there's numbers overflowing the screen

function positionIndicator(){

    if (operation.length > 9){

        if (position != 0){

            if (position == operation.length - 9){

                document.getElementById("leftArrow").classList.add('arrow-hidden');
                document.getElementById("rightArrow").classList.remove('arrow-hidden');
        
            } else {

            document.getElementById("rightArrow").classList.remove('arrow-hidden');
            document.getElementById("leftArrow").classList.remove('arrow-hidden');

            }

        } else if (position == 0){

            document.getElementById("rightArrow").classList.add('arrow-hidden');
            document.getElementById("leftArrow").classList.remove('arrow-hidden');

        }

    } else {

        document.getElementById("leftArrow").classList.add('arrow-hidden');
        document.getElementById("rightArrow").classList.add('arrow-hidden');

    }

    if (savedAns.length > 4){

        if (position2 != 0){

            if (position2 == savedAns.length - 4){

                document.getElementById("ad-leftArrow").classList.add('arrow-hidden');
                document.getElementById("ad-rightArrow").classList.remove('arrow-hidden');
        
            } else {

            document.getElementById("ad-rightArrow").classList.remove('arrow-hidden');
            document.getElementById("ad-leftArrow").classList.remove('arrow-hidden');

            }

        } else if (position2 == 0){

            document.getElementById("ad-rightArrow").classList.add('arrow-hidden');
            document.getElementById("ad-leftArrow").classList.remove('arrow-hidden');

        }

    } else {

        document.getElementById("ad-leftArrow").classList.add('arrow-hidden');
        document.getElementById("ad-rightArrow").classList.add('arrow-hidden');

    }

}

// Determines the text to be displayed
// on display so it doesn't overflows it

function determinePosition(number, display){

    if (display == "main"){

        position += number;
        
        return operation.slice(((operation.length - 9) - position), (operation.length - position));

    } else if (display == "additional"){

        position2 += number;
        
        return savedAns.slice(((savedAns.length - 4) - position2), (savedAns.length - position2));

    }

}

// The display on focus 

function focusDisplay(display){

    if (focus != display){
    
    document.getElementById(`${display}-screen`).classList.toggle('focus');
    document.getElementById(`${focus}-screen`).classList.toggle('focus');

    focus = display;

    }
}

// Saves operation on Additional Display

function save(input){

    savedAns = input;

    display(savedAns, "save", "additional");

}

// Restores value from ANS to main screen

function ans(){

    operation += savedAns;

    display(operation, "input", "main");

}

// Error Handling (Not yet completly functional)

function error(input){

    let lastChar = operation.charAt(operation.length - 1);

    if (lastChar == operators[input] || lastChar == "pi" || lastChar == "sqrt" || lastChar == "0"){

        if (lastChar == "0" && input == "0"){

            if (dot || number) {return false;}
            else {return true;}

        } else {return true;}

    } else {

        if (input in operators && number == false){

            return true;

        }

        return false;

    }

}


// When executed, does the proper operation

function calculate(){

    try {

    let filteredOperation = operation.replace(/x/g,"*").replace(/−/g,"-").replace(/π/g,"Math.PI").replace(/√/g,"Math.sqrt").replace(/f/g, "").replace(/e/g, "Math.E");

    let operationInt = eval(filteredOperation);

    operation = operationInt.toString();

    display(operation, "result", "main");

    } catch (e) {

        // If user writes a mathematically 
        // incorrect operation, we throw an error

        display("Error", "result", "main");
        operation = "";

    }

    save(operation);
    positionIndicator();

}

// Expands-Collapse the advanced module

function expand(){

    if (expanded){

        expanded = false;
        document.getElementById('Calculator-SVG').classList.add('expandView');
        document.getElementById('Additional').classList.add('open');
        document.getElementById('advanced-text').innerHTML = "Close Advanced"

    } else {

        expanded = true;
        document.getElementById('Calculator-SVG').classList.remove('expandView');
        document.getElementById('Additional').classList.remove('open');
        document.getElementById('advanced-text').innerHTML = "Open Advanced"

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

        allClear();

    } else if (key == 37){

        // Left Arrow Key

        if (focus == "main"){

            move("left", "main");

        } else if (focus == "additional"){

            move("left", "additional");

        }

    } else if (key == 39){

        // Right Arrow Key

        if (focus == "main"){

            move("right", "main");
    
        } else if (focus == "additional"){

            move("right", "additional");

        }

    }
}

// Detects rest of keyboard keys

body.onkeypress = function(event) {

    var key = event.which || event.keyCode;

    input(key);

}