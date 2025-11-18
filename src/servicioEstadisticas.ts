import Reserva from "./reserva"
import Vehiculo from "./Vehiculo/vehiculo"

export default class ServicioEstadisticas {

  private vehiculos: Vehiculo[];
  private reservas: Reserva[];

  constructor(vehiculos: Vehiculo[], reservas: Reserva[]) {
    this.vehiculos = vehiculos;
    this.reservas = reservas;
  }

  public vehiculoMasAlquilado(fechaInicio: Date, fechaFin: Date): Vehiculo

  public vehiculoMenosAlquilado(fechaInicio: Date, fechaFin: Date): Vehiculo

  public vehiculoMasRentable(): Vehiculo

  public vehiculoMenosRentable(): Vehiculo

  public porcentajeDeOcupacionFlota(): number

  public calcularRentabilidad(vehiculo: Vehiculo): number
  
}