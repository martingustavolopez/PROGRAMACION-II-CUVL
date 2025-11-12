import Compacto from "../src/Vehiculo/compacto";
import EstadoDisponible from "../src/EstadoVehiculo/estadoDisponible";
import EstadoEnAlquiler from "../src/EstadoVehiculo/estadoEnAlquiler"
import EstadoEnMantenimiento from "../src/EstadoVehiculo/estadoEnMantenimiento";
import Vehiculo from "../src/Vehiculo/vehiculo";


describe("Test de la clase Estado En Alquiler (State)", () => {

  let estadoEnAlquiler: EstadoEnAlquiler;
  let vehiculoMock: Vehiculo;
  // Mock Vehiculo
  vehiculoMock = {
    setEstado: jest.fn(),
    getEstado: jest.fn(),
    necesitaMantenimiento: jest.fn(),
    reservar: jest.fn(),
    devolver: jest.fn(),
  } as unknown as Vehiculo;

  beforeEach(() => {
    vehiculoMock.setEstado(new EstadoEnAlquiler());
    estadoEnAlquiler = new EstadoEnAlquiler();
  })

  it("Debe devolver el nombre de forma correcta", () => {
    expect(estadoEnAlquiler.getNombre()).toBe("En Alquiler");
  })

  it("Debe lanzar error al intentar reservar un vehiculo", () => {
    expect(() => estadoEnAlquiler.reservar(vehiculoMock)).toThrow(
      "Está siendo usado por un cliente. No puede ser alquilado."
    );
  })

  it("Debe cambiar a Disponible si no necesita Mantenimiento", () => {
    (vehiculoMock.necesitaMantenimiento as jest.Mock).mockReturnValue(false);
    estadoEnAlquiler.devolver(vehiculoMock);
    expect(vehiculoMock.setEstado).toHaveBeenCalledWith(expect.any(EstadoDisponible));
  })

  it("Debe cambiar a Mantenimiento si necesita Mantenimiento", () => {
    (vehiculoMock.necesitaMantenimiento as jest.Mock).mockReturnValue(true);
    estadoEnAlquiler.devolver(vehiculoMock);
    expect(vehiculoMock.setEstado).toHaveBeenCalledWith(expect.any(EstadoEnMantenimiento));
  })

  it("NO debe permitir reservar", () => {
    expect(estadoEnAlquiler.puedeReservar()).toBe(false);
  })

  it("Debe lanzar error al intentar enviar a mantenimiento un vehiculo alquilado", () => {
    expect(() => estadoEnAlquiler.enviarAMantenimiento(vehiculoMock)).toThrow(
      "No se puede enviar a Mantenimiento un Vehículo alquilado"
    );
  })

  it("Debe lanzar error al intentar completar mantenimiento de un vehiculo alquilado", () => {
    expect(() => estadoEnAlquiler.completarMantenimiento(vehiculoMock)).toThrow(
      "El vehículo no está en mantenimiento"
    );
  })

})