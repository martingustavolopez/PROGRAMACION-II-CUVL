import Compacto from "../src/compacto";
import Vehiculo from "../src/vehiculo";
import EstadoDisponible from "../src/EstadoVehiculo/estadoDisponible"
import EstadoEnAlquiler from "../src/EstadoVehiculo/estadoEnAlquiler";
import EstadoEnMantenimiento from "../src/EstadoVehiculo/estadoEnMantenimiento";

describe("Test de la clase Estado Disponible (State)", () => {

  let estadoDisponible: EstadoDisponible;
  // Mock Vehiculo
  let vehiculoMock = {
    getMatricula: jest.fn(),
    getKilometraje: jest.fn(),
    calcularTarifa: jest.fn()
  } as unknown as Vehiculo;

  beforeEach(() => {
    vehiculoMock = new Compacto("AFJ890", 10000);
    estadoDisponible = new EstadoDisponible();
  })

  it("Debe devolver el nombre de forma correcta", () => {
    expect(estadoDisponible.getNombre()).toBe("Disponible");
  })

  it("Debe poder reservar un vehiculo", () => {
    expect(() => estadoDisponible.reservar(vehiculoMock)).not.toThrow();
    expect(vehiculoMock.getEstado()).toBeInstanceOf(EstadoEnAlquiler);
  })

  it("Debe lanzar un error al intentar devolver el vehiculo", () => {
    expect(() => estadoDisponible.devolver(vehiculoMock)).toThrow(
      "No se puede devolver un Vehículo que no está alquilado"
    );
  })

  it("Debe permitir reservar el vehiculo", () => {
    expect(estadoDisponible.puedeReservar()).toBe(true);
  })

  it("Debe permitir enviar a mantenimiento el vehiculo", () => {
    expect(() => estadoDisponible.enviarAMantenimiento(vehiculoMock)).not.toThrow();
    expect(vehiculoMock.getEstado()).toBeInstanceOf(EstadoEnMantenimiento);
  })

  it("Debe lanzar un error al intentar completar el mantenimiento del vehiculo", () => {
    expect(() => estadoDisponible.completarMantenimiento(vehiculoMock)).toThrow(
      "El vehículo no está en mantenimiento"
    );
  })

})