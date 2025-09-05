export default class Entrenadores{
    private nombre: string;
    private especialidad: string;
    private planEntreno: string;

    constructor() {
        this.nombre = " ";
        this.especialidad = " ";
        this.planEntreno = " "
    }

    public setNombre(value:string) :void{
        this.nombre = value;
    }
    public getNombre() :string{
        return this.nombre;
    }
    public setEspecialidad(value:string) :void{
        this.especialidad = value;
    }
    public getEspecialidad() :string{
        return this.especialidad;
    }
    public setPlanEntreno(value:string) :void{
        this.planEntreno = value;
    }
    public getPlanEntreno() :string{
        return this.planEntreno;
    }
    
}