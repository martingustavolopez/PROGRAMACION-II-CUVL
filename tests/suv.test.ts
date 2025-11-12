import Suv from "../src/suv"

describe("Test de la clase SUV", () => {
  let suv: Suv;

  beforeEach(() => {
    suv = new Suv("BNM890", 5000);
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
    const dias = 3;
    const km = 200;
    const tarifaBase = suv.getTarifaBase();
    expect(suv.calcularTarifaBase(dias, km, tarifaBase)).toBe(285);
  })

  it("Debe cobrar por km excedentes sobre 500 km totales", () => {
    const dias = 3;
    const km = 200;
    const tarifaBase = suv.getTarifaBase();
    expect(suv.calcularTarifaBase(5, 600, 80)).toBe(500);
  })

  it("NO debe cobrar extra por km si no supera 500 km", () => {
    const dias = 10;
    const km = 499;
    const tarifaBase = suv.getTarifaBase();
    expect(suv.calcularTarifaBase(dias, km, tarifaBase)).toBe(950);
  });

  it("Debe calcular correctamente con justo 500 km", () => {
    const dias = 5;
    const km = 500;
    const tarifaBase = suv.getTarifaBase();
    expect(suv.calcularTarifaBase(dias, km, tarifaBase)).toBe(475);
  });

  it("Debe aplicar tarifa base ajustada por Temporada Alta", () => {
    const dias = 3;
    const km = 300;
    const tarifaAjustada = suv.getTarifaBase() * 1.2;
    expect(suv.calcularTarifaBase(dias, km, tarifaAjustada)).toBe(333);
  });

  it("Debe aplicar tarifa base ajustada por Temporada Baja", () => {
    const dias = 3;
    const km = 300;
    const tarifaAjustada = suv.getTarifaBase() * 0.9;
    expect(suv.calcularTarifaBase(dias, km, tarifaAjustada)).toBe(261);
  })

  it("debe calcular correctamente con temporada y km excedentes", () => {
    const dias = 5;
    const km = 700;
    const tarifaAjustada = suv.getTarifaBase() * 1.2;
    expect(suv.calcularTarifaBase(dias, km, tarifaAjustada)).toBe(605);
  })

  it('debe calcular correctamente con muchos km excedentes', () => {
    const dias = 10;
    const km = 2000;
    const tarifaBase = suv.getTarifaBase();
    expect(suv.calcularTarifaBase(dias, km, tarifaBase)).toBe(1325);
  })

})