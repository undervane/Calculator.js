'use strict';

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

var first_operator = undefined;
var second_operator = undefined;
var operation = undefined;

function input(key){

    let text;

    if (key in numbers){

        if (first_operator == undefined && operation == undefined){

            text = numbers[key];
            first_operator = numbers[key];

            display(text);

        } else if (first_operator != undefined && operation == undefined && length(first_operator) < 3) {

            text = first_operator + '' + numbers[key];
            first_operator = parseInt(text);

            display(text);

        } else if (operation != undefined && second_operator == undefined) {

            text = first_operator + ' ' + operation + ' ' + numbers[key];
            second_operator = numbers[key];

            display(text);

        } else if (first_operator != undefined && second_operator != undefined && length(second_operator) < 3){

            let number = second_operator + '' + numbers[key];
            second_operator = parseInt(number);
            text = first_operator + ' ' + operation + ' ' + second_operator;

            display(text);
        }

        

    } else if (key in operations){

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

function length(number) {
    return number.toString().length;
}

function clear(){

    display("0");
    first_operator = undefined;
    second_operator = undefined;
    operation = undefined;

}

function display(text){

    document.getElementById("input").innerHTML = text;

}

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