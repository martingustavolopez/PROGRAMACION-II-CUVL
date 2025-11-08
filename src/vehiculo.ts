import { EstadoVehiculo } from "./estado_vehiculo";
import Mantenimiento from "./mantenimiento";

export default abstract class Vehiculo {

    protected matricula: string;
    protected estado: EstadoVehiculo;
    protected kilometraje: number;
    protected tarifaBase: number;
    protected mantenimientos: Mantenimiento[];

    constructor()
    constructor(matricula: string, kilometraje: number, tarifaBase: number)
    constructor(matricula?: string, kilometraje?: number, tarifaBase?: number) {
        this.matricula = matricula ?? "";
        this.estado = EstadoVehiculo.DISPONIBLE;
        this.kilometraje = kilometraje ?? 0;
        this.tarifaBase = tarifaBase ?? 0;
        this.mantenimientos = [];
    }

    // Getters
    public getMatricula(): string {
        return this.matricula;
    }

    public getEstado(): EstadoVehiculo {
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

    public setEstado(estadoNuevo: EstadoVehiculo): void {
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

    public estaDisponible(): boolean {
        return this.estado === EstadoVehiculo.DISPONIBLE;
    }

    public abstract calcularTarifa(dias: number, kilometrosRecorridos: number): number;

}