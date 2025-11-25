import Vehiculo from "../Vehiculo/vehiculo";
import EstadoDisponible from "./estadoDisponible";
import { IEstadoVehiculo } from "./iestadoVehiculo";

/**
 * Clase que representa el estado "En Mantenimiento" de un vehículo.
 * Implementa el patrón State para gestionar las transiciones de estado válidas desde el estado en mantenimiento hacia otros estados.
 * 
 * Transiciones válidas:
 * - "En Mantenimiento" --> "Disponible" (mediante el completarMantenimiento).
 */
export default class EstadoEnMantenimiento implements IEstadoVehiculo {

  /**
   * Se obtiene el nombre del estado actual.
   * @returns {string} El nombre del estado: "En Mantenimiento".
   */
  public getNombre(): string {
    return "En Mantenimiento";
  }
  
  /**
   * Intenta reservar un vehículo.
   * Operación no válida desde el estado "En Mantenimiento", porque no se puede reservar un vehículo en mantenimiento.
   * @param vehiculo - Vehículo a reservar.
   * @throws {Error} Siempre lanza error indicando que no se puede reservar un vehículo en mantenimiento.
   */
  public reservar(vehiculo: Vehiculo): void {
    throw new Error("No se puede reservar un Vehículo en Mantenimiento");
  }

  /**
   * Intenta devolver un vehículo.
   * Operación no válida desde el estado "En Mantenimiento", porque no se puede devolver un vehículo en mantenimiento.
   * @param vehiculo - Vehículo a devolver.
   * @throws {Error} Siempre lanza error indicando que no se puede reservar un vehículo en mantenimiento.
   */
  public devolver(vehiculo: Vehiculo): void {
    throw new Error("No se puede devolver un Vehículo en Mantenimiento");
  }
  
  /**
   * Verifica que el vehículo pueda ser reservado.
   * Un vehículo "En Mantenimiento" no puede ser reservado.
   * @returns {false} - El vehículo no está disponible para reservarlo.
   */
  public puedeReservar(): boolean {
    return false;
  }
  
  /**
   * Intenta enviar un vehículo a mantenimiento.
   * Operación no válida desde el estado "En Mantenimiento" por que ya está en mantenimiento.
   * @param vehiculo - Vehículo a enviar a mantenimiento.
   * @throws {Error} Siempre lanza error indicando que ya se encuentra en mantenimiento el vehículo.
   */
  public enviarAMantenimiento(vehiculo: Vehiculo): void {
    throw new Error("Ya se encuentra en Mantenimiento el Vehículo");
  }

  /**
   * Completa el mantenimiento de un vehículo, cambiando su estado a "Disponible".
   * Resetea los contadores de mantenimiento al completar el mantenimiento.
   * @param vehiculo - Vehículo a completar mantenimiento.
   */
  public completarMantenimiento(vehiculo: Vehiculo): void {
    vehiculo.resetearContadoresMantenimiento();
    vehiculo.setEstado(new EstadoDisponible());
  }

}