

class DisplayController extends Display {

    constructor(positions, id){

        super(positions, id);

        this.operation.watch('text', function(){

            this.print(this.operation.get());

        });

    }

    print(text){

        if (text > this.positions){

            let parsed = this.slice(this.operation.mode, this.position);
            this.display = parsed;
        
        } else {

            this.display = text;

        }

        document.getElementById(this.id).innerHtml(this.display);

        this.updateArrow();

    }

    focus(bool){

        for (let display in displays){

            display.focus(false);

        }

        if (bool){
            
            document.getElementById(this.id).classList.addClass('focus');

        } else {

            document.getElementById(this.id).classList.removeClass('focus');

        }

    }

    slice(object){
        
        if (object.mode == 'result'){

            return object.result.slice(0, this.positions);

        } else if (object.mode == 'input'){

            return object.text.slice((object.text.length - this.positions), object.text.length);

        } else {

            return object.text.slice(((object.text.length - this.positions) - this.position), (object.text.length - this.position)); 

        }  

    }

    updateArrow(){

        let length = this.text.length;
        let leftArrow = document.getElementById(this.id + "-leftArrow");
        let rightArrow = document.getElementById(this.id + "-rightArrow");

        if (length > this.positions){

            if (this.position != 0){

                if (this.position == length - this.positions){

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