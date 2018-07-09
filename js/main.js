
// Global Variables

var expanded = true;
const operationController = new OperationController;
const displayController = new DisplayController(operationController);

displayController.appendDisplay(9, "main", "0");
displayController.appendDisplay(4, "ans", "0");

// Event Listeners

var buttons = document.querySelectorAll(".button");

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => input(e));
}

// Functions

/*  Input receives a key as parameter, checks if the key 
    exists in keymap, and does the proper display and 
    control flow operation  */

function input(e){

    let key = e.currentTarget.getAttribute('data');

    if (key in numbers){

        operationController.current().text += numbers[key];

    } else if (key == "calculate"){

        operationController.calculate();

    } else if (key == "clear"){

        displayController.clear();

    } else if (key == "deleteLast"){

        operationController.delete('last');

    } else if (key == "pi"){

        operationController.current().text += "π";

    } else if (key == "sqrt"){

        operationController.current().text += "√";

    } else if (key == "getAns"){

        operationController.getAns();

    } else {

        console.warn(`Key not recognized: ${key}`);

    }
}

// Keyboard keyPress or keyDown event listeners

var body = document.querySelector('body');

// Detects special non-character keyboard keys

body.onkeydown = function(event){

    var key = event.which || event.keyCode;

    if (key == 8 || key == 27){

        // ESC and Delete Keys

        operationController.delete('last');

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

    var key = event.keyCode;

    if (key in numbers){
        operationController.current().text += numbers[key];
    } else if (key == 13) {
        operationController.calculate();
    }

}

// Functions

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