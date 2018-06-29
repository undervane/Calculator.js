

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

    appendDisplay(positions, id, initialText){

        // console.log(initialText);

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

    add(input){

        this.displays.main.operation.add(input);
        this.print(this.operation.get('input'));

    }

    print(id, text, mode){

        // console.log(text);

        let textToShow;

        if (text > this.displays[id].positions){

            let parsed = this.slicer(text, mode, this.displays[id]);
            textToShow = parsed;
        
        } else {

            textToShow = text;

        }

        document.getElementById(id).querySelector("text").innerHTML = textToShow;

        this.updateArrow(textToShow);

    }

    // Private Focus

    focus(e){

        if (this.focused.id != e.currentTarget.id) {

            document.getElementById(e.currentTarget.id + "-screen").classList.add('focus');
            document.getElementById(this.focused.id + "-screen").classList.remove('focus');
            this.focused = this.displays[e.currentTarget.id];
        
        }
        
    }

    // Private Slicer

    slicer(text, mode, display){
        
        if (mode == 'result'){

            return text.slice(0, display.positions);

        } else if (mode == 'input'){

            return text.slice((text.length - display.positions), text.length);

        } else {

            return text.slice(((text.length - display.positions) - display.position), (text.length - display.position)); 

        }  
    }

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

}