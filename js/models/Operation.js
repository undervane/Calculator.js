
class Operation {

    constructor(){

        this.text = "";
        this.mode = 'input';
        this.result = undefined;

    }

    get(){

        if (mode == 'input'){

            return this.text;

        } else if (this.mode == 'result'){

            return this.result;

        }

    }

}
