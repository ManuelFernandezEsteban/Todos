export class Todo{

    static fromJson( objeto){
        const tempTodo = new Todo(objeto.tarea);
        tempTodo.id=objeto.id;
        tempTodo.creado=objeto.creado;
        tempTodo.completado=objeto.completado;
        return tempTodo;
    }

    constructor(tarea){

        this.tarea=tarea;
        this.id=new Date().getTime();
        this.completado=false;
        this.creado=new Date();
    }
}