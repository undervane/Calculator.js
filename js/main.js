'use strict';

// Global Variables

var expanded = true;

// Functions

/*  Input receives a key as parameter, checks if the key 
    exists in keymap, and does the proper display and 
    control flow operations  */

function input(key){

    if (key in numbers){

        if (manageExceptions(numbers[key])){

            operations.current().text += numbers[key];

            main.update();

        }

    } else if (key in actions){

        calculate();

    } else if (key == "clear"){

        allClear();

    } else if (key == "deleteLast"){

        operations.deleteLast();

    } else if (key == "pi"){

        operations.current().text += "π";

        main.print(operations.current(), "input");

    } else if (key == "sqrt"){

        operations.current().text += "√";

        main.print(operations.current(), "input");

    } else if (key == "ans"){

        getAns();

    } else {

        console.warn(`Key not recognized: ${key}`);

    }
}

// Exception Handling

function getAns(){

    if (operations.focus != undefined) {

        let current = operations.current()

        current.text += operations.focus.text;
        main.print(current, "input");

    }
}

// Reset screen and all variables to default value

function allClear(){

    if (main.currentOnDisplay == "0"){

        operations.focus = undefined;
        operations.delete('all');
        ans.onDisplay = "0";
        main.onDisplay = "0";

    } else {

        operations.delete('current');
        main.onDisplay = "0";

    }

    main.positionIndicator();
    ans.positionIndicator();

}

// Makes possible to show text by moving 
// to the right or left on large operations

function move(direction, display){

    if ((operations.current().text.length > 9) & (display == "main")){

        let text;

        if ((direction == "right") & (operations.current.position > 0)){

            text = determinePosition(-1, "main");

            document.getElementById("input").innerHTML = text;

            positionIndicator();
    
        } else if ((direction == "left") & (operations.current.position < operations.current().text.length - 9)){
    
            text = determinePosition(1, "main");

            document.getElementById("input").innerHTML = text;

            positionIndicator();
    
        }
    } else if ((operations.focus.text.length > 4) & (display == "additional")){

        let text;

        if ((direction == "right") & (operations.focus.position > 0)){

            text = determinePosition(-1, "additional");

            document.getElementById("additional-input").innerHTML = text;

            positionIndicator();
    
        } else if ((direction == "left") & (operations.focus.position < operations.focus.text.length - 4)){
    
            text = determinePosition(1, "additional");

            document.getElementById("additional-input").innerHTML = text;

            positionIndicator();
    
        }

    }
}

// Determines the actual text to be displayed on screen

function determinePosition(number, display){

    if (display == "main"){

        operations.current.position += number;
        
        return operations.current().text.slice(((operations.current().text.length - 9) - operations.current.position), (operations.current().text.length - operations.current.position));

    } else if (display == "additional"){

        operations.focus.position += number;
        
        return operations.focus.text.slice(((operations.focus.text.length - 4) - operations.focus.position), (operations.focus.text.length - operations.focus.position));

    }

}

// When executed, does the proper operation

function calculate(){

    try {

        let operation = operations.current();

        let filteredOperation = operation.text.replace(/x/g,"*").replace(/−/g,"-").replace(/π/g,"Math.PI").replace(/√/g,"Math.sqrt").replace(/f/g, "").replace(/e/g, "Math.E");

        operation.result = eval(filteredOperation).toString();

        operation.mode = 'result';

        main.update();

        ans.object = operation;
        ans.update()
        
        operations.new();

    } catch(e) {

        // If user writes a mathematically 
        // incorrect operation, we throw an error

        main.onDisplay = "Error";
        operations.delete('current');

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

/* ------- CODE EXECUTION STARTS HERE ------- */

var main = new Display(9, "main");
var ans = new Display(4, "additional");

main.object = operations.new();

main.onDisplay = "0";
ans.onDisplay = "0";

var displays = {

    currentFocus: this.main

}

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