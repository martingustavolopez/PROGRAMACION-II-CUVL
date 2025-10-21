import Vehiculo from "./vehiculo";

export default class Sedan extends Vehiculo {

    private static readonly CARGO_KM: number = 0.20;

    //constructor()
    //constructor(matricula: string, kilometraje: number)
    //constructor(matricula?: string, kilometraje?: number) {
    //    super(matricula as string, kilometraje as number);
    constructor(matricula: string) {
        super(matricula, 50);
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

        let costo = this.tarifaBase * dias;
        const cargoxKm = kmRecorridos * Sedan.CARGO_KM;
        costo += cargoxKm;

        return costo;
    }

}   


    