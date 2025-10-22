import { EstadoVehiculo } from "./estado_vehiculo";
import Mantenimiento from "./mantenimiento";

export default abstract class Vehiculo {

    protected matricula: string;
    protected estado: EstadoVehiculo;
    protected kilometraje: number;
    protected mantenimientos: Mantenimiento[];

    constructor()
    constructor(matricula: string, kilometraje: number)
    constructor(matricula?: string, kilometraje?: number) {
        this.matricula = matricula ?? "";
        this.estado = EstadoVehiculo.DISPONIBLE;
        this.kilometraje = kilometraje ?? 0;
        this.mantenimientos = [];
    }

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

    public setMatricula(matricula: string): void {
        this.matricula = matricula;
    }

    public setEstado(estado: EstadoVehiculo): void {
        this.estado = estado;
    }

    public setKilometraje(kilometraje: number): void {
        this.kilometraje = kilometraje;
    }

    public agregarMantenimiento(mantenimiento: Mantenimiento): void {
        this.mantenimientos.push(mantenimiento);
    }

    public estaDisponible(): boolean {
        return this.estado === EstadoVehiculo.DISPONIBLE;
    }

    public abstract calcularTarifa(dias: number, kilometrosRecorridos: number): number;

}