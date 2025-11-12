import Vehiculo from "../Vehiculo/vehiculo"

export interface IEstadoVehiculo {
  getNombre(): string
  reservar(vehiculo: Vehiculo): void
  devolver(vehiculo: Vehiculo): void
  puedeReservar(): boolean
  enviarAMantenimiento(vehiculo: Vehiculo): void
  completarMantenimiento(vehiculo: Vehiculo): void
}