import Reserva from "./reserva";

export default class Cliente {

    private idCliente: number;
    private nombre: string;
    private reservas: Reserva[];

    constructor()
    constructor(nombre: string, id: number)
    constructor(nombre?: string, id?: number) {
        this.nombre = nombre ?? "";
        this.idCliente = id ?? 0;
        this.reservas = [];
    }

    /**
     * Obtener el nombre del cliente
     * @returns nombre
     */
    public getNombre(): string {
        return this.nombre;
    }

    /**
     * Obtener el id del cliente
     * @returns id
     */
    public getId(): number {
        return this.idCliente;
    }

    /**
     * Obtener las reservas del cliente (historial)
     * @returns 
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