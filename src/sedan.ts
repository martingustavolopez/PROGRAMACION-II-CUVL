import Vehiculo from "./vehiculo";

export default class Sedan extends Vehiculo {

    private static readonly TARIFA_BASE_DIA: number = 50;
    private static readonly CARGO_KM: number = 0.20;

    constructor()
    constructor(matricula: string, kilometraje: number)
    constructor(matricula?: string, kilometraje?: number) {
        super(matricula as string, kilometraje as number);
    }

    /**
     * Getter de la Tarifa Base, por si se necesita mostrar fuera de esta clase.
     * @returns 
     */
    public static getTarifaBase(): number {
        return Sedan.TARIFA_BASE_DIA;
    }

    /**
     * Implementación del calculo de tarifa para Sedan
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

        let costo = Sedan.TARIFA_BASE_DIA * dias;
        const cargoxKm = kmRecorridos * Sedan.CARGO_KM;
        costo += cargoxKm;

        return costo;
    }

}   


    