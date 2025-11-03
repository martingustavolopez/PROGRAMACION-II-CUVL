import Vehiculo from "./vehiculo";

export default class Sedan extends Vehiculo {

    private static readonly CARGO_KM: number = 0.20;

    constructor()
    constructor(matricula: string, kilometraje: number, tarifaBase: number)
    constructor(matricula?: string, kilometraje?: number, tarifaBase?: number) {
        super(matricula as string, kilometraje as number, tarifaBase as 50);
    }

    public calcularTarifa(dias: number, kilometrosRecorridos: number): number {
        const costo = (this.tarifaBase * dias) + (kilometrosRecorridos * Sedan.CARGO_KM);
        return costo;
    }
}