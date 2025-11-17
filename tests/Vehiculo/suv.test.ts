import { ITemporada } from "../../src/Temporada/iTemporada";
import Suv from "../../src/Vehiculo/suv"

describe("Test de la clase SUV", () => {
  let suv: Suv;
  let temporadaMock: jest.Mocked<ITemporada>;

  beforeEach(() => {
    suv = new Suv("BNM890", 5000);

    temporadaMock = {
      ajustar: jest.fn(),
      getNombre: jest.fn()
    };
  })

  it("Es una instancia de la clase SUV", () => {
    expect(suv).toBeInstanceOf(Suv)
  })

  it("Debe tener una Tarifa Base de 80", () => {
    expect(suv.getTarifaBase()).toBe(80);
  })

  it("Debe crear un vehiculo SUV con sus valores iniciales correctos", () => {
    expect(suv.getMatricula()).toBe("BNM890");
    expect(suv.getKilometraje()).toBe(5000);
  })

  it("Debe registrar el kilometraje correctamente", () => {
    suv.setKilometraje(7000);
    expect(suv.getKilometraje()).toBe(7000);
  })

  it("NO debe permitir registrar un kilometraje menor al actual", () => {
    suv.setKilometraje(9000);
    expect(() => suv.setKilometraje(7500)).toThrow("El kilometraje no puede ser menor al actual.");
  })

  it("Debe incluir cargo de seguro por día", () => {
    temporadaMock.ajustar.mockReturnValue(80); 
    const dias = 3;
    const km = 200;
    expect(suv.calcularTarifaConTemporada(dias, km, temporadaMock)).toBe(285);
  })

  it("Debe cobrar por km excedentes sobre 500 km totales", () => {
    temporadaMock.ajustar.mockReturnValue(80);
    const dias = 3;
    const km = 200;
    expect(suv.calcularTarifaConTemporada(5, 600, temporadaMock)).toBe(500);
  })

  it("NO debe cobrar extra por km si no supera 500 km", () => {
    temporadaMock.ajustar.mockReturnValue(80);
    const dias = 10;
    const km = 499;
    expect(suv.calcularTarifaConTemporada(dias, km, temporadaMock)).toBe(950);
  });

  it("Debe calcular correctamente con justo 500 km", () => {
    temporadaMock.ajustar.mockReturnValue(80);
    const dias = 5;
    const km = 500;
    expect(suv.calcularTarifaConTemporada(dias, km, temporadaMock)).toBe(475);
  });

  it("Debe aplicar tarifa base ajustada por Temporada Alta", () => {
    temporadaMock.ajustar.mockReturnValue(80 * 1.2);
    const dias = 3;
    const km = 300;
    expect(suv.calcularTarifaConTemporada(dias, km, temporadaMock)).toBe(333);
  });

  it("Debe aplicar tarifa base ajustada por Temporada Baja", () => {
    temporadaMock.ajustar.mockReturnValue(80 * 0.9);
    const dias = 3;
    const km = 300;
    expect(suv.calcularTarifaConTemporada(dias, km, temporadaMock)).toBe(261);
  })

  it("Debe calcular correctamente con temporada y km excedentes", () => {
    temporadaMock.ajustar.mockReturnValue(80 * 1.2);
    const dias = 5;
    const km = 700;
    expect(suv.calcularTarifaConTemporada(dias, km, temporadaMock)).toBe(605);
  })

  it("Debe calcular correctamente con muchos km excedentes", () => {
    temporadaMock.ajustar.mockReturnValue(80);
    const dias = 10;
    const km = 2000;
    expect(suv.calcularTarifaConTemporada(dias, km, temporadaMock)).toBe(1325);
  })

})