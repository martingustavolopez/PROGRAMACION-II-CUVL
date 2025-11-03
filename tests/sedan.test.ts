import { EstadoVehiculo } from "../src/estado_vehiculo";
import Sedan from "../src/sedan"

describe("Test de la clase Sedan", () => {
  let sedan: Sedan;

  beforeEach(() => {
    sedan = new Sedan("ASD123", 50000, 50);
  })
  afterEach(() => {});

  it("Es una instancia de la clase Sedan", () => {
    expect(sedan).toBeInstanceOf(Sedan);
  })

  it("Debe crear un vehículo Compacto con los valores iniciales correctos", () => {
    expect(sedan.getMatricula()).toBe("ASD123");
    expect(sedan.getTarifaBase()).toBe(50);
    expect(sedan.getEstado()).toBe(EstadoVehiculo.DISPONIBLE);
    expect(sedan.getKilometraje()).toBe(50000);
  })
 
  it("Debe poder cambiar el estado del vehiculo", () => {
    sedan.setEstado(EstadoVehiculo.EN_ALQUILER);
    expect(sedan.getEstado()).toBe(EstadoVehiculo.EN_ALQUILER)
  })

  it("Debe registrar el kilometraje correctamente", () => {
    sedan.setKilometraje(75000);
    expect(sedan.getKilometraje()).toBe(75000);
  })

  it("NO debe permitir registrar un kilometraje menor al actual", () => {
    sedan.setKilometraje(80000);
    expect(() => sedan.setKilometraje(75000)).toThrow("El kilometraje no puede ser menor al actual.");
  })

  it("Debe verificar que el vehiculo esta disponible", () => {
    expect(sedan.estaDisponible()).toBe(true);
    sedan.setEstado(EstadoVehiculo.EN_ALQUILER);
    expect(sedan.estaDisponible()).toBe(false);
  })
  
  it("Debe lanzar un error si la cantidad de dias es igual a 0", () => {
    expect(() => sedan.calcularTarifa(0, 100)).toThrow("Los días deben ser mayor a 0.");
  })
  it("Debe lanzar un error si la cantidad de dias es un valor negativo", () => {
    expect(() => sedan.calcularTarifa(-1, 100)).toThrow("Los días deben ser mayor a 0.");
  })
  it("Debe lanzar un error si los km recorridos es un valor negativo", () => {
    expect(() => sedan.calcularTarifa(10, -50)).toThrow("Los kilometros recorridos no pueden ser negativos.");
  })

  it("Debe calcular tarifa con cargo por kilometro, sin límite diario", () => {
    const dias = 5;
    const km = 200;
    const tarifa = sedan.calcularTarifa(dias, km);
    expect(tarifa).toBe(290)
  })

  it("Debe calcular tarifa de forma correcta con pocos kilometros", () => {
    const dias = 3;
    const km = 50;
    const tarifa = sedan.calcularTarifa(dias, km);
    expect(tarifa).toBe(160);
  })

})