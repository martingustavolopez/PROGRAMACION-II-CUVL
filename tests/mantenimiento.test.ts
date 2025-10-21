import Mantenimiento from "../src/mantenimiento"

describe("Test de la clase Mantenimiento", () => {
  let instancia: Mantenimiento;
  const fecha = new Date('2025-10-18');
  
  beforeEach(() => {
    instancia = new Mantenimiento(
      fecha,
      10000,
      "Cambio de Aceite",
    );
  })

  it("Es una instancia de la clase Mantenimiento", () => {
    expect(instancia).toBeInstanceOf(Mantenimiento);
  })

  it("Debe crear un mantenimiento con los valores correctamente", () => {
    expect(instancia.getFecha()).toEqual(fecha);
    expect(instancia.getCosto()).toBe(10000);
    expect(instancia.getDescripcion()).toBe("Cambio de Aceite");
  })

  // Ver bien este TEST
  it("Debe obtener el detalle del Mantenimiento", () => {
    const detalle = instancia.obtenerDetalles();
    expect(detalle).toContain("Mantenimiento nº");
    expect(detalle).toContain("Costo");
    expect(detalle).toContain("Descripción: Cambio de Aceite");
  })
  
})