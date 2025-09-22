import { EstadoVehiculo } from "./estado_vehiculo";

export default abstract class Vehiculo {
    protected matricula: string;
    protected estado: EstadoVehiculo;
    protected kilometraje: number;
    
    constructor()
    constructor(matricula: string, kilometraje: number )
    constructor(matricula?: string, kilometraje?: number) {
        this.matricula = matricula ?? "";
        this.kilometraje = kilometraje ?? 0;
        this.estado = EstadoVehiculo.DISPONIBLE
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

    public setKilometraje (kilometraje: number): void {
        this.kilometraje = kilometraje;
    }

    public getEstado(): EstadoVehiculo {
        return this.estado;
    }

    public setEstado (estado: EstadoVehiculo): void {
        this.estado = estado;
    }

    // Revisar si valida la disponibilidad del auto o la disponibilidad en las fechas (Reserva).
    public estaDisponible(): boolean {
        return this.estado === EstadoVehiculo.DISPONIBLE;
    }


    public abstract calcularTarifa(dias: number, kmRecorridos: number): number;



}