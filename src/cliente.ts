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

    public getNombre(): string {
        return this.nombre;
    }

    public getId(): number {
        return this.idCliente;
    }

    public getReservas(): Reserva[] {
        return [...this.reservas];
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setId(id: number): void {
        this.idCliente = id;
    }

    public agregarReserva(reserva: Reserva): void {
        this.reservas.push(reserva);
    }
    
}