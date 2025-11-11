import Vehiculo from "../vehiculo"

export interface IEstadoVehiculo {
  getNombre(): string
  reservar(vehiculo: Vehiculo): void
  devolver(vehiculo: Vehiculo): void
  puedeReservar(): boolean
  enviarAMantenimiento(vehiculo: Vehiculo): void
}