import Mantenimiento from "../src/mantenimiento"

describe("Test de la clase Mantenimiento", () => {
  let mantenimiento: Mantenimiento;
  const fecha = new Date('2025-10-18');
  
  beforeEach(() => {
    mantenimiento = new Mantenimiento(
      fecha,
      10000,
      "Cambio de Aceite",
    );
  })

  it("Es una instancia de la clase mantenimiento", () => {
    expect(mantenimiento).toBeInstanceOf(Mantenimiento);
  })

  it("Debe crear un mantenimiento con los valores correctamente", () => {
    expect(mantenimiento.getFecha()).toEqual(fecha);
    expect(mantenimiento.getCosto()).toBe(10000);
    expect(mantenimiento.getDescripcion()).toBe("Cambio de Aceite");
  })

  // Ver bien este TEST
  it("Debe obtener el detalle del Mantenimiento", () => {
    const detalle = mantenimiento.obtenerDetalles();
    expect(detalle).toContain("Mantenimiento nº");
    expect(detalle).toContain("Costo");
    expect(detalle).toContain("Descripción: Cambio de Aceite");
  })

  it("Debe setear el id del mantenimiento", () => {
    mantenimiento.setIdMantenimiento(1);
    expect(mantenimiento.getIdMantenimiento()).toBe(1);
  })
  
})