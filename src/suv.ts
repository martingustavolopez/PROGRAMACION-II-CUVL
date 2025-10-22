import Vehiculo from "./vehiculo";

export default class Suv extends Vehiculo {

    private static readonly TARIFA_BASE_DIA: number = 80;
    private static readonly CARGO_SEGURO_DIA: number = 15;
    private static readonly CARGO_KM: number = 0.25;
    private static readonly KM_LIMITE_TOTAL: number = 500;

    constructor()
    constructor(matricula: string, kilometraje: number)
    constructor(matricula?: string, kilometraje?: number) {
        super(matricula, kilometraje);
    }

    public calcularTarifa(dias: number, kilometrosRecorridos: number): number {
        let costo = (Suv.TARIFA_BASE_DIA * dias) + (Suv.CARGO_SEGURO_DIA * dias);
        
        if (kilometrosRecorridos > Suv.KM_LIMITE_TOTAL) {
            const kmExcedentes = kilometrosRecorridos - Suv.KM_LIMITE_TOTAL;
            costo += kmExcedentes * Suv.CARGO_KM;
        }
        
        return costo;
    }
}