import TemporadaMedia from "../../src/Temporada/temporadaMedia";

describe("Test de la clase Temporada Media", () => {
  let temporadaMedia: TemporadaMedia;

  beforeEach(() => {
    temporadaMedia = new TemporadaMedia();
  });

  it("Debe tener el nombre correcto de la Temporada", () => {
    expect(temporadaMedia.getNombre()).toBe("Temporada Media");
  })

  it("NO debe aplicar ningun ajuste sobre la tarifa base de Compacto", () => {
    expect(temporadaMedia.ajustar(30)).toBe(30);
  })

  it("NO debe aplicar ningun ajuste sobre la tarifa base de Sedan", () => {
    expect(temporadaMedia.ajustar(50)).toBe(50);
  })

  it("NO debe aplicar ningun ajuste sobre la tarifa base de Suv", () => {
    expect(temporadaMedia.ajustar(80)).toBe(80);
  })

})