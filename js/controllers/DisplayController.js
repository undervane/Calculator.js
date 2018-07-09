

class DisplayController {

    constructor(operationController){

        var self = this;

        this.displays = {};
        this.focused;
        this.operationController = operationController;
        
        watch(this.operationController, function(prop, action, difference, oldvalue){

            if(prop == "text"){

                self.print("main", difference, this.mode);

            }

            if(prop == "result"){

                self.print("main", difference, this.mode);
                self.print("ans", difference, this.mode);

            }

        }, 2);

    }

    // Public appendDisplay()

    appendDisplay(positions, id, initialText){

        if ((id == "main" && this.displays.main == null) || (id != "main" && this.displays.main != null)){

            if (this.displays[id] == null) {

                this.displays[id] = new Display(positions, id);
                document.getElementById(id).addEventListener("click", (e) => this.focus(e));

                if (id == "main"){
                    this.focused = this.displays.main;
                }
                
                this.print(id, initialText, "input");
    
            } else { throw new DOMException(`A display with id ${id} already exists`); }

        } else { throw new DOMException("A display with id 'main' must be created first"); }

    }

    // Public clear()

    // Reset screen and all variables to default value
    
     clear(){

        if (this.onDisplay("main") == "0" && this.operationController.current().text == ''){
    
            operationController.delete('all');
            
            for (let display in this.displays) {

                this.print(display, "0", "input");

            }
    
        } else {
    
            operationController.delete('current');
            this.print("main", "0", "input");
    
        }
    }

    // Public add()

    add(input){

        this.displays.main.operation.add(input);
        this.print(this.operation.get('input'));

    }

    // Public onDisplay()

    onDisplay(id){

        return document.getElementById(id).querySelector("text").innerHTML;

    }

    // Private print()

    print(id, text, mode){

        let textToShow;

        if (text > this.displays[id].positions){

            let parsed = this.slicer(text, mode, this.displays[id]);
            textToShow = parsed;
        
        } else {

            textToShow = text != "" ? text : "0";
            console.log(textToShow);

        }

        document.getElementById(id).querySelector("text").innerHTML = textToShow;

        this.updateArrow(textToShow);

    }

    // Private focus()

    focus(e){

        if (this.focused.id != e.currentTarget.id) {

            document.getElementById(e.currentTarget.id + "-screen").classList.add('focus');
            document.getElementById(this.focused.id + "-screen").classList.remove('focus');
            this.focused = this.displays[e.currentTarget.id];
        
        }
        
    }

    // Private slicer()

    slicer(text, mode, display){
        
        if (mode == 'result'){

            return text.slice(0, display.positions);

        } else if (mode == 'input'){

            return text.slice((text.length - display.positions), text.length);

        } else {

            return text.slice(((text.length - display.positions) - display.position), (text.length - display.position)); 

        }  
    }

    // Private updateArrow()

    updateArrow(text){

        // console.log(text);

        let length = text.length;
        let leftArrow = document.getElementById(this.focused.id + "-leftArrow");
        let rightArrow = document.getElementById(this.focused.id + "-rightArrow");

        if (length > this.focused.positions){

            if (this.focused.position != 0){

                if (this.focused.position == length - this.focused.positions){

                    leftArrow.classList.add('arrow-hidden');
                    rightArrow.classList.remove('arrow-hidden');
            
                } else {

                    rightArrow.classList.remove('arrow-hidden');
                    leftArrow.classList.remove('arrow-hidden');

                }

            } else {

                rightArrow.classList.add('arrow-hidden');
                leftArrow.classList.remove('arrow-hidden');

            }

        } else {

            leftArrow.classList.add('arrow-hidden');
            rightArrow.classList.add('arrow-hidden');

        }

    }

    // Private move()

    // Makes possible to show text by moving 
    // to the right or left on large operation

    move(direction, display){

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

    // Private determinePosition()

    // Determines the actual text to be displayed on screen

    determinePosition(number, display){

        if (display == "main"){

            operation.current.position += number;
            
            return operation.current().text.slice(((operation.current().text.length - 9) - operation.current.position), (operation.current().text.length - operation.current.position));

        } else if (display == "additional"){

            operation.focus.position += number;
            
            return operation.focus.text.slice(((operation.focus.text.length - 4) - operation.focus.position), (operation.focus.text.length - operation.focus.position));

        }

    }

}