import Socio from "./socio";

export default class SocioRegular extends Socio{
    private adicionalClase: number;
    private cantClases: number;

    constructor() {
        super()
        this.adicionalClase = 350;
        this.cantClases = 0;
        this.montoMensual = 5000;
    }

    public getAdicionalClase() :number{
        return this.adicionalClase;
    } 
    public setCantidadClases(value:number) :void{
        this.cantClases = value;
    }
    public getCantidadClases() :number{
        return this.cantClases;
    }
    public MontoMensualTotal(): number {
        return (this.cantClases * this.adicionalClase) + this.montoMensual;
    }

}