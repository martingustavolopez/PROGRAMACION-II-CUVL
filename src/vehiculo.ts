import { EstadoVehiculo } from "./estado_vehiculo";
import Mantenimiento from "./mantenimiento";

export default abstract class Vehiculo {

    // private marca: string;
    // private modelo: string;
    // private anio: number;
    private matricula: string;
    private estado: EstadoVehiculo;
    private kilometrajeActual: number;
    private mantenimientos: Mantenimiento[];
    protected tarifaBase: number; // Porque no ponerlo acá si todas las clases hijas lo requieren...?
   
    //constructor()
    //constructor(matricula: string, kilometrajeActual: number )
    //constructor(matricula?: string, kilometrajeActual?: number) {
    constructor(matricula: string, tarifaBase: number) {
        this.matricula = matricula ?? "";
        this.kilometrajeActual = 0;
        //this.kilometrajeActual = kilometrajeActual ?? 0;
        this.estado = EstadoVehiculo.DISPONIBLE
        this.mantenimientos = [];
        this.tarifaBase = tarifaBase;
    }

    public getMatricula(): string{
        return this.matricula;
    }

    public setMatricula(matricula: string): void {
        this.matricula = matricula;
    }

    public getKilometrajeActual():number {
        return this.kilometrajeActual;
    }

    public getEstado(): EstadoVehiculo {
        return this.estado;
    }

    public cambiarEstado (estado: EstadoVehiculo): void {
        this.estado = estado;
    }

    public obtenerTarifaBase(): number {
        return this.tarifaBase;
    }

    /**
     * 
     * @returns EstadoVehiculo en DISPONIBLE
     */
    public estaDisponible(): boolean {
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
        if (km < this.kilometrajeActual) {
            throw new Error("El kilometraje no puede ser menor al actual.");
        }
        this.kilometrajeActual = km;
    }

    /**
     * Agrega un mantenimiento al vehículo.
     * @param mantenimiento 
     */
    public agregarMantenimiento(mantenimiento: Mantenimiento): void {
        this.mantenimientos.push(mantenimiento)
        this.cambiarEstado(EstadoVehiculo.EN_MANTENIMIENTO);
    }

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
}