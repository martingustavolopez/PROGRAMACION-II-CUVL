import { EstadoVehiculo } from "./estado_vehiculo";

export default abstract class Vehiculo {

    private matricula: string;
    private estado: EstadoVehiculo;
    private kilometrajeActual: number;
    private mantenimientos: Mantenimiento[];
    protected tarifaBase: number;
   
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

    public setKilometraje (kilometraje: number): void {
        this.kilometraje = kilometraje;
    }

    public getEstado(): EstadoVehiculo {
        return this.estado;
    }

    public setEstado (estado: EstadoVehiculo): void {
        this.estado = estado;
    }

    public obtenerTarifaBase(): number {
        return this.tarifaBase;
    }

    public estaDisponible(): boolean {
        return this.estado === EstadoVehiculo.DISPONIBLE;
    }

  
    public abstract calcularTarifa(dias: number, kmRecorridos: number): number;

   
    public registrarKilometraje(km: number): void {
        if (km < this.kilometrajeActual) {
            throw new Error("El kilometraje no puede ser menor al actual.");
        }
        this.kilometrajeActual = km;
    }

    public agregarMantenimiento(mantenimiento: Mantenimiento): void {
        this.mantenimientos.push(mantenimiento)
        this.cambiarEstado(EstadoVehiculo.EN_MANTENIMIENTO);
    }

    public getMantenimientos(): Mantenimiento[] {
        return [...this.mantenimientos];
    }

}