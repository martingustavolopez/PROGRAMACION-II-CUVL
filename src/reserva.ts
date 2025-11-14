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
    private costoTotal: number
    private temporada: ITemporada;

    constructor(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date) {
        this.idReserva = "";
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaDeInicio = fechaInicio;
        this.fechaDeFin = fechaFin;
        this.kilometrosRecorridos = 0;
        this.costoTotal = 0;
        this.temporada = undefined as unknown as ITemporada;
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

    public setCostoTotal(value: number){
        this.costoTotal = value;
    }

    public getCostoTotal(){
        return this.costoTotal;
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
        const dias = this.calcularDias();
        const kmRecorridos = this.getKilometrosRecorridos();

        return this.vehiculo.calcularTarifaConTemporada(dias, kmRecorridos, this.temporada);
    }

}