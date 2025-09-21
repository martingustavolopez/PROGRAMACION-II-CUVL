import Vehiculo from "./vehiculo";

export default class Compacto extends Vehiculo {

    private static readonly TARIFA_BASE_DIA: number = 30;
    private static readonly CARGO_KM: number = 0.15;
    private static readonly KM_LIM_DIARIO: number = 100;

}   


    public calcularTarifa(dias: number, kmRecorridos: number): number {
        let costo = Compacto.TARIFA_BASE_DIA * dias;

        const kmsxDia = kmRecorridos / dias;
        if ( kmxDia > Compacto.KM_LIM_DIARIO ) {
            const kmExcedidos = kmRecorridos - (Compacto.KM_LIMITE_DIARIO * dias);
            costo += kmExcedidos * Compacto.CARGO_KM;
        }

        return costo;
    }

