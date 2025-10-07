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

    /**
     * Getter de la Tarifa Base, por si se necesita mostrar fuera de esta clase.
     * @returns 
     */
    public static getTarifaBase(): number {
        return Suv.TARIFA_BASE_DIA;
    }

    /**
     * Implementación del calculo de tarifa para SUV
     * @param dias 
     * @param kmRecorridos 
     * @returns 
     */
    public calcularTarifa(dias: number, kmRecorridos: number): number {
        if (dias <= 0) {
            throw new Error("Los días deben ser mayor a 0.");
        }
        if (kmRecorridos < 0) {
            throw new Error("Los kilometros recorridos no pueden ser negativos.");
        }

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