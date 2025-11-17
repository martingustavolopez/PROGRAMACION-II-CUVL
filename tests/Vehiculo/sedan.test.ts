import { ITemporada } from "../../src/Temporada/iTemporada";
import Sedan from "../../src/Vehiculo/sedan"

describe("Test de la clase Sedan", () => {
  let sedan: Sedan;
  let temporadaMock: jest.Mocked<ITemporada>;

  beforeEach(() => {
    sedan = new Sedan("ASD123", 50000);

    temporadaMock = {
      ajustar: jest.fn(),
      getNombre: jest.fn()
    };
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

  it("Debe cobrar por todos los kilómetros desde el primero", () => {
    temporadaMock.ajustar.mockReturnValue(50); // (sin ajuste de temporada) => Temporada Media
    const dias = 3;
    const km = 100;
    expect(sedan.calcularTarifaConTemporada(dias, km, temporadaMock)).toBe(170);
  });

  it("Debe aplicar cargo correcto con muchos kilómetros", () => {
    temporadaMock.ajustar.mockReturnValue(50);
    const dias = 5;
    const km = 500;
    expect(sedan.calcularTarifaConTemporada(dias, km, temporadaMock)).toBe(350);
  });

  it("Debe aplicar tarifa base ajustada por Temporada Alta", () => {
    temporadaMock.ajustar.mockReturnValue(50 * 1.2); // Temporada Alta
    const dias = 3;
    const km = 200;
    expect(sedan.calcularTarifaConTemporada(dias, km, temporadaMock)).toBe(220);
  });

  it("Debe aplicar tarifa base ajustada por Temporada Baja", () => {
    temporadaMock.ajustar.mockReturnValue(50 * 0.9);
    const dias = 3;
    const km = 200;
    expect(sedan.calcularTarifaConTemporada(dias, km, temporadaMock)).toBe(175);
  });

})