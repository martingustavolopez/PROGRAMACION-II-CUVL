import Vehiculo from "./vehiculo";

export default class Compacto extends Vehiculo {

    private static readonly TARIFA_BASE_DIA: number = 30;
    private static readonly CARGO_KM: number = 0.15;
    private static readonly KM_LIMITE_DIARIO: number = 100;

    constructor()
    constructor(matricula: string, kilometraje: number)
    constructor(matricula?: string, kilometraje?: number) {
        super(matricula as string, kilometraje as number);
    }

    public calcularTarifa(dias: number, kilometrosRecorridos: number): number {
        let costo = Compacto.TARIFA_BASE_DIA * dias;
        
        const kmPorDia = kilometrosRecorridos / dias;
        if (kmPorDia > Compacto.KM_LIMITE_DIARIO) {
            const kmExcedentes = kilometrosRecorridos - (Compacto.KM_LIMITE_DIARIO * dias);
            costo += kmExcedentes * Compacto.CARGO_KM;
        }
        
        return costo;
    }
}