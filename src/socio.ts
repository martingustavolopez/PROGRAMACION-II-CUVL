import PlanEntrenamiento from "./planEntrenamiento";

export default abstract class Socio{
    private socioId:number;
    private nombre:string;
    protected montoMensual:number;
    private esVip: boolean;
    private plan:PlanEntrenamiento;

    constructor() {
        this.socioId = 0;
        this.nombre = " ";
        this.montoMensual = 0;
        this.esVip = false;
        this.plan = undefined as unknown as PlanEntrenamiento;
    }

    public setSocioId(value:number) :void{
        this.socioId = value;
    }
    public getSocioId() :number{
        return this.socioId;
    }
    public setNombre(value:string) :void{
        this.nombre = value;
    }
    public getNombre() :string{
        return this.nombre;
    }
    public setMontoMensual(value:number) :void{
        this.montoMensual = value;
    }
    public getMontoMensual() :number{
        return this.montoMensual;
    }
    public setEsVip(value:boolean) :void{
        this.esVip = value;
    }
    public getEsVip() :boolean{
        return this.esVip;
    }
    public abstract MontoMensualTotal() :number;

    public setPlan(value:PlanEntrenamiento) :void{
        this.plan = value;
    }
    public getPlan() :PlanEntrenamiento{
        return this.plan;
    }
    
}