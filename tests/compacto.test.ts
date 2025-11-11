import Compacto from "../src/compacto"
import EstadoDisponible from "../src/EstadoVehiculo/estadoDisponible";
import { IEstadoVehiculo } from "../src/EstadoVehiculo/iestadoVehiculo";
import Mantenimiento from "../src/mantenimiento";

describe("Test de la clase Compacto", () => {
  let compacto: Compacto;

  beforeEach(() => {
    compacto = new Compacto("TYU678", 10000);
  })

  it("Es una instancia de la clase Compacto", () => {
    expect(compacto).toBeInstanceOf(Compacto);
  })

  it("Debe tener una Tarifa Base de 30", () => {
    expect(compacto.getTarifaBase()).toBe(30);
  })

  it("Debe crear un vehículo Compacto con sus valores iniciales correctos", () => {
    expect(compacto.getMatricula()).toBe("TYU678");
    expect(compacto.getKilometraje()).toBe(10000);
  })

  it("Debe registrar el kilometraje correctamente", () => {
    compacto.setKilometraje(20000);
    expect(compacto.getKilometraje()).toBe(20000);
  })

  it("NO debe permitir registrar un kilometraje menor al actual", () => {
    compacto.setKilometraje(30000);
    expect(() => compacto.setKilometraje(25000)).toThrow("El kilometraje no puede ser menor al actual.");
  })

  it("Tarifa sin excedente si está dentro del límite por día (dentro del límite)", () => {
    const dias = 3;
    const km = 250;
    expect(compacto.calcularTarifa(dias, km)).toBe(90)
  })

  it("Tarifa con excedente si se supera el límite por día (excede el límite)", () => {
    const dias = 3;
    const km = 350;
    expect(compacto.calcularTarifa(dias, km)).toBe(97.5);
  })

  it("Si se recorren exactamente 100 km por día, no debe cobrar excedente", () => {
    const dias = 2;
    const km = 200;
    expect(compacto.calcularTarifa(dias, km)).toBe(60);
  })

  it("Se prueba el caso donde se supera significativamente el limite de kilometraje", () => {
    const dias = 1;
    const km = 1000;
    expect(compacto.calcularTarifa(dias, km)).toBe(165);
  })

  /*
  it("Debe agregar un mantenimiento al auto", () => {
    const mantenimientoMock = {
      getIdMantenimiento: jest.fn(),
      getCosto: jest.fn().mockReturnValue(10000)
    } as unknown as Mantenimiento;
  
    compacto.agregarMantenimiento(mantenimientoMock);
    expect(compacto.getMantenimientos().length).toBe(1);
  })
  */
  it("Debe poder setearle una matricula al vehiculo", () => {
    const compacto = new Compacto();
    compacto.setMatricula("ABC999");
    expect(compacto.getMatricula()).toBe("ABC999");
  })

})