import Socio from "./socio";

export default class SocioVip extends Socio{

    constructor() {
        super();
        this.montoMensual = 8000;
    }
    public MontoMensualTotal(): number {
        return this.montoMensual;
    }
    
}