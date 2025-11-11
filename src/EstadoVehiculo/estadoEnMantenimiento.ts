import Vehiculo from "../vehiculo";
import EstadoDisponible from "./estadoDisponible";
import { IEstadoVehiculo } from "./iestadoVehiculo";

export default class EstadoEnMantenimiento implements IEstadoVehiculo {

  public getNombre(): string {
    return "En Mantenimiento";
  }
  
  public reservar(vehiculo: Vehiculo): void {
    throw new Error("No se puede reservar un Vehículo en Mantenimiento");
  }
  
  public devolver(vehiculo: Vehiculo): void {
    throw new Error("No se puede devolver un Vehículo en Mantenimiento");
  }
  
  public puedeReservar(): boolean {
    return false;
  }
  
  public enviarAMantenimiento(vehiculo: Vehiculo): void {
    throw new Error("Ya se encuentra en Mantenimiento el Vehículo");
  }

  public completarMantenimiento(vehiculo: Vehiculo): void {
    vehiculo.resetearContadoresMantenimiento();
    vehiculo.setEstado(new EstadoDisponible());
  }

}