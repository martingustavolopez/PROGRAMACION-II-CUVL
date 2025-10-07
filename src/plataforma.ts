import Cliente from "./cliente";
import Reserva from "./reserva";
import Vehiculo from "./vehiculo";

export default class Plataforma {

    private vehiculos: Vehiculo[];
    private reservas: Reserva[];
    private clientes: Cliente[];


    constructor(){
        this.vehiculos = [];
        this.reservas = [];
        this.clientes = [];
    }

    public getVehiculos(): Vehiculo[] {
        return this.vehiculos
    }

    public getReservas(): Reserva[] {
        return this.reservas;
    }

    public getClientes(): Cliente[] {
        return this.clientes;
    }

    public agregarVehiculo(vehiculo: Vehiculo): void {
        this.vehiculos.push(vehiculo);
    }

    public registrarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    private validarDisponibilidad(vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date): boolean {
        return false;
    }






}