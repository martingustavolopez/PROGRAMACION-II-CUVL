import Vehiculo from "../Vehiculo/vehiculo";
import EstadoDisponible from "./estadoDisponible";
import EstadoEnMantenimiento from "./estadoEnMantenimiento";
import { IEstadoVehiculo } from "./iestadoVehiculo";

/**
 * Clase que representa el estado "En Alquiler" de un vehículo.
 * Implementa el patrón state para gestionar las transiciones de estado válidas desde el estado disponible hacia otros estados.
 * 
 * Transiciones válidas:
 * - "En Alquiler" --> "En Mantenimiento" (mediante el devolver, si es que necesitaMantenimiento).
 * - "En Alquiler" --> "Disponible" (mediante el devolver, si NO necesitaMantenimiento).
 */
export default class EstadoEnAlquiler implements IEstadoVehiculo {
 
  /**
   * Se obtiene el nombre del estado actual.
   * @returns El nombre del estado: "En Alquiler".
   */
  public getNombre(): string {
    return "En Alquiler";
  }
 
  /**
   * Intenta reservar un vehículo.
   * Operación no válida desde el estado "En Alquiler", porque ya está siendo usado por un cliente.
   * @param vehiculo - Vehículo a reservar.
   * @throws {Error} Siempre lanza error indicando que está siendo usado por un cliente, no puede ser alquilado.
   */
  public reservar(vehiculo: Vehiculo): void {
    throw new Error("Está siendo usado por un cliente. No puede ser alquilado.");
  }
 
  /**
   * Devuelve el vehículo, cambiando su estado a "En Mantenimiento", sí el vehículo necesita mantenimiento (mediante el método necesitaMantenimiento del propio vehículo).
   * Sino devuelve el vehículo, cambiando su estado a "Disponible", sí el vehículo NO necesita mantenimiento.
   * @param vehiculo - Vehículo a devolver 
   */
  public devolver(vehiculo: Vehiculo): void {
    if (vehiculo.necesitaMantenimiento()) {
      vehiculo.setEstado(new EstadoEnMantenimiento());
    }
    else {
      vehiculo.setEstado(new EstadoDisponible());
    }
  }
 
  /**
   * Verifica que el vehículo pueda ser reservado.
   * Un vehículo "En Alquiler" no puede ser reservado.
   * @returns false - El vehículo no está disponible para reservarlo.
   */
  public puedeReservar(): boolean {
    return false
  }
 
  /**
   * Intenta enviar un vehículo a mantenimiento.
   * Operación no válida desde el estado "En Alquiler" por que está alquilado.
   * @param vehiculo - Vehículo a enviar a mantenimiento.
   * @throws {Error} Siempre lanza error indicando que no puede enviar a mantenimiento un vehículo alquilado.
   */
  public enviarAMantenimiento(vehiculo: Vehiculo): void {
    throw new Error("No se puede enviar a Mantenimiento un Vehículo alquilado");
  }

  /**
   * Intenta completar el mantenimiento del vehículo.
   * Operación no válida desde el estado "En Alquiler" porque solo se pueden devolver vehículos que estén en ese estado.
   * @param vehiculo - Vehículo cuyo mantenimiento se quiere completar.
   * @throws {Error} Siempre lanza error indicando que el vehículo no está en mantenimiento.
   */
  public completarMantenimiento(vehiculo: Vehiculo): void {
    throw new Error("El vehículo no está en mantenimiento");
  }

}