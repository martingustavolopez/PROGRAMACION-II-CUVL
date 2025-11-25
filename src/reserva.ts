import Cliente from "./cliente";
import { ITemporada } from "./Temporada/iTemporada";
import Vehiculo from "../src/Vehiculo/vehiculo";

/**
 * Clase que representa una reserva creada por el cliente sobre un vehículo en específico, incluye fechas, kilómetros recorridos, temporada, y estado de finalización.
 */
export default class Reserva {

    private idReserva: number;
    private cliente: Cliente;
    private vehiculo: Vehiculo;
    private fechaDeInicio: Date
    private fechaDeFin: Date
    private kilometrosRecorridos: number;
    private temporada: ITemporada;
    private finalizada: boolean;

    /**
     * Constructor de la clase reserva.
     * @param idReserva - Id de la reserva.
     * @param cliente - Cliente que realiza la reserva.
     * @param vehiculo - Vehículo reservado.
     * @param fechaInicio - Fecha de inicio de la reserva.
     * @param fechaFin - Fecha de fin de la reserva.
     * @param temporada - Temporada que afecta el cálculo del costo.
     */
    constructor(idReserva: number, cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date, temporada: ITemporada) {
        this.idReserva = idReserva;
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaDeInicio = fechaInicio;
        this.fechaDeFin = fechaFin;
        this.kilometrosRecorridos = 0;
        this.temporada = temporada;
        this.finalizada = false;
    }

    // GETTERS
    /**
     * Se obtiene el id de la reserva.
     * @returns {number} Id de la reserva.
     */
    public getIdReserva(): number {
        return this.idReserva;        
    }

    /**
     * Se obtiene el cliente que realiza la reserva.
     * @returns {Cliente} Cliente que realizó la reserva.
     */
    public getCliente(): Cliente {
        return this.cliente;
    }

    /**
     * Se obtiene el vehículo reservado.
     * @returns {Vehiculo} Vehículo reservado.
     */
    public getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    /**
     * Se obtiene la fecha de inicio de la reserva.
     * @returns {Date} Fecha de inicio de la reserva.
     */
    public getFechaDeInicio(): Date{
        return this.fechaDeInicio;
    }

    /**
     * Se obtiene la fecha de inicio de la reserva.
     * @returns {Date} Fecha de fin de la reserva.
     */
    public getFechaDeFin(): Date {
        return this.fechaDeFin;
    }
    
    /**
     * Se obtiene la cantidad de kilómetros recorridos durante la reserva.
     * @returns {number} Kilómetros recorridos.
     */
    public getKilometrosRecorridos(): number {
        return this.kilometrosRecorridos;
    }

    /**
     * Se obtiene la temporada asociada a la reserva.
     * @returns {ITemporada} Temporada aplicada al cálculo de costo. 
     */
    public getEstrategiaTemporada(): ITemporada {
        return this.temporada;
    }
    
    /**
     * Se verifica si la reserva está finalizada.
     * @returns {true} - Si la reserva está finalizada.
     * @returns {false} - Si la reserva no está finalizada.
     */
    public estaFinalizada(): boolean {
        return this.finalizada;
    }
    
    /**
     * Calcula la cantidad de días de la reserva dependiendo la fecha de inicio y la fecha de fin.
     * @returns {number} La cantidad de días.
    */
    public calcularDias(): number {
       const milisegundosPorDia = 1000 * 60 * 60 * 24;
       const diferenciaMiliSegundos = this.fechaDeFin.getTime()- this.fechaDeInicio.getTime();
       return Math.ceil(diferenciaMiliSegundos / milisegundosPorDia);
    }
    
    /**
     * Registra los kilometros recorridos al finalizar el alquiler.
     * @param km - Kilómetros recorridos
     * @throws {Error} Si los kilómetros son menores o iguales a cero.
     * @throws {Error} Si la reserva está finalizada.
     */
    public setKilometrosRecorridos(km: number): void {
        if (km <= 0) {
            throw new Error("Los kilometros recorridos deben ser mayores a cero");
        }
        if (this.finalizada) {
            throw new Error("No se puede modificar el kilometraje de una reserva finalizada");
        }
        this.kilometrosRecorridos = km;
    }
    
    /**
     * Calcula el costo total de la reserva.
     * El cálculo se hace en base a los días transcurridos y los kilómetros recorridos, y gracias a estos se hace el calculo de tarifa teniendo en cuenta la temporda.
     * @throws {Error} - Se debe registrar el kilometraje antes de calcular el costo.
     * @returns {number} Costo total de la reserva
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
     * Se finaliza la reserva y el vehiculo recibe los kilometros recorridos en el método devolver y cambia el estado.
     * Se va a finalizar la reserva por dos condiciones:
     * - Si la reserva no está finalizada.
     * - Si los kilómetros recorridos están registrados antes de finalizar.
     * @throws {Error} - Si la reserva está finalizada
     * @throws {Error} - Se deben registrar los kilómetros recorridos antes de finalizar la reserva.
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