import Vehiculo from "./vehiculo";

/**
 * Clase que representa un vehículo tipo Sedán en el sistema de alquiler.
 * Hereda de la clase abstracta Vehículo e implementa sus métodos abstractos con tarifas y cargos específicos para este tipo de vehículo.
 */
export default class Sedan extends Vehiculo {

    /** Tarifa base diaria para alquiler de Sedán */
    private static readonly TARIFA_BASE: number = 50;

    /** Costo por kilómetro recorrido (sin límite de kilómetros incluidos) */
    private static readonly CARGO_KM: number = 0.20;

    /**
     * Constructor de la clase Sedán.
     * Puede ser llamado sin o con parámetros, cómo matricula y kilometraje inicial del vehículo.
     * @param matricula - Matrícula del vehículo Sedán (opcional).
     * @param kilometraje - Kilometraje inicial del vehículo Sedán (opcional).
     */
    constructor()
    constructor(matricula: string, kilometraje: number)
    constructor(matricula?: string, kilometraje?: number) {
        super(matricula as string, kilometraje as number);
    }

    /**
     * Se obtiene la tarifa base diaria del vehículo Sedán.
     * @returns Tarifa base diaria (50 por día) 
     */
    public getTarifaBase(): number {
        return Sedan.TARIFA_BASE;
    }

    /**
     * Calcula los cargos adicionales por seguro y kilómetros recorridos.
     * No tiene límite por kilómetros incluidos y cobra por cada kilómetro recorrido desde el inicio.
     * @param dias - Cantidad de días del alquiler (no se usa en este cálculo).
     * @param kmRecorridos - Kilómetros recorridos durante el alquiler.
     * @returns Costo adicional por kilómetros (kmRecorridos * 0.20).
     * 
     * @example
     *  Para 500 km:
     *  Cargo: 500 km * 0.20 = 100
     */
    protected calcularCargosPorKm(dias: number, kmRecorridos: number): number {
        return kmRecorridos * Sedan.CARGO_KM;
    }

}