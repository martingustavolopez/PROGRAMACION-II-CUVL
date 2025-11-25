import Cliente from "./cliente";
import Mantenimiento from "./mantenimiento";
import Reserva from "./reserva";
import Vehiculo from "./Vehiculo/vehiculo";
import EstadoEnMantenimiento from "./EstadoVehiculo/estadoEnMantenimiento";
import ServicioEstadisticas from "../src/Estadistica/servicioEstadisticas";
import { ITemporada } from "./Temporada/iTemporada";

/**
 * Clase encargada del sistema de alquiler sobre los vehículos, reservas y clientes de la Plataforma.
 */
export default class Plataforma {

    private vehiculos: Vehiculo[];
    private reservas: Reserva[];
    private clientes: Cliente[];
    private estadisticas: ServicioEstadisticas;
    private contadorIdReserva: number;

    /**
     * Constructor de la clase Plataforma.
     * Inicializa listas de vehículos, reservas y clientes, así como el servicio de estadísticas.
     * Y un contador interno de reservas que incrementa por cada reserva.
     */
    constructor(){
        this.vehiculos = [];
        this.reservas = [];
        this.clientes = [];
        this.estadisticas = new ServicioEstadisticas(this.vehiculos, this.reservas);
        this.contadorIdReserva = 0;
    }

    // Getters
    /**
     * Se obtiene la lista de vehículos registrados en la plataforma.
     * @returns {Vehiculo[]} Copia del array de vehículos para evitar modificaciones.
     */
    public getVehiculos(): Vehiculo[] {
        return [...this.vehiculos];
    }

    /**
     * Se obtiene la lista de reservas registradas en la plataforma.
     * @returns {Reserva[]} Copia del array de reservas para evitar modificaciones.
     */
    public getReservas(): Reserva[] {
        return [...this.reservas];
    }

    /**
     * Se obtiene la lista de clientes registrados en la plataforma.
     * @returns {Cliente[]} Copia del array de clientes para evitar modificaciones.
     */
    public getClientes(): Cliente[] {
        return [...this.clientes];
    }

    /**
     * Se obtiene el servicio de estadísticas asociado a la plataforma.
     * @returns {ServicioEstadisticas} Servicio de estadísticas.
     */
    public getEstadisticas(): ServicioEstadisticas {
        return this.estadisticas;
    }

    // Gestión de Vehículos
    /**
     * Se agrega un nuevo vehículo al sistema.
     * Antes de agregarlo se verifica que no exista otro vehículo con la misma matrícula.
     * @param vehiculo - Vehículo a agregar.
     * @throws {Error} Si ya existe un vehículo con la misma matrícula.
     */
    public agregarVehiculo(vehiculo: Vehiculo): void {
        if(this.buscarVehiculo(vehiculo.getMatricula())) {
            throw new Error(`Ya existe un vehículo con la matrícula ${vehiculo.getMatricula()}`);
        }
        this.vehiculos.push(vehiculo);
    }

    /**
     * Se busca un vehículo mediante su matrícula.
     * @param matricula - Matrícula del vehículo a buscar.
     * @returns {Vehiculo} El vehículo encontrado o null si no existe.
     * @returns {null} Null si no existe.
     */
    public buscarVehiculo(matricula: string): Vehiculo | null {
        return this.vehiculos.find((v => v.getMatricula() === matricula)) || null;
    }

    /**
     * Se obtiene todos los vehículos que se encuentran disponibles.
     * @returns {Vehiculo[]} Lista de vehículos disponibles.
     */
    public getVehiculosDisponibles(): Vehiculo[] {
        return this.vehiculos.filter((vehiculo => vehiculo.estaDisponible()))
    }

    // Gestión de Clientes
    /**
     * Se agrega un nuevo cliente al sistema.
     * Antes de agregarlo se verifica que no exista otro cliente con el mismo id.
     * @param cliente - Cliente a agregar.
     * @throws {Error} Si ya existe un cliente con el mismo id.
     */
    public agregarCliente(cliente: Cliente): void {
        if(this.buscarCliente(cliente.getId())) {
            throw new Error(`Ya existe un cliente con el id ${cliente.getId()}`);
        }
        this.clientes.push(cliente);
    }

    /**
     * Se busca un cliente mediante su id.
     * @param idCliente - Id del cliente a buscar.
     * @returns {Cliente} El cliente encontrado.
     * @returns {null} Null si no existe.
     */
    public buscarCliente(idCliente: number): Cliente | null {
        return this.clientes.find(c => c.getId() === idCliente) || null;
    }
    
    // Gestión de Reservas
    /**
     * Se crea una nueva reserva asociada a un cliente y un vehículo dentro del rango de fechas indicados.
     * Valida la existencia del cliente y del vehículo, y además la disponibilidad del vehículo para las fechas solicitadas y la coherencia del rango temporal.
     * 
     * @param idCliente - Id del cliente que realiza la reserva.
     * @param matriculaVehiculo - Matrícula del vehículo a reservar.
     * @param fechaInicio - Fecha de inicio de la reserva.
     * @param fechaFin - Fecha de fin de la reserva.
     * @param temporada - Información sobre la temporada que va a afectar al costo.
     * @returns {Reserva} La reserva creada.
     * @throws {Error} Si el cliente no existe.
     * @throws {Error} Si el vehículo no existe.
     * @throws {Error} Si el vehículo no está disponible para las fechas solicitadas.
     * @throws {Error} Si la fecha de inicio no es anterior a la fecha de fin.
     */
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

    /**
     * @private
     * Método privado que genera un nuevo id para una reserva.
     * Incrementa el contador de reserva (interno) y devuleve el valor actualizado.
     * @returns {number} Id de la reserva.
     */
    private generarIdReserva(): number {
        this.contadorIdReserva++;
        return this.contadorIdReserva;
    }

    // Gestión de Mantenimiento
    /**
     * Se registra un mantenimiento para un vehículo mediante su matrícula.
     * Si el vehículo existe, se agrega el mantenimiento a su historial y se actualiza el estado a "En Mantenimiento"
     * @param matricula - Matrícula del vehículo al que se le registrará el mantenimiento.
     * @param mantenimiento - Datos del mantenimiento realizado.
     * @returns {true} - Si el mantenimiento fue registrado correctamente.
     * @returns {false} - Si no se encontró un vehículo con la matrícula indicada.
     */
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
    /**
     * @private
     * Se valida sí un vehículo está disponible para un rango de fechas determinado.
     * Se considera:
     * - Si el vehículo está marcado como disponible.
     * - Si el vehículo no posee reservas solapadas con el rango solicitado.
     * 
     * Los solapamientos detectados incluyen:
     * - Inicio dentro de una reserva existente.
     * - Fin dentro de una reserva existente.
     * - Rango que envuelve completamente una reserva existente.
     * @param vehiculo - Vehículo a evaluar  
     * @param fechaInicio - Fecha de inicio solicitada.
     * @param fechaFin - Fecha de fin solicitada.
     * @returns {true} - Si el vehículo está disponible en esas fechas.
     * @returns {false} - Si el vehículo no está disponible en esas fechas.
     */
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
    /**
     * Se obtiene el vehículo que tuvo más alquileres dentro del rango de fechas especificado.
     * @param fechaInicio - Fecha de inicio de la cual comienza el análisis.
     * @param fechaFin - Fecha de fin de la cual se realiza el análisis.
     * @returns {Vehiculo} El vehículo más alquilado en ese período.
     */
    public getVehiculoMasAlquilado(fechaInicio: Date, fechaFin: Date): Vehiculo {
        return this.estadisticas.vehiculoMasAlquilado(fechaInicio, fechaFin);
    }

    /**
     * Se obtiene el vehículo que tuvo menos alquileres dentro del rango de fechas especificado.
     * @param fechaInicio - Fecha de inicio de la cual comienza el análisis.
     * @param fechaFin - Fecha de fin de la cual se realiza el análisis.
     * @returns {Vehiculo} El vehículo menos alquilado en ese período.
     */
    public getVehiculoMenosAlquilado(fechaInicio: Date, fechaFin: Date): Vehiculo {
        return this.estadisticas.vehiculoMenosAlquilado(fechaInicio, fechaFin);
    }

    /**
     * Se obtiene el vehículo que generó mayores ingresos totales.
     * @returns {Vehiculo} El vehículo más rentable.
     */
    public getVehiculoMasRentable(): Vehiculo {
        return this.estadisticas.vehiculoMasRentable();
    }

    /**
     * Se obtiene el vehículo que generó menores ingresos totales.
     * @returns {Vehiculo} El vehículo menos rentable.
     */
    public getVehiculoMenosRentable(): Vehiculo {
        return this.estadisticas.vehiculoMenosRentable();
    }

    /**
     * Se obtiene el porcentaje de ocupación total de la flota.
     * @returns {number} Porcentaje de la flota (0-100%).
     */
    public getPorcentajeOcupacionFlota(): number {
        return this.estadisticas.porcentajeDeOcupacionFlota();
    }

    /**
     * Se permite reemplazar el servicio de estadísticas utilizado por la plataforma.
     * Principalmente útil para pruebas unitarias (mocking) y para cambiar la estrategia de cálculo sin modificar el resto de la plataforma.
     * @param estadisticas - La nueva instancia del servicio de estadísticas.
     */
    public setEstadisticas(estadisticas: ServicioEstadisticas): void {
        this.estadisticas = estadisticas;
    }

}