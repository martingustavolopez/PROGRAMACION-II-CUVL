import Vehiculo from "./vehiculo";

export default class Suv extends Vehiculo {

    private static readonly TARIFA_BASE_DIA: number = 80;
    private static readonly CARGO_SEGURO_DIA: number = 15;
    private static readonly CARGO_KM: number = 0.25;
    private static readonly KM_LIM_DIARIO: number = 500;

    constructor()
    constructor(matricula: string, kilometraje:number)
    constructor(matricula?: string, kilometraje?: number) {
        super(matricula as string, kilometraje as number);
    }

    public calcularTarifa(dias: number, kmRecorridos: number): number {
        let costo = Suv.TARIFA_BASE_DIA * dias;
        const seguro = Suv.CARGO_SEGURO_DIA * dias;
        costo += seguro;

        const kmsxDia = kmRecorridos / dias;
        if ( kmsxDia > Suv.KM_LIM_DIARIO ) {
            const kmExcedidos = kmRecorridos - (Suv.KM_LIM_DIARIO * dias);
            costo += kmExcedidos * Suv.CARGO_KM;
        }

        return costo;
    }

}   