
class OperationController{
    
    constructor(){

        this.records = [new Operation];
        this.position = 0;

    }

    input(text){

        //Continue working here

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

                let length = this.records.length - 1;
                this.records[length] = new Operation;
                break;

            case 'all': 
            
                this.records = [];
                this.records[0] = new Operation;
                break;

            case 'last': 
            
                let lastDeleted = this.current().text.slice(0, -1);
                this.current().text = lastDeleted;
            
                if (this.current().text == ""){
            
                    main.onDisplay = "0";
            
                } else { main.update(); }
            
                positionIndicator();

            break;

        }
    }
}
