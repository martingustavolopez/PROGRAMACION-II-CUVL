import Cliente from "./cliente";
import Mantenimiento from "./mantenimiento";
import Reserva from "./reserva";
import Vehiculo from "./Vehiculo/vehiculo";
import EstadoEnMantenimiento from "./EstadoVehiculo/estadoEnMantenimiento";
import ServicioEstadisticas from "../src/Estadistica/servicioEstadisticas";
import { ITemporada } from "./Temporada/iTemporada";

export default class Plataforma {

    private vehiculos: Vehiculo[];
    private reservas: Reserva[];
    private clientes: Cliente[];
    private estadisticas: ServicioEstadisticas;
    private contadorIdReserva: number;

    constructor(){
        this.vehiculos = [];
        this.reservas = [];
        this.clientes = [];
        this.estadisticas = new ServicioEstadisticas(this.vehiculos, this.reservas);
        this.contadorIdReserva = 0;
    }

    // Getters
    public getVehiculos(): Vehiculo[] {
        return [...this.vehiculos];
    }

    public getReservas(): Reserva[] {
        return [...this.reservas];
    }

    public getClientes(): Cliente[] {
        return [...this.clientes];
    }

    public getEstadisticas(): ServicioEstadisticas {
        return this.estadisticas;
    }

    // Gestión de Vehículos
    public agregarVehiculo(vehiculo: Vehiculo): void {
        if(this.buscarVehiculo(vehiculo.getMatricula())) {
            throw new Error(`Ya existe un vehículo con la matrícula ${vehiculo.getMatricula()}`);
        }
        this.vehiculos.push(vehiculo);
    }

    public buscarVehiculo(matricula: string): Vehiculo | null {
        return this.vehiculos.find((v => v.getMatricula() === matricula)) || null;
    }

    public getVehiculosDisponibles(): Vehiculo[] {
        return this.vehiculos.filter((vehiculo => vehiculo.estaDisponible()))
    }

    // Gestión de Clientes
    public agregarCliente(cliente: Cliente): void {
        if(this.buscarCliente(cliente.getId())) {
            throw new Error(`Ya existe un cliente con el id ${cliente.getId()}`);
        }
        this.clientes.push(cliente);
    }

    public buscarCliente(idCliente: number): Cliente | null {
        return this.clientes.find(c => c.getId() === idCliente) || null;
    }
    
    // Gestión de Reservas
    public crearReserva(idCliente: number, matriculaVehiculo: string, fechaInicio: Date, fechaFin: Date, temporada: ITemporada): Reserva {
        const cliente = this.buscarCliente(idCliente);
        if (!cliente) {
            throw new Error(`Cliente con ID ${idCliente} no encontrado`);
        }

        const vehiculo = this.buscarVehiculo(matriculaVehiculo);
        if (!vehiculo) {
            throw new Error(`Vehículo con matrícula ${matriculaVehiculo} no encontrado`);
        }

        if (!this.validarDisponibilidad(vehiculo, fechaInicio, fechaFin)) {
            throw new Error(`Vehículo ${matriculaVehiculo} no disponible para las fechas solicitadas`);
        }

        if (fechaInicio >= fechaFin) {
            throw new Error("La fecha de inicio debe ser anterior a la fecha de fin");
        }

        const idReserva = this.generarIdReserva()

        const reserva = new Reserva(idReserva, cliente, vehiculo, fechaInicio, fechaFin, temporada);
        this.reservas.push(reserva);
        cliente.agregarReserva(reserva);

        vehiculo.reservar();

        return reserva;
    }

    private generarIdReserva(): number {
        this.contadorIdReserva++;
        return this.contadorIdReserva;
    }
    /*private generarIdReserva(): number {
        return this.reservas.length > 0 ? Math.max(...this.reservas.map(r => r.getIdReserva())) + 1 : 1; 
    }*/

    // Gestión de Mantenimiento
    public registrarMantenimiento(matricula: string, mantenimiento: Mantenimiento): boolean {
        const vehiculo = this.buscarVehiculo(matricula);
        if (!vehiculo) {
            return false;
        }

        vehiculo.agregarMantenimiento(mantenimiento);
        vehiculo.setEstado(new EstadoEnMantenimiento());
        return true;
    }

    // Validación de Disponibilidad
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

    // Estadísticas
    public getVehiculoMasAlquilado(fechaInicio: Date, fechaFin: Date): Vehiculo {
        return this.estadisticas.vehiculoMasAlquilado(fechaInicio, fechaFin);
    }

    public getVehiculoMenosAlquilado(fechaInicio: Date, fechaFin: Date): Vehiculo {
        return this.estadisticas.vehiculoMenosAlquilado(fechaInicio, fechaFin);
    }

    public getVehiculoMasRentable(): Vehiculo {
        return this.estadisticas.vehiculoMasRentable();
    }

    public getVehiculoMenosRentable(): Vehiculo {
        return this.estadisticas.vehiculoMenosRentable();
    }

    public getPorcentajeOcupacionFlota(): number {
        return this.estadisticas.porcentajeDeOcupacionFlota();
    }

    // Testear esto...
    public setEstadisticas(estadisticas: ServicioEstadisticas): void {
        this.estadisticas = estadisticas;
    }

}