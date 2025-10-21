import Vehiculo from "./vehiculo";

export default class Compacto extends Vehiculo {

    //private static readonly TARIFA_BASE_DIA: number = 30;
    private static readonly CARGO_KM: number = 0.15;
    private static readonly KM_LIM_DIARIO: number = 100;

    //constructor()
    //constructor(matricula: string, kilometraje: number)
    //constructor(matricula?: string, kilometraje?: number) {
    //    super(matricula as string, kilometraje as number);
    constructor(matricula: string) {
        super(matricula, 30);
    }

    public calcularTarifa(dias: number, kmRecorridos: number): number {
        if (dias <= 0) {
            throw new Error("Los días deben ser mayor a 0.");
        }
        if (kmRecorridos < 0) {
            throw new Error("Los kilometros recorridos no pueden ser negativos.");
        }

        let costo = this.tarifaBase * dias;

        const kmsxDia = kmRecorridos / dias;
        if ( kmsxDia > Compacto.KM_LIM_DIARIO ) {
            const kmExcedidos = kmRecorridos - (Compacto.KM_LIM_DIARIO * dias);
            costo += kmExcedidos * Compacto.CARGO_KM;
        }

        return costo;
    }
  
}