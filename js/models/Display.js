
class Display {
    
    constructor(positions, id){

        this.id = id;
        this.position = 0;
        this.positions = positions;
        this.operation;
        this.display = 0;

    }

    set setOperation(operation){

        this.position = 0;
        this.operation = operation;

    }
}
