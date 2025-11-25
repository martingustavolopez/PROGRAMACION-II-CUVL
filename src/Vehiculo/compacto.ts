import Vehiculo from "./vehiculo";

/**
 * Clase que representa un vehículo tipo Compacto en el sistema de alquiler.
 * Hereda de la clase abstracta Vehículo e implementa sus métodos abstractos con tarifas y cargos específicos para este tipo de vehículo.
 */
export default class Compacto extends Vehiculo {

    /** Tarifa base diaria para alquiler de Compacto */
    private static readonly TARIFA_BASE: number = 30;

    /** Costo por kilómetro excedente sobre el límite diario permitido */
    private static readonly CARGO_KM: number = 0.15;

    /** Límite de kilómetros incluidos por día (100 km/día) */
    private static readonly KM_LIMITE_DIARIO: number = 100;

    /**
     * Constructor de la clase Compacto.
     * Puede ser llamado sin o con parámetros, cómo matricula y kilometraje inicial del vehículo.
     * @param matricula - Matrícula del vehículo Compacto (opcional).
     * @param kilometraje - Kilometraje inicial del vehículo Compacto (opcional).
     */
    constructor()
    constructor(matricula: string, kilometraje: number)
    constructor(matricula?: string, kilometraje?: number) {
        super(matricula as string, kilometraje as number);
    }

    /**
     * Se obtiene la tarifa base diaria del vehículo Compacto.
     * @returns Tarifa base diaria (30 por día) 
     */
    public getTarifaBase(): number {
        return Compacto.TARIFA_BASE;
    }
    
    /**
     * Calcula los cargos adicionales por kilómetros recorridos según el límite diario.
     * El Compacto incluye 100 km por día de alquiler sin cargo adicional.
     * Solo se cobra por los kilómetros que excedan el límite total permitido.
     * @param dias - Cantidad de días del alquiler.
     * @param kmRecorridos - Kilómetros recorridos durante el alquiler.
     * @returns Costo adicional por kilómetros excedentes.
     * 
     * @example
     *  Caso 1: Dentro del límite
     *  3 días, 250 km → promedio 83.33 km/día
     *  Límite: 100 * 3 = 300 km
     *  Excedente: 0 km → Cargo: 0
     * 
     * @example
     *  Caso 2: Excede el límite
     *  3 días, 400 km → promedio 133.33 km/día
     *  Límite: 100 * 3 = 300 km
     *  Excedente: 400 - 300 = 100 km → Cargo: 100 * 0.15 = 15
     */
    protected calcularCargosPorKm(dias: number, kmRecorridos: number): number {
        let costo = 0;
        const kmPorDia = kmRecorridos / dias;
        if (kmPorDia > Compacto.KM_LIMITE_DIARIO) {
            const kmExcedentes = kmRecorridos - (Compacto.KM_LIMITE_DIARIO * dias);
            costo += kmExcedentes * Compacto.CARGO_KM;
        }
        return costo;
    }

}