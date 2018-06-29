
// Global Variables

var expanded = true;
const operationController = new OperationController;
const displayController = new DisplayController(operationController);

displayController.appendDisplay(9, "main", "0");
displayController.appendDisplay(4, "ans", "0");

// Event Listeners

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

body.onkeyup = function(event){

    var key = event.which || event.keyCode;

    if (key == 32){

        expand();

    }
}

// Detects rest of keyboard keys

body.onkeypress = function(event) {

    var key = event.which || event.keyCode;

    input(key);

}

// Functions

/*  Input receives a key as parameter, checks if the key 
    exists in keymap, and does the proper display and 
    control flow operation  */

function input(key){

    if (key in numbers){

        operation.current().text += numbers[key];

        main.update();

    } else if (key in actions){

        calculate();

    } else if (key == "clear"){

        allClear();

    } else if (key == "deleteLast"){

        operation.deleteLast();

    } else if (key == "pi"){

        operation.current().text += "π";

        main.print(operation.current(), "input");

    } else if (key == "sqrt"){

        operation.current().text += "√";

        main.print(operation.current(), "input");

    } else if (key == "ans"){

        getAns();

    } else {

        console.warn(`Key not recognized: ${key}`);

    }
}

// Add ANS to main screen

function getAns(){

    if (operation.focus != undefined) {

        let current = operation.current()

        current.text += operation.focus.text;
        main.print(current, "input");

    }
}

// Reset screen and all variables to default value

function allClear(){

    if (main.currentOnDisplay == "0"){

        operation.focus = undefined;
        operation.delete('all');
        ans.onDisplay = "0";
        main.onDisplay = "0";

    } else {

        operation.delete('current');
        main.onDisplay = "0";

    }

    main.positionIndicator();
    ans.positionIndicator();

}

// Makes possible to show text by moving 
// to the right or left on large operation

function move(direction, display){

    if ((operation.current().text.length > 9) & (display == "main")){

        let text;

        if ((direction == "right") & (operation.current.position > 0)){

            text = determinePosition(-1, "main");

            document.getElementById("input").innerHTML = text;

            positionIndicator();
    
        } else if ((direction == "left") & (operation.current.position < operation.current().text.length - 9)){
    
            text = determinePosition(1, "main");

            document.getElementById("input").innerHTML = text;

            positionIndicator();
    
        }
    } else if ((operation.focus.text.length > 4) & (display == "additional")){

        let text;

        if ((direction == "right") & (operation.focus.position > 0)){

            text = determinePosition(-1, "additional");

            document.getElementById("additional-input").innerHTML = text;

            positionIndicator();
    
        } else if ((direction == "left") & (operation.focus.position < operation.focus.text.length - 4)){
    
            text = determinePosition(1, "additional");

            document.getElementById("additional-input").innerHTML = text;

            positionIndicator();
    
        }
    }
}

// Determines the actual text to be displayed on screen

function determinePosition(number, display){

    if (display == "main"){

        operation.current.position += number;
        
        return operation.current().text.slice(((operation.current().text.length - 9) - operation.current.position), (operation.current().text.length - operation.current.position));

    } else if (display == "additional"){

        operation.focus.position += number;
        
        return operation.focus.text.slice(((operation.focus.text.length - 4) - operation.focus.position), (operation.focus.text.length - operation.focus.position));

    }

}

// When executed, does the proper operation

function calculate(){

    try {

        let operation = operation.current();

        let filteredOperation = operation.text.replace(/x/g,"*").replace(/−/g,"-").replace(/π/g,"Math.PI").replace(/√/g,"Math.sqrt").replace(/f/g, "").replace(/e/g, "Math.E");

        operation.result = eval(filteredOperation).toString();

        operation.mode = 'result';

        main.update();

        ans.object = operation;
        ans.update()
        
        operation.new();

    } catch(e) {

        // If user writes a mathematically 
        // incorrect operation, we throw an error

        main.onDisplay = "Error";
        operation.delete('current');

    }

    // positionIndicator();

}

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