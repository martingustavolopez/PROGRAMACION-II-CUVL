import Cliente from "./cliente";
import Mantenimiento from "./mantenimiento";
import Reserva from "./reserva";
import Vehiculo from "./vehiculo";
import { EstadoVehiculo } from "./estado_vehiculo";

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

    public agregarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    public buscarVehiculo(matricula: string): Vehiculo | null {
        return this.vehiculos.find((vehiculo => vehiculo.getMatricula() === matricula)) || null;
    }

    public getVehiculosDisponibles(): Vehiculo[] {
        return this.vehiculos.filter((vehiculo => vehiculo.estaDisponible()))
    }

    public registrarMantenimiento (matricula: string, mantenimiento: Mantenimiento): boolean {
        const vehiculo = this.buscarVehiculo(matricula);
        if (!vehiculo) {
            return false;
        }

        vehiculo.agregarMantenimiento(mantenimiento);
        vehiculo.setEstado(EstadoVehiculo.EN_MANTENIMIENTO);
        return true;
    }

    private validarDisponibilidad(vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date): boolean {
        if(!vehiculo.estaDisponible()) {
            return false;
        }

        const reservasVehiculo = this.reservas.filter(r => 
            r.getVehiculo().getMatricula() === vehiculo.getMatricula()
        );

        for (const reserva of reservasVehiculo) {
            const inicioReserva = reserva.getFechaDeInicio();
            const finReserva = reserva.getFechaDeFin();

            if ((fechaInicio >= inicioReserva && fechaInicio <= finReserva) ||
                (fechaFin >= inicioReserva && fechaFin <= finReserva) ||
                (fechaInicio <= inicioReserva && fechaFin >= finReserva)) {
                return false;
            }
        }

        return true;
    }

}









}