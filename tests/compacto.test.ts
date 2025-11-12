import Compacto from "../src/compacto"
import EstadoDisponible from "../src/EstadoVehiculo/estadoDisponible";
import { IEstadoVehiculo } from "../src/EstadoVehiculo/iestadoVehiculo";
import Mantenimiento from "../src/mantenimiento";

describe("Test de la clase Compacto", () => {
  let compacto: Compacto;
  let estadoInicial: EstadoDisponible;

  beforeEach(() => {
    compacto = new Compacto("TYU678", 10000);
    estadoInicial = new EstadoDisponible();
    compacto.setEstado(estadoInicial);
  })

  it("Es una instancia de la clase Compacto", () => {
    expect(compacto).toBeInstanceOf(Compacto);
  })

  it("Obtener la Tarifa Base de Compacto", () => {
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
   const tarifaBase = 30; // (sin ajuste de temporada) => Temporada Media
   expect(compacto.calcularTarifaBase(dias, km, tarifaBase)).toBe(90);
  })

  it("Tarifa con excedente si se supera el límite por día (excede el límite)", () => {
    const dias = 3;
    const km = 350;
    const tarifaBase = 30; // (sin ajuste de temporada) => Temporada Media
    expect(compacto.calcularTarifaBase(dias, km, tarifaBase)).toBe(97.5);
  })

  it('Debe aplicar tarifa base ajustada por Temporada Alta', () => {
    const dias = 3;
    const km = 250;
    const tarifaAjustada = 30 * 1.2; // Temporada Alta
    expect(compacto.calcularTarifaBase(dias, km, tarifaAjustada)).toBe(108);
  });

  test('Debe aplicar tarifa base ajustada por Temporada Baja', () => {
    const dias = 3;
    const km = 250;
    const tarifaAjustada = 30 * 0.9; // Temporada Baja
    expect(compacto.calcularTarifaBase(dias, km, tarifaAjustada)).toBe(81);
  });

  it('Debe calcular correctamente con Temporada y km excedentes', () => {
    const dias = 3;
    const km = 400;
    const tarifaAjustada = 30 * 1.2;
    const tarifa = compacto.calcularTarifaBase(dias, km, tarifaAjustada);
    expect(tarifa).toBe(123);
  });

  // Gestión de Estado
  it("Debe estar disponible al crearse", () => {
    expect(compacto.estaDisponible()).toBe(true);
  })

  it("Debe cambiar a alquilado al reservar", () => {
    compacto.reservar();
    expect(compacto.estaDisponible()).toBe(false);
    expect(compacto.getEstado().getNombre()).toBe("En Alquiler");
  })

})