import Compacto from "../src/compacto"
import { EstadoVehiculo } from "../src/estado_vehiculo";
import Mantenimiento from "../src/mantenimiento";

describe("Test de la clase Compacto", () => {
  let compacto: Compacto;

  beforeEach(() => {
    compacto = new Compacto("TYU678");
  })
  afterEach(() => {});

  it("Es una instancia de la clase Compacto", () => {
    expect(compacto).toBeInstanceOf(Compacto);
  })

  it("Debe crear un vehículo Compacto con sus valores iniciales correctos", () => {
    expect(compacto.getMatricula()).toBe("TYU678");
    expect(compacto.obtenerTarifaBase()).toBe(30);
    expect(compacto.getEstado()).toBe(EstadoVehiculo.DISPONIBLE);
    expect(compacto.getKilometrajeActual()).toBe(0);
  })

  it("Debe poder cambiar el estado del vehiculo", () => {
    compacto.cambiarEstado(EstadoVehiculo.EN_ALQUILER);
    expect(compacto.getEstado()).toBe(EstadoVehiculo.EN_ALQUILER);
  })

  it("Debe registrar el kilometraje correctamente", () => {
    compacto.registrarKilometraje(7000);
    expect(compacto.getKilometrajeActual()).toBe(7000);
  })

  it("NO debe permitir registrar un kilometraje menor al actual", () => {
    compacto.registrarKilometraje(7000);
    expect(() => compacto.registrarKilometraje(5000)).toThrow("El kilometraje no puede ser menor al actual.");
  })

  it("Debe verificar que el vehiculo esta disponible", () => {
    expect(compacto.estaDisponible()).toBe(true);
    compacto.cambiarEstado(EstadoVehiculo.EN_ALQUILER);
    expect(compacto.estaDisponible()).toBe(false);
  })

  it("Debe lanzar un error si la cantidad de dias es igual a 0", () => {
    expect(() => compacto.calcularTarifa(0, 100)).toThrow("Los días deben ser mayor a 0.");
  })
  it("Debe lanzar un error si la cantidad de dias es un valor negativo", () => {
    expect(() => compacto.calcularTarifa(-1, 100)).toThrow("Los días deben ser mayor a 0.");
  })
  it("Debe lanzar un error si los km recorridos es un valor negativo", () => {
    expect(() => compacto.calcularTarifa(10, -50)).toThrow("Los kilometros recorridos no pueden ser negativos.");
  })

  it("Debe calcular tarifa sin cargos extras (dentro del límite)", () => {
    const dias = 3;
    const km = 250;
    const tarifa = compacto.calcularTarifa(dias, km);
    expect(tarifa).toBe(90)
  })

  it("Debe calcular tarifa con cargos extras (excede el límite)", () => {
    const dias = 2;
    const km = 250;
    const tarifa = compacto.calcularTarifa(dias, km);
    expect(tarifa).toBe(67.5);
  })

  it("Se prueba el caso donde los km recorridos esta dentro del limite de kilmetraje", () => {
    expect(compacto.calcularTarifa(5, 400)).toBe(150);
  })

  it("Se prueba el caso donde se supera significativamente el limite de kilometraje", () => {
    expect(compacto.calcularTarifa(1, 1000)).toBe(165);
  })

  it("Debe agregar un mantenimiento al auto y cambiar el estado", () => {
    const mantenimientoMock = {
      getIdMantenimiento: jest.fn(),
      getCosto: jest.fn().mockReturnValue(10000)
    } as unknown as Mantenimiento;
  
    compacto.agregarMantenimiento(mantenimientoMock);
    expect(compacto.getEstado()).toBe(EstadoVehiculo.EN_MANTENIMIENTO);
    expect(compacto.getMantenimientos().length).toBe(1);
  })
  
})