import Vehiculo from "./vehiculo";

export default class Sedan extends Vehiculo {

    private static readonly TARIFA_BASE_DIA: number = 50;
    private static readonly CARGO_KM: number = 0.20;

    constructor()
    constructor(matricula: string, kilometraje:number)
    constructor(matricula?: string, kilometraje?: number) {
        super(matricula as string, kilometraje as number);
    }


    public calcularTarifa(dias: number, kmRecorridos: number): number {
        let costo = Sedan.TARIFA_BASE_DIA * dias;
        const cargoxKm = kmRecorridos * Sedan.CARGO_KM;
        costo += cargoxKm;

        return costo;
    }

}   