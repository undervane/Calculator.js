
class OperationController{
    
    constructor(){

        this.records = [new Operation];
        this.position = this.records.length - 1;

    }
    
    // Add ANS to main screen
    
    getAns(){

        if (this.records[this.position - 1] != null){
    
            this.current().text += this.records[this.position - 1].result;

        }
    
    }

    // When executed, does the proper operation

    calculate(){

        try {
    
            let operation = this.current();
    
            let filteredOperation = operation.text.replace(/x/g,"*").replace(/−/g,"-").replace(/π/g,"Math.PI").replace(/√/g,"Math.sqrt").replace(/f/g, "").replace(/e/g, "Math.E");
    
            operation.mode = 'result';

            // Update to start using Wolfram Alpha API
            // http://api.wolframalpha.com/v2/query?input=pi&appid=6W6YWG-8TK27HAGAQ

            operation.result = eval(filteredOperation).toString();

            this.records.push(new Operation);
            this.position = this.records.length - 1;
    
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
