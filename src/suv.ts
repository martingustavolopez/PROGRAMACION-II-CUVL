import Vehiculo from "./vehiculo";

export default class Suv extends Vehiculo {

    private static readonly CARGO_SEGURO_DIA: number = 15;
    private static readonly CARGO_KM: number = 0.25;
    private static readonly KM_LIM_DIARIO: number = 500;

    //constructor()
    //constructor(matricula: string, kilometraje:number)
    //constructor(matricula?: string, kilometraje?: number) {
    //    super(matricula as string, kilometraje as number);
    constructor(matricula: string) {
        super(matricula, 80);
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

        let costo = this.tarifaBase * dias;
        costo += Suv.CARGO_SEGURO_DIA * dias;
        
        if ( kmRecorridos > Suv.KM_LIM_DIARIO ) {
            const kmExcedidos = kmRecorridos - Suv.KM_LIM_DIARIO;
            costo += kmExcedidos * Suv.CARGO_KM;
        }
        return costo;
    }

}   