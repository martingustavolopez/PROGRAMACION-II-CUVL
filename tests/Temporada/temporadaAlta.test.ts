import TemporadaAlta from "../../src/Temporada/temporadaAlta"

describe("Test de la clase Temporada Baja" , () => {
  let temporadaAlta: TemporadaAlta;

  beforeEach(() => {
    temporadaAlta = new TemporadaAlta();
  });

  it("Debe tener el nombre correcto de la Temporada", () => {
    expect(temporadaAlta.getNombre()).toBe("Temporada Alta");
  })

  it("Debe aplicar descuento del 10% a la tarifa base de Compacto", () => {
    expect(temporadaAlta.ajustar(30)).toBe(36);
  })

  it("Debe aplicar descuento del 10% a la tarifa base de Compacto", () => {
    expect(temporadaAlta.ajustar(50)).toBe(60);
  })

  it("Debe aplicar descuento del 10% a la tarifa base de Compacto", () => {
    expect(temporadaAlta.ajustar(80)).toBe(96);
  })

})