import { EstadoVehiculo } from "./estado_vehiculo";
import Mantenimiento from "./mantenimiento";

export default abstract class Vehiculo {

    // private marca: string;
    // private modelo: string;
    // private anio: number;
    private matricula: string;
    private estado: EstadoVehiculo;
    private kilometraje: number;
    private mantenimientos: Mantenimiento[];
   
    constructor()
    constructor(matricula: string, kilometraje: number )
    constructor(matricula?: string, kilometraje?: number) {
        this.matricula = matricula ?? "";
        this.kilometraje = kilometraje ?? 0;
        this.estado = EstadoVehiculo.DISPONIBLE
        this.mantenimientos = [];
    }

    public getMatricula(): string{
        return this.matricula;
    }

    public setMatricula(matricula: string): void {
        this.matricula = matricula;
    }

    public getKilometraje():number {
        return this.kilometraje;
    }

    public getEstado(): EstadoVehiculo {
        return this.estado;
    }

    public cambiarEstado (estado: EstadoVehiculo): void {
        this.estado = estado;
    }

    /**
     * Verifica si el vehículo está disponible para las fechas solicitadas
     * @param fechaInicio
     * @param fechaFin
     * @returns true si está disponible
     */
    public estaDisponible(fechaInicio: Date, fechaFin: Date): boolean {
        return this.estado === EstadoVehiculo.DISPONIBLE;
    }

    /**
     * Método abstracto que devuelve un número, calculando la tarifa dependiendo los dias y los km recorridos.
     * La implementación del mismo para cada subclase es distinta.
     * @param dias 
     * @param kmRecorridos 
     */
    public abstract calcularTarifa(dias: number, kmRecorridos: number): number;

    /**
     * Método para actualizar el kilometraje del Vehiculo  
     * @param km teniendo en cuenta que el parametro recibido (km) no puede ser menor al km actual.
     */
    public registrarKilometraje(km: number): void {
        if (km < this.kilometraje) {
            throw new Error("El kilometraje no puede retroceder.");
        }
        this.kilometraje = km;
    }


    // Dejarlo por ahora en Vehiculo... VER DESP.
    // Es RESPONSABILIDAD del Vehículo manipular el Mantenimiento...???
    // Enunciado:
    // Mantenimiento de Vehículos: El sistema debe poder registrar el costo y la fecha de los mantenimientos de cada vehículo.

    /**
     * Agrega un mantenimiento al historial del vehículo.
     * @param mantenimiento 
     */
    public agregarMantenimiento(mantenimiento: Mantenimiento): void {
        this.mantenimientos.push(mantenimiento)
        this.cambiarEstado(EstadoVehiculo.EN_MANTENIMIENTO);
    }

    /**
     * Obtiene el historial completo de mantenimientos.
     * @returns 
     */
    public getMantenimientos(): Mantenimiento[] {
        return [...this.mantenimientos];
    }

    /**
     * Costo total de todos los mantenimientos realizados.
     * @returns suma de los costos de mantenimiento.
     */
    public obtenerCostoTotalMantenimientos(): number {
        return this.mantenimientos.reduce(
            (total, mantenimiento) => total + mantenimiento.getCosto(), 0
        );
    }
    // Método .reduce() --> ejecuta una función reductora sobre c/u de los elem del array
    // Devuelve como resultado un único valor.

    /*
    Uso del método .reduce()
        const array1 = [1, 2, 3, 4];
        // 0 + 1 + 2 + 3 + 4
        const valorInicial = 0;
        const sumatoria = array1.reduce(
          (acumulador, valorActual) => acumulador + valorActual,
          valorInicial,
        );
        return sumatoria; // => valor esperado = 10
    */
}