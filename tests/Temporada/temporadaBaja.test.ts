import TemporadaBaja from "../../src/Temporada/temporadaBaja"

describe("Test de la clase Temporada Baja", () => {
  let temporadaBaja: TemporadaBaja;

  beforeEach(() => {
    temporadaBaja = new TemporadaBaja();
  });

  it("Debe tener el nombre correcto de la Temporada", () => {
    expect(temporadaBaja.getNombre()).toBe("Temporada Baja");
  })

  it("Debe aplicar descuento del -10% a la tarifa base de Compacto", () => {
    expect(temporadaBaja.ajustar(30)).toBe(27);
  })

  it("Debe aplicar descuento del -10% a la tarifa base de Sedan", () => {
    expect(temporadaBaja.ajustar(50)).toBe(45);
  })

  it("Debe aplicar descuento del -10% a la tarifa base de Suv", () => {
    expect(temporadaBaja.ajustar(80)).toBe(72);
  })

})