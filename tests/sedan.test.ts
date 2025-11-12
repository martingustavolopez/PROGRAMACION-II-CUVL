import Sedan from "../src/Vehiculo/sedan"

describe("Test de la clase Sedan", () => {
  let sedan: Sedan;

  beforeEach(() => {
    sedan = new Sedan("ASD123", 50000);
  })

  it("Es una instancia de la clase Sedan", () => {
    expect(sedan).toBeInstanceOf(Sedan);
  })

  it("Debe tener una Tarifa Base de 50", () => {
    expect(sedan.getTarifaBase()).toBe(50);
  })

  it("Debe crear un vehículo Compacto con los valores iniciales correctos", () => {
    expect(sedan.getMatricula()).toBe("ASD123");
    expect(sedan.getKilometraje()).toBe(50000);
  })

  it("Debe registrar el kilometraje correctamente", () => {
    sedan.setKilometraje(75000);
    expect(sedan.getKilometraje()).toBe(75000);
  })

  it("NO debe permitir registrar un kilometraje menor al actual", () => {
    sedan.setKilometraje(80000);
    expect(() => sedan.setKilometraje(75000)).toThrow("El kilometraje no puede ser menor al actual.");
  })

  it('Debe cobrar por todos los kilómetros desde el primero', () => {
    const dias = 3;
    const km = 100;
    const tarifaBase = 50; // (sin ajuste de temporada) => Temporada Media
    expect(sedan.calcularTarifaBase(dias, km, tarifaBase)).toBe(170);
  });

  it('Debe aplicar cargo correcto con muchos kilómetros', () => {
    const dias = 5;
    const km = 500;
    const tarifaBase = 50;
    expect(sedan.calcularTarifaBase(dias, km, tarifaBase)).toBe(350);
  });

  it('Debe aplicar tarifa base ajustada por Temporada Alta', () => {
    const dias = 3;
    const km = 200;
    const tarifaAjustada = 50 * 1.2;
    expect(sedan.calcularTarifaBase(dias, km, tarifaAjustada)).toBe(220);
  });

  it('Debe aplicar tarifa base ajustada por Temporada Baja', () => {
    const dias = 3;
    const km = 200;
    const tarifaAjustada = 50 * 0.9;
    expect(sedan.calcularTarifaBase(dias, km, tarifaAjustada)).toBe(175);
  });

})