import Vehiculo from "../Vehiculo/vehiculo";
import EstadoEnAlquiler from "./estadoEnAlquiler";
import EstadoEnMantenimiento from "./estadoEnMantenimiento";
import { IEstadoVehiculo } from "./iestadoVehiculo";

/**
 * Clase que representa el estado "Disponible" de un vehículo.
 * Implementa el patrón State para gestionar las transiciones de estado válidas desde el estado disponible hacia otros estados.
 * 
 * Transiciones válidas:
 * - "Disponible" --> "En Alquiler" (mediante el reservar).
 * - "Disponible" --> "En Mantenimiento" (mediante el enviarAMantenimiento).
 */
export default class EstadoDisponible implements IEstadoVehiculo {

  /**
   * Se obtiene el nombre del estado actual.
   * @returns El nombre del estado: "Disponible".
   */
  public getNombre(): string {
    return "Disponible";
  }

  /**
   * Reserva el vehículo, cambiando su estado a "En Alquiler"
   * @param vehiculo - Vehículo a reservar.
   */
  public reservar(vehiculo: Vehiculo): void {
    vehiculo.setEstado(new EstadoEnAlquiler());
  }

  /**
   * Intenta devolver un vehículo.
   * Operación no válida desde el estado "Disponible" porque solo se pueden devolver vehículos que estén en alquiler.
   * @param vehiculo - Vehículo a devolver.
   * @throws {Error} Siempre lanza error indicando que no se puede devolver un vehículo que no está alquilado.
   */
  public devolver(vehiculo: Vehiculo): void {
    throw new Error("No se puede devolver un Vehículo que no está alquilado");
  }

  /**
   * Verifica que el vehículo pueda ser reservado.
   * Un vehículo "Disponible" siempre puede ser reservado.
   * @returns true - El vehículo está disponible para reservarlo.
   */
  public puedeReservar(): boolean {
    return true;
  }

  /**
   * Envía el vehículo a mantenimiento, cambiando su estado a "En Mantenimiento".
   * @param vehiculo - Vehículo a enviar a mantenimiento.
   */
  public enviarAMantenimiento(vehiculo: Vehiculo): void {
    vehiculo.setEstado(new EstadoEnMantenimiento());
  }

  /**
   * Intenta completar el mantenimiento del vehículo.
   * Operación no válida desde el estado "Disponible" porque solo se pueden devolver vehículos que estén en ese estado.
   * @param vehiculo - Vehículo cuyo mantenimiento se quiere completar.
   * @throws {Error} Siempre lanza error indicando que el vehículo no está en mantenimiento.
   */
  public completarMantenimiento(vehiculo: Vehiculo): void {
    throw new Error("El vehículo no está en mantenimiento");
  }

}