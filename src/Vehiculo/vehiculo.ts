import EstadoDisponible from "../EstadoVehiculo/estadoDisponible";
import { IEstadoVehiculo } from "../EstadoVehiculo/iestadoVehiculo";
import Mantenimiento from "../mantenimiento";
import { ITemporada } from "../Temporada/iTemporada";

/**
 * Clase abstracta que representa un vehículo en el sistema de alquiler.
 * Se implementa en él la gestión de estados, mantenimiento y tarifas.
 */
export default abstract class Vehiculo {

    protected matricula: string;
    protected estado: IEstadoVehiculo;
    protected kilometraje: number;
    protected mantenimientos: Mantenimiento[];

    private kmDesdeUltimoMantenimiento: number
    private fechaUltimoMantenimiento: Date
    private alquileresDesdeUltimoMantenimiento: number

    /**
     * Constructor de la clase vehículo.
     * Puede ser llamado sin o con parámetros, cómo matricula y kilometraje inicial del vehículo.
     * @param matricula - Matrícula del vehículo (opcional).
     * @param kilometraje - Kilometraje inicial del vehículo (opcional).
     */
    constructor()
    constructor(matricula: string, kilometraje: number)
    constructor(matricula?: string, kilometraje?: number) {
        this.matricula = matricula ?? "";
        this.estado = new EstadoDisponible();
        this.kilometraje = kilometraje ?? 0;
        this.mantenimientos = [];

        this.kmDesdeUltimoMantenimiento = 0
        this.fechaUltimoMantenimiento = new Date();
        this.alquileresDesdeUltimoMantenimiento = 0;
    }

    // Getters
    /**
     * Se obtiene la matrícula del vehículo.
     * @returns La matrícula del vehículo.
     */
    public getMatricula(): string {
        return this.matricula;
    }

    /**
     * Se obtiene el estado actual del vehículo.
     * @returns El estado actual del vehículo, ya sea Disponible, En Alquiler o En Mantenimiento.
     */
    public getEstado(): IEstadoVehiculo {
        return this.estado;
    }

    /**
     * Se obtiene el kilometraje total (actual) del vehículo.
     * @returns El kilometraje acumulado del vehículo
     */
    public getKilometraje(): number {
        return this.kilometraje;
    }

    /**
     * Se obtiene una copia del historial de mantenimientos del vehículo.
     * @returns Array con todos los mantenimientos realizados al vehículo.
     */
    public getMantenimientos(): Mantenimiento[] {
        return [...this.mantenimientos];
    }

    /**
     * Se obtiene los kilómetros recorridos desde el último mantenimiento.
     * @returns Cantidad de kilómetros desde el último mantenimiento. 
     */
    public getKmDesdeUltimoMantenimiento(): number {
        return this.kmDesdeUltimoMantenimiento;
    }

    /**
     * Se obtiene la fecha del último mantenimiento realizado.
     * @returns Fecha del último mantenimiento.
     */
    public getFechaUltimoMantenimiento(): Date {
        return this.fechaUltimoMantenimiento;
    }

    /**
     * Se obtiene la cantidad de alquileres completados desde el último mantenimiento.
     * @returns Número de alquileres desde el último mantenimiento.
     */
    public getAlquileresDesdeUltimoMantenimiento(): number {
        return this.alquileresDesdeUltimoMantenimiento;
    }

    // Setters
    /**
     * Se establece una nueva matrícula para el vehículo.
     * @param matricula - Nueva matrícula del vehículo.
     */
    public setMatricula(matricula: string): void {
        this.matricula = matricula;
    }

    /**
     * Actualiza el kilometraje del vehículo.
     * El nuevo kilometraje debe ser mayor o igual al actual.
     * @param kilometraje - Nuevo kilometraje del vehículo (acumulado).
     * @throws {Error} Si el kilometraje es menor al actual.
     */
    public setKilometraje(kilometraje: number): void {
        if (kilometraje < this.kilometraje) {
            throw new Error("El kilometraje no puede ser menor al actual.");
        }
        this.kilometraje = kilometraje;
    }

    // Gestión de Mantenimiento
    /**
     * Agrega un mantenimiento al historial del vehículo.
     * @param mantenimiento - Registro del mantenimiento realizado. 
     */
    public agregarMantenimiento(mantenimiento: Mantenimiento): void {
        this.mantenimientos.push(mantenimiento);
    }

    // Disparadores de Mantenimiento
    /**
     * Evalúa si el vehículo necesita mantenimiento según ciertos criterios:
     * - Si supera los 10.000 km desde el último mantenimiento.
     * - Si pasan más de 365 días desde el últumo mantenimiento.
     * - Se ha completado 5 o más alquileres desde el último mantenimiento.
     * @returns true si se cumple alguno de los criterios o false en caso contrario.
     */
    public necesitaMantenimiento(): boolean {
        // Un vehicuo debe pasar a estado "En Mantenimiento" y ser inhabilitado para nuevas reservas automáticamente bajo cualquiera de las siguientes condiciones
        
        // 1º Criterio - Ha superado los 10.000 km desde su último mantenimiento.
        if (this.kmDesdeUltimoMantenimiento > 10000) {
            return true;
        }

        // 2º Criterio - Han pasado 12 meses desde su último mantenimiento. (12 meses = 1 año) => (1 año = 365 dias)
        const milisegundosPorDia = 1000 * 60 * 60 * 24;
        const diasDesdeMantenimiento = (Date.now() - this.fechaUltimoMantenimiento.getTime()) / milisegundosPorDia;
        if (diasDesdeMantenimiento > 365) {
            return true;
        }

        // 3º Criterio - Después de cada 5 alquileres completados.
        if (this.alquileresDesdeUltimoMantenimiento >= 5) {
            return true;
        }

        return false;
    }

    /**
     * Resetea todos los contadores relacionados a los disparadores de mantenimiento.
     * Setea en cero los kilómetros y alquileres desde el último mantenimiento, y actualiza la fecha de mantenimiento a la fecha actual.
     */
    public resetearContadoresMantenimiento(): void {
        this.kmDesdeUltimoMantenimiento = 0;
        this.fechaUltimoMantenimiento = new Date();
        this.alquileresDesdeUltimoMantenimiento = 0;
    }

    // Patrón State
    /**
     * Cambia el estado del vehículo a "En Alquiler".
     * Delega la acción al estado actual del vehículo (patrón state).
     */
    public reservar(): void {
        this.estado.reservar(this);
    }

    /**
     * Registra la devolución del vehículo después de un alquiler.
     * Actualiza el kilometraje total (acumulado), los kilómetros desde el último mantenimiento, incrementa el contador de alquileres y cambia el estado del vehículo.
     * @param kilometros - Cantidad de kilómetros recorridos durante el alquiler.
     * @throws {Error} Si los kilómetros son negativos o cero. 
     */
    public devolver(kilometros: number): void {
        if (kilometros <= 0) {
            throw new Error("El kilometraje no puede ser negativo ni cero");
        }
        this.kilometraje += kilometros; // Sumar kilómetros al kilometraje total del vehiculo
        this.kmDesdeUltimoMantenimiento += kilometros;
        this.alquileresDesdeUltimoMantenimiento++;
        this.estado.devolver(this);
    }

    /**
     * Estable un nuevo estado para el vehículo.
     * @param estadoNuevo - Nuevo estado del vehículo (Disponible, En Alquiler, En Mantenimiento).
     */
    public setEstado(estadoNuevo: IEstadoVehiculo): void {
        this.estado = estadoNuevo;
    }   

    /**
     * Se verifica si el vehículo está disponible para ser reservado.
     * @returns true si el vehículo puede ser reservado o false en caso contrario.
     */
    public estaDisponible(): boolean { 
        return this.estado.puedeReservar();
    }

    /**
     * Se obtiene la tarifa base diaria del vehículo.
     * Este método debe ser implementado por las clases hijas (Compacto, Sedan y SUV).
     * @returns Tarifa base diaria del vehículo.
     */
    public abstract getTarifaBase(): number;

    /**
     * Calcula los cargos adicionales por kilómetros recorridos.
     * Este método debe ser implementado por las clases hijas (Compacto, Sedan y SUV).
     * @param dias - Cantidad de días del alquiler.
     * @param kmRecorridos - Kilómetros recorridos durante el alquiler.
     * @returns Costo adicional por kilómetros.
     */
    protected abstract calcularCargosPorKm(dias: number, kmRecorridos: number): number;

    /**
     * Calcula la tarifa total del alquiler considerando la temporada.
     * Combina la tarifa base ajustada por temporada con los cargos por kilómetros.
     * @param dias - Cantidad de días del alquiler.
     * @param kmRecorridos - Kilómetros recorridos durante el alquiler.
     * @param temporada - Estrategia de temporada que ajusta la tarifa base.
     * @returns Costo total del alquiler.
     */
    public calcularTarifaConTemporada(dias: number, kmRecorridos: number, temporada: ITemporada): number {
        const tarifaBase = this.getTarifaBase();
        const tarifaAjustadaTemporada = temporada.ajustar(tarifaBase);
        const tarifaBaseTotal = tarifaAjustadaTemporada * dias;
        const cargosPorKm = this.calcularCargosPorKm(dias, kmRecorridos);
        return tarifaBaseTotal + cargosPorKm;
    }

}