import { EstadoVehiculo } from "./estado_vehiculo";
import { IEstadoVehiculo } from "./EstadoVehiculo/iestadoVehiculo";
import Mantenimiento from "./mantenimiento";

export default abstract class Vehiculo {

    protected matricula: string;
    protected estado: IEstadoVehiculo;
    protected kilometraje: number;
    protected mantenimientos: Mantenimiento[];

    private kmDesdeUltimoMantenimiento: number
    private fechaUltimoMantenimiento: Date
    private alquileresDesdeUltimoMantenimiento: number

    constructor()
    constructor(matricula: string, kilometraje: number)
    constructor(matricula?: string, kilometraje?: number) {
        this.matricula = matricula ?? "";
        this.estado = undefined as unknown as IEstadoVehiculo;
        this.kilometraje = kilometraje ?? 0;
        this.mantenimientos = [];

        this.kmDesdeUltimoMantenimiento = 0
        this.fechaUltimoMantenimiento = undefined as unknown as Date;
        this.alquileresDesdeUltimoMantenimiento = 0;
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

    public getKmDesdeUltimoMantenimiento(): number {
        return this.kmDesdeUltimoMantenimiento;
    }

    public getFechaUltimoMantenimiento(): Date {
        return this.fechaUltimoMantenimiento;
    }

    public getAlquileresDesdeUltimoMantenimiento(): number {
        return this.alquileresDesdeUltimoMantenimiento;
    }

    // Setters
    public setMatricula(matricula: string): void {
        this.matricula = matricula;
    }

    public setKilometraje(kilometraje: number): void {
        if (kilometraje < this.kilometraje) {
            throw new Error("El kilometraje no puede ser menor al actual.");
        }
        this.kilometraje = kilometraje;
    }

    // Mantenimiento
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

    public resetearContadoresMantenimiento(): void {
        this.kmDesdeUltimoMantenimiento = 0;
        this.fechaUltimoMantenimiento = new Date();
        this.alquileresDesdeUltimoMantenimiento = 0;
    }

    // Patrón State
    public reservar(): void {
        this.estado.reservar(this);
    }

    public devolver(kilometros: number): void {
        if (kilometros < 0) {
            throw new Error("El kilometraje no puede ser negativo");
        }
        this.kilometraje += kilometros; // Sumar kilómetros al kilometraje total del vehiculo
        this.kmDesdeUltimoMantenimiento += kilometros;
        this.alquileresDesdeUltimoMantenimiento++;
        this.estado.devolver(this);
    }

    public setEstado(estadoNuevo: IEstadoVehiculo): void {
        this.estado = estadoNuevo;
    }

    public estaDisponible(): boolean { 
        return this.estado.puedeReservar();
    }

    public abstract getTarifaBase(): number;

    protected abstract calcularCargosPorKm(dias: number, km: number): number;

    public calcularTarifaBase(dias: number, kmRecorridos: number, tarifaAjustada: number): number {
        const tarifaBaseTotal = tarifaAjustada * dias;
        const cargosPorKm = this.calcularCargosPorKm(dias, kmRecorridos);
        return tarifaBaseTotal + cargosPorKm;
    }

}