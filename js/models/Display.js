
class Display {
    
    constructor(positions, id, active){

        this.id = id;
        this.position = 0;
        this.positions = positions;
        this.operation = undefined;
        this.display = 0;
        this.focus = active ? true : false;

    }

    set setOperation(operation){

        this.position = 0;
        this.operation = operation;

    }
}
