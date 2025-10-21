import { EstadoVehiculo } from "../src/estado_vehiculo";

describe("Test del enum Estado Vehiculo", () => {
  it("Debe tener todos los estados definidos", () => {
    expect(EstadoVehiculo.DISPONIBLE).toBe("Disponible");
    expect(EstadoVehiculo.EN_ALQUILER).toBe("En Alquiler");
    expect(EstadoVehiculo.EN_MANTENIMIENTO).toBe("En Mantenimiento");
    expect(EstadoVehiculo.NECESITA_LIMPIEZA).toBe("Necesita Limpieza");
  })
})