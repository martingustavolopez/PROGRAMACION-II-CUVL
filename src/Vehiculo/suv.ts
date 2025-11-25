import Vehiculo from "./vehiculo";

/**
 * Clase que representa un vehículo tipo SUV en el sistema de alquiler.
 * Hereda de la clase abstracta Vehículo e implementa sus métodos abstractos con tarifas y cargos específicos para este tipo de vehículo.
 */
export default class Suv extends Vehiculo {
    
    /** Tarifa base diaria para alquiler de SUV */
    private static readonly TARIFA_BASE: number = 80;
    
    /** Cargo adicional de seguro por día para SUV */
    private static readonly CARGO_SEGURO_DIA: number = 15;

    /** Costo por kilómetro excedente sobre el límite permitido */
    private static readonly CARGO_KM: number = 0.25;

    /** Límite de kilómetros incluidos en la tarifa base durante todo el alquiler */
    private static readonly KM_LIMITE_TOTAL: number = 500;

    /**
     * Constructor de la clase SUV.
     * Puede ser llamado sin o con parámetros, cómo matricula y kilometraje inicial del vehículo.
     * @param matricula - Matrícula del vehículo SUV (opcional).
     * @param kilometraje - Kilometraje inicial del vehículo SUV (opcional).
     */
    constructor()
    constructor(matricula: string, kilometraje: number)
    constructor(matricula?: string, kilometraje?: number) {
        super(matricula as string, kilometraje as number);
    }

    /**
     * Se obtiene la tarifa base diaria del vehículo SUV.
     * @returns Tarifa base diaria (80 por día) 
     */
    public getTarifaBase(): number {
        return Suv.TARIFA_BASE;
    }

    /**
     * Calcula los cargos adicionales por seguro y kilómetros recorridos.
     * Incluye:
     * - Cargo de seguro diario por cada día del alquiler.
     * - Cargo por kilómetros que exceden el límite total de 500 km.
     * @param dias - Cantidad de días del alquiler.
     * @param kmRecorridos - Kilómetros recorridos durante el alquiler.
     * @returns Costo adicional por seguro y kilómetros excedentes.
     * 
     * @example
     *  Para 3 días y 600 km
     *  Seguro: 15 * 3 = 45
     *  Km excedentes: (600 - 500) * 0.25 = 25
     *  Total: 70
     */
    protected calcularCargosPorKm(dias: number, kmRecorridos: number): number {
        const cargoSeguro = Suv.CARGO_SEGURO_DIA * dias;
        
        const kmExcedentes = Math.max(0, kmRecorridos - Suv.KM_LIMITE_TOTAL);
        const cargoPorKm = kmExcedentes * Suv.CARGO_KM;
        
        return cargoSeguro + cargoPorKm;
    }

}