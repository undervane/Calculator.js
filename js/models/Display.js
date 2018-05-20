
class Display {
    
    constructor(positions, id){

    this.id = id;
    this.position = 0;
    this.positions = positions;
    this.currentObject = undefined;
    this.currentOnDisplay = undefined;

    }

    set object(object){

        this.position = 0;
        this.currentObject = object;

    }
    
    set onDisplay(text){

        this.currentOnDisplay = text;
        document.getElementById(`${this.id}-input`).innerHTML = text;

    }

    update(){

        if (this.currentObject.text.length > this.positions){

            let parsedText = this.slicer(this.currentObject, this.position);
            this.onDisplay = parsedText;
        
        } else {this.onDisplay = this.currentObject.text;}

        this.positionIndicator();

    }

    focus(){

        if (displays.currentFocus != this){
            
            document.getElementById(`${this.id}-screen`).classList.toggle('focus');
            document.getElementById(`${displays.currentFocus.id}-screen`).classList.toggle('focus');
    
            displays.currentFocus = this;
    
        }
    }

    slicer(object){
        
        if (object.mode == 'result'){

            return object.result.slice(0, this.positions);

        } else if (object.mode == 'input'){

            return object.text.slice((object.text.length - this.positions), object.text.length);

        } else {

            return object.text.slice(((object.text.length - this.positions) - this.position), (object.text.length - this.position)); 

        }  

    }

    positionIndicator(){

        let objectLength = this.currentObject.text.length;

        if (objectLength > this.positions){
    
            if (this.position != 0){
    
                if (this.position == objectLength - this.positions){
    
                    document.getElementById("leftArrow").classList.add('arrow-hidden');
                    document.getElementById("rightArrow").classList.remove('arrow-hidden');
            
                } else {
    
                document.getElementById("rightArrow").classList.remove('arrow-hidden');
                document.getElementById("leftArrow").classList.remove('arrow-hidden');
    
                }
    
            } else {
    
                document.getElementById("rightArrow").classList.add('arrow-hidden');
                document.getElementById("leftArrow").classList.remove('arrow-hidden');
    
            }
    
        } else {
    
            document.getElementById("leftArrow").classList.add('arrow-hidden');
            document.getElementById("rightArrow").classList.add('arrow-hidden');
    
        }
    
    }

}
