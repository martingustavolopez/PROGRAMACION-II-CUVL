import Compacto from "../../src/Vehiculo/compacto"
import EstadoDisponible from "../../src/EstadoVehiculo/estadoDisponible";
import { ITemporada } from "../../src/Temporada/iTemporada";
import { IEstadoVehiculo } from "../../src/EstadoVehiculo/iestadoVehiculo";
import Mantenimiento from "../../src/mantenimiento";

describe("Test de la clase Compacto", () => {
  let compacto: Compacto;
  let estadoMocK: jest.Mocked<IEstadoVehiculo>;
  let temporadaMock: jest.Mocked<ITemporada>;

  beforeEach(() => {
    compacto = new Compacto("TYU678", 10000);

    estadoMocK = {
      getNombre: jest.fn(),
      reservar: jest.fn(),
      devolver: jest.fn(),
      puedeReservar: jest.fn(),
      enviarAMantenimiento: jest.fn(),
      completarMantenimiento: jest.fn()
    };

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

  it("Debe cambiar el estado de forma correcta", () => {
    compacto.setEstado(estadoMocK);
    expect(compacto.getEstado()).toBe(estadoMocK);
  })


  // TEST: Gestión de Estado
  it("Debe inicializar estado como Disponible", () => {
    expect(compacto.getEstado().getNombre()).toBe("Disponible");
  })

  it("Debe cambiar de Disponible a En Alquiler", () => {
    compacto.reservar();
    expect(compacto.getEstado().getNombre()).toBe("En Alquiler");
  })

  it("Debe lanzar error si ya está En Alquiler", () => {
    compacto.reservar();

    expect(() => compacto.reservar()).toThrow(
      "Está siendo usado por un cliente. No puede ser alquilado."
    );
  })





  it("Debe retornar 0 los kilometros desde ultimo mantenimiento al crearse", () => {
    expect(compacto.getKmDesdeUltimoMantenimiento()).toBe(0);
  })

  it("Debe acumular kilometros al devolver el vehiculo", () => {
    compacto.reservar();
    compacto.devolver(1000);
    expect(compacto.getKmDesdeUltimoMantenimiento()).toBe(1000);
  })

  it("Debe acumular múltiples devoluciones", () => {
    compacto.reservar();
    compacto.devolver(1000);

    compacto.reservar();
    compacto.devolver(1000);

    expect(compacto.getKmDesdeUltimoMantenimiento()).toBe(2000);
  })

  it("Debe retornar 0 la cantidad de alquileres desde ultimo mantenimiento al crearse", () => {
    expect(compacto.getAlquileresDesdeUltimoMantenimiento()).toBe(0);
  })

  it("Debe acumular la cantidad de alquileres al devolver el vehiculo", () => {
    compacto.reservar();
    compacto.devolver(500);

    expect(compacto.getAlquileresDesdeUltimoMantenimiento()).toBe(1);
  })

  it("Debe acumular múltiples alquileres", () => {
    for(let i = 0; i < 3; i++) {
      compacto.reservar();
      compacto.devolver(500);
      compacto.setEstado(new EstadoDisponible());
    }

    expect(compacto.getAlquileresDesdeUltimoMantenimiento()).toBe(3);
  })


  // Disparadores de Mantenimiento
  it("Debe devolver falso cuando no cumple ningún criterio", () => {
    expect(compacto.necesitaMantenimiento()).toBe(false);
  })

  it("Criterio 1: Debe devolver 'true' si supera los 10000 kilometros", () => {
    compacto.reservar();
    compacto.devolver(10100);
    expect(compacto.necesitaMantenimiento()).toBe(true);
  })

  it("Criterio 2: Debe devolver 'true' si pasaron 12 meses desde su último mantenimiento", () => {
    // falta fecha
  })

  it("Criterio 3: Debe devolver 'true' después de 5 alquileres", () => {
    for(let i = 0; i < 5; i++) {
      compacto.reservar();
      compacto.devolver(500);
    }
    expect(compacto.necesitaMantenimiento()).toBe(true);
  })

  it("Criterio 3: Debe devolver 'false' con 4 alquileres", () => {
    for(let i = 0; i < 4; i++) {
      compacto.reservar();
      compacto.devolver(100);
    }
    expect(compacto.necesitaMantenimiento()).toBe(false);
  })

  it("Debe resetear los valores de los contadores de mantenimiento", () => {
    compacto.reservar();
    compacto.devolver(5000);
    compacto.resetearContadoresMantenimiento();
    expect(compacto.getKmDesdeUltimoMantenimiento()).toBe(0);
    expect(compacto.getAlquileresDesdeUltimoMantenimiento()).toBe(0);
    // falta fecha
  })

})