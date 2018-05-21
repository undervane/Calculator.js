
class OperationController {
    
    constructor(){

        this.records = [];
        this.focus = undefined;

    }

    get(record){

        let length = this.records.length;

        let position = length - record;

        return this.records[position];

    }

    create(){

        if (this.records[0] != undefined){

            let current = this.records[0];
            current.position = 0;

            this.focus = this.records[0];

        }

        let newOperation = new Operation;

        this.records.unshift(newOperation);

        return newOperation;

    }

    current(){

        return this.records[0];

    }

    delete(input){

        switch (input){

            case 'current': 
            
                this.records[0] = new Operation; 
                main.object = this.records[0];
                break;

            case 'all': 
            
                this.records = []; 
                this.records[0] = new Operation; 
                main.object = this.records[0];
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
