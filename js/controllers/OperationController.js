
class OperationController{
    
    constructor(){

        this.records = [new Operation];
        this.position = this.records.length - 1;

    }
    
    // Add ANS to main screen
    
    getAns(){
    
        if (operation.focus != undefined) {
    
            let current = this.current()
    
            current.text += operation.focus.text;
            main.print(current, "input");
    
        }
    }
    
    // Reset screen and all variables to default value
    
    clear(){
    
        if (this.current().text == ""){
    
            this.delete('all');
    
        } else {
    
            this.delete('current');
    
        }
    }

    // When executed, does the proper operation

    calculate(){

        try {
    
            let operation = this.current();
    
            let filteredOperation = operation.text.replace(/x/g,"*").replace(/−/g,"-").replace(/π/g,"Math.PI").replace(/√/g,"Math.sqrt").replace(/f/g, "").replace(/e/g, "Math.E");
    
            operation.mode = 'result';

            operation.result = eval(filteredOperation).toString();

            this.records.push(new Operation);
    
        } catch(e) {
    
            // If user writes a mathematically 
            // incorrect operation, we throw an error
    
            main.onDisplay = "Error";
            operation.delete('current');
    
        }
    }
    

    change(direction){

        let length = this.records.length - 1;

        switch (direction){

            case up: position == length ? null : position++
            case down: position == 0 ? null : position--

        }

        return this.records[position];
    }

    get(mode){

        switch (mode){

            case 'input':
                return this.current().text;

            case 'result':
                return this.current().result;

        }
    }

    create(){

        if (this.records[0] != undefined){

            let current = this.records[0];
            current.position = 0;

            this.current = this.records[0];

        }

        let newOperation = new Operation;

        this.records.unshift(newOperation);

        return newOperation;

    }

    current(){

        let length = this.records.length - 1;

        return this.records[length];

    }

    delete(input){

        switch (input){

            case 'current': 
                this.current().text = "";
            break;

            case 'all': 
                this.records = [new Operation];
            break;

            case 'last': 
                let lastDeleted = this.current().text.slice(0, -1);
                this.current().text = lastDeleted;
            break;

        }
    }
}
