import Cliente from "./cliente";
import Mantenimiento from "./mantenimiento";
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

    public agregarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    public buscarVehiculo(matricula: string): Vehiculo | null {
        return this.vehiculos.find((vehiculo => vehiculo.getMatricula() === matricula)) || null;
    }

    public getVehiculosDisponibles(): Vehiculo[] {
        return this.vehiculos.filter((vehiculo => vehiculo.estaDisponible()))
    }

    public registrarMantenimiento (vehiculo: Vehiculo, mantenimiento: Mantenimiento): boolean {
        return true;
    }

    private validarDisponibilidad(vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date): boolean {
        if(!vehiculo.estaDisponible()) {
            return false;
        }

        // Me quedaria buscar un vehiculo por matricula, luego recorrer todas las reservas que ya tiene 
        // ese Vehiculo, comparar si alguna de la nueva reserva esta dentro del rango de alguna reserva
        // y si es asi, devoler false.
        //
        // en el caso de que nada de eso se cumpla, el vehiculo esta disponible.

        return true;


    }









}