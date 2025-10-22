import Vehiculo from "./vehiculo";

export default class Sedan extends Vehiculo {

    private static readonly TARIFA_BASE_DIA: number = 50;
    private static readonly CARGO_KM: number = 0.20;

    constructor()
    constructor(matricula: string, kilometraje: number)
    constructor(matricula?: string, kilometraje?: number) {
        super(matricula, kilometraje);
    }

    public calcularTarifa(dias: number, kilometrosRecorridos: number): number {
        const costo = (Sedan.TARIFA_BASE_DIA * dias) + (kilometrosRecorridos * Sedan.CARGO_KM);
        return costo;
    }
}  