import Compacto from "../src/Vehiculo/compacto";
import Vehiculo from "../src/Vehiculo/vehiculo";
import EstadoDisponible from "../src/EstadoVehiculo/estadoDisponible"
import EstadoEnAlquiler from "../src/EstadoVehiculo/estadoEnAlquiler";
import EstadoEnMantenimiento from "../src/EstadoVehiculo/estadoEnMantenimiento";

describe("Test de la clase Estado Mantenimiento (State)", () => {

  let estadoEnMantenimiento: EstadoEnMantenimiento;
  let vehiculoMock: Vehiculo;
  
  // Mock Vehiculo
  vehiculoMock = {
    resetearContadoresMantenimiento: jest.fn(),
    completarMantenimiento: jest.fn(),
    setEstado: jest.fn(),
    getEstado: jest.fn(),
  } as unknown as Vehiculo;

  beforeEach(() => {
    vehiculoMock.setEstado(new EstadoEnMantenimiento)
    estadoEnMantenimiento = new EstadoEnMantenimiento();
  })

  it("Debe devolver el nombre de forma correcta", () => {
    expect(estadoEnMantenimiento.getNombre()).toBe("En Mantenimiento");
  })

  it("Debe lanzar un error al intentar reservar un vehiculo", () => {
    expect(() => estadoEnMantenimiento.reservar(vehiculoMock)).toThrow(
      "No se puede reservar un Vehículo en Mantenimiento"
    );
  })

  it("Debe lanzar un error al intentar devolver el vehiculo", () => {
    expect(() => estadoEnMantenimiento.devolver(vehiculoMock)).toThrow(
      "No se puede devolver un Vehículo en Mantenimiento"
    );
  })

  it("NO debe permitir reservar el vehiculo", () => {
    expect(estadoEnMantenimiento.puedeReservar()).toBe(false);
  })
  
  it("Debe lanzar error al intentar enviar a mantenimiento nuevamente", () => {
    expect(() => estadoEnMantenimiento.enviarAMantenimiento(vehiculoMock)).toThrow(
      "Ya se encuentra en Mantenimiento el Vehículo"
    );
  })

  it("Debe poder completar un mantenimiento", () => {
    estadoEnMantenimiento.completarMantenimiento(vehiculoMock)
    expect(vehiculoMock.resetearContadoresMantenimiento).toHaveBeenCalled(); // Reinicia contadores
    expect(vehiculoMock.setEstado).toHaveBeenCalledWith(expect.any(EstadoDisponible)); // Cambia el estado a Disponible
  })

})