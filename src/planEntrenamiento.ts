export default class PlanEntrenamiento {
    private descripcion: string;

    constructor() {
        this.descripcion = " ";
    }

    public setDescripcion(value:string) :void{
        this.descripcion = value;
    }
    public getDescripcion() :string{
        return this.descripcion;
    }
}