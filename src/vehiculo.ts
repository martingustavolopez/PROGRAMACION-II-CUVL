import { EstadoVehiculo } from "./estado_vehiculo";
import { IEstadoVehiculo } from "./EstadoVehiculo/iestadoVehiculo";
import Mantenimiento from "./mantenimiento";

export default abstract class Vehiculo {

    protected matricula: string;
    // protected estado: EstadoVehiculo;
    protected estado: IEstadoVehiculo;
    protected kilometraje: number;
    protected tarifaBase: number;
    protected mantenimientos: Mantenimiento[];

    constructor()
    constructor(matricula: string, kilometraje: number, tarifaBase: number)
    constructor(matricula?: string, kilometraje?: number, tarifaBase?: number) {
        this.matricula = matricula ?? "";
        // this.estado = EstadoVehiculo.DISPONIBLE;
        this.estado = undefined as unknown as IEstadoVehiculo;
        this.kilometraje = kilometraje ?? 0;
        this.tarifaBase = tarifaBase ?? 0;
        this.mantenimientos = [];
    }

    // Getters
    public getMatricula(): string {
        return this.matricula;
    }

    public getEstado(): IEstadoVehiculo {
        return this.estado;
    }

    public getKilometraje(): number {
        return this.kilometraje;
    }

    public getMantenimientos(): Mantenimiento[] {
        return [...this.mantenimientos];
    }

    public getTarifaBase(): number {
        return this.tarifaBase;
    }

    // Setters
    public setMatricula(matricula: string): void {
        this.matricula = matricula;
    }

    public setEstado(estadoNuevo: IEstadoVehiculo): void {
        this.estado = estadoNuevo;
    }

    public setKilometraje(kilometraje: number): void {
        if (kilometraje < this.kilometraje) {
            throw new Error("El kilometraje no puede ser menor al actual.");
        }
        this.kilometraje = kilometraje;
    }

    // Lógica
    public agregarMantenimiento(mantenimiento: Mantenimiento): void {
        this.mantenimientos.push(mantenimiento);
    }

    // Disparadores de Mantenimiento
    public necesitaMantenimiento(): boolean {
        // Un vehicuo debe pasar a estado "En Mantenimiento" y ser inhabilitado para nuevas reservas automáticamente bajo cualquiera de las siguientes condiciones
        
        // 1º Criterio
        if (this.kmDesde) 
    }

    public estaDisponible(): boolean { 
        return this.estado.puedeReservar();
    }

    public abstract calcularTarifa(dias: number, kilometrosRecorridos: number): number;

}