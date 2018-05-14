'use strict';

// KEY-MAPS

var numbers = {

    48: 0,
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9

};

var actions = {

    61: "calculate",
    13: "calculate"

};

var operations = {

    42: "x",
    43: "+",
    45: "-",
    47: "/"

};

// OPERATORS

var first_operator = undefined;
var second_operator = undefined;
var operation = undefined;

// Functions

/*  Input receives a key as parameter, checks if the key 
    exists in keymap, and does the proper display and 
    control flow operations  */

function input(key){

    let text;

    if (key in numbers){

        // Triggers if it's the first digit

        if (first_operator == undefined && operation == undefined){

            text = numbers[key];
            first_operator = numbers[key];

            display(text);

        } else if (first_operator != undefined && operation == undefined && length(first_operator) < 3) {

            // Triggers if it's the second or third digit, 
            // operation is still not defined, and operator 
            // length is less than three digits.

            text = first_operator + '' + numbers[key];
            first_operator = parseInt(text);

            display(text);

        } else if (operation != undefined && second_operator == undefined) {

            // Triggers if the operation has been defined
            // when first digit is entered

            text = first_operator + ' ' + operation + ' ' + numbers[key];
            second_operator = numbers[key];

            display(text);

        } else if (first_operator != undefined && second_operator != undefined && length(second_operator) < 3){

             // Triggers if it's the second or third digit, 
            // operation has been defined, and operator 
            // length is less than three digits.

            let number = second_operator + '' + numbers[key];
            second_operator = parseInt(number);
            text = first_operator + ' ' + operation + ' ' + second_operator;

            display(text);
        }

        

    } else if (key in operations){

        // Triggers if first operator has been defined, 
        // but no operation is still defined

        if (first_operator != undefined && operation == undefined){

        text = first_operator + ' ' + operations[key];
        operation = operations[key];

        display(text);

        }

    } else if (key in actions){

        calculate();

    } else if (key == "clear"){

        clear();

    }
}

// Determines the length of the number entered as parameter

function length(number) {
    return number.toString().length;
}

// Reset screen and all variables to default value

function clear(){

    display("0");
    first_operator = undefined;
    second_operator = undefined;
    operation = undefined;

}

// Displays the text parameter on screen

function display(text){

    document.getElementById("input").innerHTML = text;

}

// When executed, does the proper operation

function calculate(){

    if ((first_operator && second_operator && operation) != undefined){

        switch (operation){

            case '+': sum(first_operator, second_operator); break;
            case 'x': multiply(first_operator, second_operator); break;
            case '/': divide(first_operator, second_operator); break;
            case '-': minus(first_operator, second_operator); break;
            default: console.log("Unexpected operation");

        }

        first_operator = undefined;
        operation = undefined;
        second_operator = undefined;

    }
}

// Function Operations

function sum(first, second){

    let operate = first + second;
    let text = operate + "";

    display(text);

}

function multiply(first, second){

    let operate = first * second;
    let text = operate + "";

    display(text);

}

function divide(first, second){

    let operate = (first / second).toFixed(2);
    let text = operate + "";

    display(text);

}

function minus(first, second){

    let operate = first - second;
    let text = operate + "";

    display(text);

}

// Keyboard key press event listeners

var body = document.querySelector('body');

body.onkeydown = function(event){

    var key = event.which || event.keyCode;

    if (key == 8 || key == 27){

        clear();

    }
}

body.onkeypress = function(event) {

    var key = event.which || event.keyCode;

    console.log(key);

    input(key);

}