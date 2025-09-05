import Entrenadores from "./entrenadores";

export default class ClasesGrupales{
    private nombre:string;
    private horario:string;
    private entrenador:Entrenadores;
    private capacidadMax:number;

    constructor() {
        this.nombre = " ";
        this.horario = " ";
        this.entrenador = undefined as unknown as Entrenadores
        this.capacidadMax = 0;
    }

    public setNombre(value:string) :void{
        this.nombre = value;
    }
    public getNombre() :string{
        return this.nombre;
    }
    public setHorario(value:string) :void{
        this.horario = value;
    }
    public getHorario() :string{
        return this.horario;
    }
    public setEntrenador(value:Entrenadores) :void{
        this.entrenador = value;
    } 
    public getEntrenador() :Entrenadores{
        return this.entrenador;
    }
    public setCapacidadMax(value:number) :void{
        this.capacidadMax = value;
    }
    public getCapacidadMax() :number{
        return this.capacidadMax;
    }
}