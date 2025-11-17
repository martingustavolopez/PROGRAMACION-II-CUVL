import Vehiculo from "../Vehiculo/vehiculo";
import EstadoEnAlquiler from "./estadoEnAlquiler";
import EstadoEnMantenimiento from "./estadoEnMantenimiento";
import { IEstadoVehiculo } from "./iestadoVehiculo";

export default class EstadoDisponible implements IEstadoVehiculo {

  public getNombre(): string {
    return "Disponible";
  }

  public reservar(vehiculo: Vehiculo): void {
    vehiculo.setEstado(new EstadoEnAlquiler());
  }

  public devolver(vehiculo: Vehiculo): void {
    throw new Error("No se puede devolver un Vehículo que no está alquilado");
  }

  public puedeReservar(): boolean {
    return true;
  }

  public enviarAMantenimiento(vehiculo: Vehiculo): void {
    vehiculo.setEstado(new EstadoEnMantenimiento());
  }

  public completarMantenimiento(vehiculo: Vehiculo): void {
    throw new Error("El vehículo no está en mantenimiento");
  }

}