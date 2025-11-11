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

    private kmDesdeUltimoMantenimiento: number
    private fechaUltimoMantenimiento: Date
    private alquileresDesdeUltimoMantenimiento: number

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
        
        // 1º Criterio - Ha superado los 10.000 km desde su último mantenimiento.
        if (this.kmDesdeUltimoMantenimiento > 10000) {
            return true;
        }

        // 2º Criterio - Han pasado 12 meses desde su último mantenimiento. (12 meses = 1 año) => (1 año = 365 dias)
        const milisegundosPorDia = 1000 * 60 * 60 * 24;
        const diasDesdeMantenimiento = (Date.now() - this.fechaUltimoMantenimiento.getTime() / milisegundosPorDia);
        if (diasDesdeMantenimiento > 365) {
            return true;
        }

        // 3º Criterio - Después de cada 5 alquileres completados.
        if (this.alquileresDesdeUltimoMantenimiento >= 5) {
            return true;
        }

        return false;
    }

    public estaDisponible(): boolean { 
        return this.estado.puedeReservar();
    }

    public abstract calcularTarifa(dias: number, kilometrosRecorridos: number): number;

}