import Vehiculo from "../Vehiculo/vehiculo"

/**
 * Interfaz que declara las firmas a implementar las clases que implementen la interfaz del estado del vehículo.
 */
export interface IEstadoVehiculo {
  getNombre(): string
  reservar(vehiculo: Vehiculo): void
  devolver(vehiculo: Vehiculo): void
  puedeReservar(): boolean
  enviarAMantenimiento(vehiculo: Vehiculo): void
  completarMantenimiento(vehiculo: Vehiculo): void
}