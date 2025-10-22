import Reserva from "./reserva";

export default class Cliente {
    private nombre: string;
    private id: number;
    private reservas: Reserva[];

    constructor()
    constructor(nombre: string, id: number)
    constructor(nombre?: string, id?: number) {
        this.nombre = nombre ?? "";
        this.id = id ?? 0;
        this.reservas = [];
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getid(): number {
        return this.id;
    }

    public getReservas(): Reserva[] {
        return [...this.reservas];
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setEid(id: number): void {
        this.id = id;
    }

    public agregarReserva(reserva: Reserva): void {
        this.reservas.push(reserva);
    }
}