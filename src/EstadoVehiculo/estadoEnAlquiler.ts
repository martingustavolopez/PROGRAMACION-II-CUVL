import Vehiculo from "../vehiculo";
import EstadoDisponible from "./estadoDisponible";
import EstadoEnMantenimiento from "./estadoEnMantenimiento";
import { IEstadoVehiculo } from "./iestadoVehiculo";

export default class EstadoEnAlquiler implements IEstadoVehiculo {
 
  public getNombre(): string {
    return "En Alquiler";
  }
 
  public reservar(vehiculo: Vehiculo): void {
    throw new Error("Está siendo usado por un cliente. No puede ser alquilado.");
  }
 
  public devolver(vehiculo: Vehiculo): void {
    if (vehiculo.necesitaMantenimiento()) {
      vehiculo.setEstado(new EstadoEnMantenimiento());
    }
    else {
      vehiculo.setEstado(new EstadoDisponible());
    }
  }
 
  public puedeReservar(): boolean {
    return false
  }
 
  public enviarAMantenimiento(vehiculo: Vehiculo): void {
    throw new Error("No se puede enviar a Mantenimiento un Vehículo alquilado");
  }

  public completarMantenimiento(vehiculo: Vehiculo): void {
    throw new Error("El vehículo no está en mantenimiento");
  }

}