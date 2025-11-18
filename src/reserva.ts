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
    private finalizada: boolean;

    constructor(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date, estrategiaTemporada: ITemporada) {
        this.idReserva = "";
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaDeInicio = fechaInicio;
        this.fechaDeFin = fechaFin;
        this.kilometrosRecorridos = 0;
        this.temporada = estrategiaTemporada;
        this.finalizada = false;
    }

    // GETTERS
    public getIdReserva(): string {
        return this.idReserva;        
    }

    public getCliente(): Cliente {
        return this.cliente;
    }

    public getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    public getFechaDeInicio(): Date{
        return this.fechaDeInicio;
    }

    public getFechaDeFin(): Date {
        return this.fechaDeFin;
    }
    
    public getKilometrosRecorridos(): number {
        return this.kilometrosRecorridos;
    }

    public getEstrategiaTemporada(): ITemporada {
        return this.temporada;
    }
    
    public estaFinalizada(): boolean {
        return this.finalizada;
    }

    // SETTER
    /**
     * Setea el id de la reserva.
     * @param value => id
     */
    public setIdReserva(id: string): void {
        this.idReserva = id;
    }
    
    /**
     * Calcula la cantidad de días de la reserva.
     * @returns devuelve cantidad de días.
    */
    public calcularDias(): number {
       const milisegundosPorDia = 1000 * 60 * 60 * 24;
       const diferenciaMiliSegundos = this.fechaDeFin.getTime()- this.fechaDeInicio.getTime();
       return Math.ceil(diferenciaMiliSegundos / milisegundosPorDia);
    }
    
    /**
     * Registra los kilometros recorridos al finalizar el alquiler.
     * @param km => kilometros recorridos
     */
    public setKilometrosRecorridos(km: number): void {
        if (this.finalizada) {
            throw new Error("No se puede modificar el kilometraje de una reserva finalizada");
        }
        this.kilometrosRecorridos = km;
    }
    
    /**
     * Calcula el costo total de la reserva.
     * @returns devuelve el costo total de la reserva
     */
    public calcularCostoTotal(): number {
        if (this.kilometrosRecorridos === 0) {
            throw new Error("Debe registrar el kilometraje antes de calcular el costo");
        }
        const dias = this.calcularDias();
        const kmRecorridos = this.getKilometrosRecorridos();

        return this.vehiculo.calcularTarifaConTemporada(dias, kmRecorridos, this.temporada);
    }
    
    /**
     * Finaliza la reserva y el vehiculo recibe los kilometros recorridos en el método devolver y cambia el estado.
    */
    public finalizarReserva(): void {
        if (this.finalizada) {
            throw new Error("La reserva está finalizada.");
        }
        if (this.kilometrosRecorridos === 0) {
            throw new Error("Debe registrar el kilometraje antes de finalizar la reserva");
        }
        
        this.vehiculo.devolver(this.kilometrosRecorridos);
        this.finalizada = true;
    }
    
}