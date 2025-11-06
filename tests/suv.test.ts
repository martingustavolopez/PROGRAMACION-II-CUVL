import { EstadoVehiculo } from "../src/estado_vehiculo";
import Suv from "../src/suv"

describe("Test de la clase SUV", () => {
  let suv: Suv;

  beforeEach(() => {
    suv = new Suv("BNM890", 5000, 80);
  })
  afterEach(() => {});

  it("Es una instancia de la clase SUV", () => {
    expect(suv).toBeInstanceOf(Suv)
  })

  it("Debe crear un vehiculo SUV con sus valores iniciales correctos", () => {
    expect(suv.getMatricula()).toBe("BNM890");
    expect(suv.getTarifaBase()).toBe(80);
    expect(suv.getEstado()).toBe(EstadoVehiculo.DISPONIBLE);
    expect(suv.getKilometraje()).toBe(5000);
  })

  it("Debe poder cambiar el estado del vehículo", () => {
    suv.setEstado(EstadoVehiculo.EN_ALQUILER)
    expect(suv.getEstado()).toBe(EstadoVehiculo.EN_ALQUILER);
  })

  it("Debe registrar el kilometraje correctamente", () => {
    suv.setKilometraje(7000);
    expect(suv.getKilometraje()).toBe(7000);
  })

  it("NO debe permitir registrar un kilometraje menor al actual", () => {
    suv.setKilometraje(9000);
    expect(() => suv.setKilometraje(7500)).toThrow("El kilometraje no puede ser menor al actual.");
  })

  it("Debe verificar que el vehiculo esta disponible", () => {
    expect(suv.estaDisponible()).toBe(true);
    suv.setEstado(EstadoVehiculo.EN_ALQUILER);
    expect(suv.estaDisponible()).toBe(false);
  })

  it("Debe calcular tarifa sin exceder límite de km (500 km)", () => {
    const dias = 5;
    const km = 400;
    const tarifa = suv.calcularTarifa(dias, km);
    expect(tarifa).toBe(475)
  })

  it('Debe calcular tarifa excediendo límite de km', () => {
    const dias = 7;
    const km = 650;
    const tarifa = suv.calcularTarifa(dias, km);
    expect(tarifa).toBe(702.5)
  })

})