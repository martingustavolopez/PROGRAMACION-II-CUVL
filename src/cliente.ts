import Reserva from "./reserva";

/**
 * Clase que representa un cliente en el sistema de alquiler.
 * Se implementa en él las caracterísiticas básicas del cliente, y el historial de reservas propio del cliente.
 */
export default class Cliente {

    private idCliente: number;
    private nombre: string;
    private reservas: Reserva[];
    
    /**
     * Constructor de la clase cliente.
     * Puede ser llamado sin o con parámetros, cómo nombre y id.
     * @param nombre - Nombre del cliente (opcional).
     * @param kilometraje - Id del cliente (opcional).
     */
    constructor()
    constructor(nombre: string, id: number)
    constructor(nombre?: string, id?: number) {
        this.nombre = nombre ?? "";
        this.idCliente = id ?? 0;
        this.reservas = [];
    }

    /**
     * Se obtiene el nombre del cliente
     * @returns {string} El nombre del cliente
     */
    public getNombre(): string {
        return this.nombre;
    }

    /**
     * Se obtiene el id del cliente
     * @returns {number} El id del cliente.
     */
    public getId(): number {
        return this.idCliente;
    }

    /**
     * Se obtiene las reservas del cliente (historial)
     * @returns {Reserva[]} - Copia
     */
    public getReservas(): Reserva[] {
        return [...this.reservas];
    }

    /**
     * Setear el nombre del cliente
     * @param nombre 
     */
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    /**
     * Setearl id del cliente
     * @param id 
     */
    public setId(id: number): void {
        this.idCliente = id;
    }

    /**
     * Agregar la reserva al cliente.
     * @param reserva 
     */
    public agregarReserva(reserva: Reserva): void {
        this.reservas.push(reserva);
    }
    
}