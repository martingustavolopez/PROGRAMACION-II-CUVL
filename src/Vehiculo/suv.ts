import Vehiculo from "./vehiculo";

export default class Suv extends Vehiculo {

    private static readonly TARIFA_BASE: number = 80;
    private static readonly CARGO_SEGURO_DIA: number = 15;
    private static readonly CARGO_KM: number = 0.25;
    private static readonly KM_LIMITE_TOTAL: number = 500;

    constructor()
    constructor(matricula: string, kilometraje: number)
    constructor(matricula?: string, kilometraje?: number) {
        super(matricula as string, kilometraje as number);
    }

    public getTarifaBase(): number {
        return Suv.TARIFA_BASE;
    }

    protected calcularCargosPorKm(dias: number, kmRecorridos: number): number {
        const cargoSeguro = Suv.CARGO_SEGURO_DIA * dias;
        
        const kmExcedentes = Math.max(0, kmRecorridos - Suv.KM_LIMITE_TOTAL);
        const cargoPorKm = kmExcedentes * Suv.CARGO_KM;
        
        return cargoSeguro + cargoPorKm;
    }

}