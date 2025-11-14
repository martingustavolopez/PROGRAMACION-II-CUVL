import Compacto from "../src/Vehiculo/compacto"
import EstadoDisponible from "../src/EstadoVehiculo/estadoDisponible";
import { ITemporada } from "../src/Temporada/iTemporada";

describe("Test de la clase Compacto", () => {
  let compacto: Compacto;
  let estadoInicial: EstadoDisponible;
  let temporadaMock: jest.Mocked<ITemporada>;

  beforeEach(() => {
    compacto = new Compacto("TYU678", 10000);
    estadoInicial = new EstadoDisponible();
    compacto.setEstado(estadoInicial);

    temporadaMock = {
      ajustar: jest.fn(),
      getNombre: jest.fn()
    };
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
    temporadaMock.ajustar.mockReturnValue(30); // (sin ajuste de temporada) => Temporada Media
    const dias = 3;
    const km = 250;
   expect(compacto.calcularTarifaConTemporada(dias, km, temporadaMock)).toBe(90);
  })

  it("Tarifa con excedente si se supera el límite por día (excede el límite)", () => {
    temporadaMock.ajustar.mockReturnValue(30); // (sin ajuste de temporada) => Temporada Media
    const dias = 3;
    const km = 350;
    expect(compacto.calcularTarifaConTemporada(dias, km, temporadaMock)).toBe(97.5);
  })

  it('Debe aplicar tarifa base ajustada por Temporada Alta', () => {
    temporadaMock.ajustar.mockReturnValue(30 * 1.2); // Temporada Alta
    const dias = 3;
    const km = 250;
    expect(compacto.calcularTarifaConTemporada(dias, km, temporadaMock)).toBe(108);
  });

  test('Debe aplicar tarifa base ajustada por Temporada Baja', () => {
    temporadaMock.ajustar.mockReturnValue(30 * 0.9); // Temporada Baja
    const dias = 3;
    const km = 250;
    expect(compacto.calcularTarifaConTemporada(dias, km, temporadaMock)).toBe(81);
  });

  it('Debe calcular correctamente con Temporada y km excedentes', () => {
    const dias = 3;
    const km = 400;
    temporadaMock.ajustar.mockReturnValue(30 * 1.2); // Temporada Alta
    const tarifa = compacto.calcularTarifaConTemporada(dias, km, temporadaMock);
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