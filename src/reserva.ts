import Cliente from "./cliente";
import { ITemporada } from "./Temporada/iTemporada";
import TemporadaAlta from "./Temporada/temporadaAlta";
import TemporadaBaja from "./Temporada/temporadaBaja";
import TemporadaMedia from "./Temporada/temporadaMedia";
import Vehiculo from "../src/Vehiculo/vehiculo";

export default class Reserva {

    private idReserva: string;
    private cliente: Cliente;
    private vehiculo: Vehiculo;
    private fechaDeInicio: Date
    private fechaDeFin: Date
    private kilometrosRecorridos: number;
    private temporada: ITemporada;
    
    private finalizada: boolean; // Ver bien esto

    constructor(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date) {
        this.idReserva = "";
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaDeInicio = fechaInicio;
        this.fechaDeFin = fechaFin;
        this.kilometrosRecorridos = 0;
        this.temporada = undefined as unknown as ITemporada;

        this.finalizada = false;
    }

    public setIdReserva(value: string): void {
        this.idReserva = value;
    }

    public getIdReserva(): string {
        return this.idReserva;        
    }

    public setCliente(value: Cliente): void {
        this.cliente = value;
    }

    public getCliente(): Cliente {
        return this.cliente;
    }

    public setVehiculo(value: Vehiculo): void {
        this.vehiculo = value;
    }

    public getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    public setFechaDeInicio(value: Date){
        this.fechaDeInicio = value;
    }

    public getFechaDeInicio(): Date{
        return this.fechaDeInicio;
    }

    public setFechaDeFin(value: Date): void {
        this.fechaDeFin = value;
    }

    public getFechaDeFin(): Date {
        return this.fechaDeFin;
    }

    public setKilometrosRecorridos(value: number): void {
        this.kilometrosRecorridos = value;
    }

    public getKilometrosRecorridos(): number {
        return this.kilometrosRecorridos;
    }

    
    public calcularDias(): number{
        const diferencia = this.getFechaDeFin().getTime() - this.getFechaDeInicio().getTime();
        return diferencia / (1000 * 60 * 60 * 24)
    }
    
    public calcularDiasAlternativa(): number {
        const milisegundosPorDia = 1000 * 60 * 60 * 24;
        const diferenciaMiliSegundos = this.fechaDeFin.getTime()- this.fechaDeInicio.getTime();
        return Math.ceil(diferenciaMiliSegundos / milisegundosPorDia);
    }
    
    
    
    
    // Lógica
    /*public obtenerTemporada(fechaInicio: Date): ITemporada {
        const mes = fechaInicio.getMonth() + 1; // por que empieza desde el 0.

        if (mes === 1 || mes === 2 || mes === 12) {
            return new TemporadaAlta();
        }

        if (mes >= 6 && mes <= 8) {
            return new TemporadaMedia();
        }

        return new TemporadaBaja();
    }*/

    public setEstrategiaTarifa(estrategia: ITemporada): void {
        this.temporada = estrategia;
    }
    
    public calcularCostoTotal(): number {
        if (this.kilometrosRecorridos === 0) {
            throw new Error("Debe registrar el kilometraje antes de calcular el costo");
        }
        const dias = this.calcularDias();
        const kmRecorridos = this.getKilometrosRecorridos();

        return this.vehiculo.calcularTarifaConTemporada(dias, kmRecorridos, this.temporada);
    }

    public getFinalizada(): boolean {
        return this.finalizada;
    }

    public finalizarReserva(): void {
        if (this.finalizada) {
            throw new Error("La reserva está finalizada.");
        }
        if (this.kilometrosRecorridos <= 0) {
            throw new Error("El kilometraje no puede ser negativo o cero");
        }
        
        this.vehiculo.devolver(this.kilometrosRecorridos);
        this.finalizada = true;
    }



}