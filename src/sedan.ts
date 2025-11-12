import Vehiculo from "./vehiculo";

export default class Sedan extends Vehiculo {

    private static readonly TARIFA_BASE: number = 50;
    private static readonly CARGO_KM: number = 0.20;

    constructor()
    constructor(matricula: string, kilometraje: number)
    constructor(matricula?: string, kilometraje?: number) {
        super(matricula as string, kilometraje as number);
    }

    public getTarifaBase(): number {
        return Sedan.TARIFA_BASE;
    }

    protected calcularCargosPorKm(dias: number, kmRecorridos: number): number {
        return kmRecorridos * Sedan.CARGO_KM;
    }

}