import Compacto from "../../src/Vehiculo/compacto"
import EstadoDisponible from "../../src/EstadoVehiculo/estadoDisponible";
import { ITemporada } from "../../src/Temporada/iTemporada";
import { IEstadoVehiculo } from "../../src/EstadoVehiculo/iestadoVehiculo";
import Mantenimiento from "../../src/mantenimiento";
import Vehiculo from "../../src/Vehiculo/vehiculo";

describe("Test de la clase Compacto", () => {
  let compacto: Compacto;
  let estadoMocK: jest.Mocked<IEstadoVehiculo>;
  let mantenimientoMock: jest.Mocked<Mantenimiento>;
  let temporadaMock: jest.Mocked<ITemporada>;

  beforeEach(() => {
    jest.clearAllMocks();
    compacto = new Compacto("TYU678", 10000);

    jest.useFakeTimers();
    jest.setSystemTime(new Date(2025, 11 , 1));

    estadoMocK = {
      getNombre: jest.fn(),
      reservar: jest.fn(),
      devolver: jest.fn(),
      puedeReservar: jest.fn(),
      enviarAMantenimiento: jest.fn(),
      completarMantenimiento: jest.fn()
    } as unknown as jest.Mocked<IEstadoVehiculo>

    mantenimientoMock = {
      getCosto: jest.fn().mockReturnValue(1000),
      getDescripcion: jest.fn(),
      getFecha: jest.fn()
    } as unknown as jest.Mocked<Mantenimiento>

    temporadaMock = {
      ajustar: jest.fn(),
      getNombre: jest.fn()
    } as unknown as jest.Mocked<ITemporada>
  });

  it("Es una instancia de la clase Compacto", () => {
    expect(compacto).toBeInstanceOf(Compacto);
    expect(compacto).toBeInstanceOf(Vehiculo);
  })

  it("Debe crear un vehículo Compacto con sus valores iniciales correctos", () => {
    const vehiculoCompacto = new Compacto();
    expect(vehiculoCompacto.getMatricula()).toBe("");
    expect(vehiculoCompacto.getKilometraje()).toBe(0);
    expect(vehiculoCompacto.getMantenimientos()).toEqual([]);
    expect(vehiculoCompacto.getEstado()).toBeInstanceOf(EstadoDisponible);
    expect(vehiculoCompacto.getKmDesdeUltimoMantenimiento()).toBe(0);
    expect(vehiculoCompacto.getAlquileresDesdeUltimoMantenimiento()).toBe(0);
  })

  it("Debe inicializar la fecha de último mantenimiento de forma correcta", () => {
    const fechaMantenimiento = compacto.getFechaUltimoMantenimiento()
    expect(fechaMantenimiento).toBeInstanceOf(Date);
    expect(fechaMantenimiento.getTime()).toBe(new Date(2025, 11, 1).getTime());
  })

  // Getters
  it("Debe obtenerse la matricula de forma correcta", () => {
    expect(compacto.getMatricula()).toBe("TYU678");
  })

  it("Debe obtenerse el estado de forma correcta", () => {
    expect(compacto.getEstado()).toBeInstanceOf(EstadoDisponible);
    expect(compacto.getEstado().getNombre()).toBe("Disponible");
  })

  it("Debe obtenerse el kilometraje de forma correcta", () => {
    expect(compacto.getKilometraje()).toBe(10000);
  })

  it("Debe obtenerse un array del mantenimiento de forma correcta", () => {
    compacto.agregarMantenimiento(mantenimientoMock);
    const mantenimientos1 = compacto.getMantenimientos();
    const mantenimientos2 = compacto.getMantenimientos();
    expect(mantenimientos1).toEqual(mantenimientos2);
    expect(mantenimientos1).not.toBe(mantenimientos2);
    expect(mantenimientos1).toHaveLength(1);
  })

  it("Debe obtenerse los km desde el ultimo mantenimiento de forma correcta", () => {
    expect(compacto.getKmDesdeUltimoMantenimiento()).toBe(0);
    compacto.reservar();
    compacto.devolver(500);
    expect(compacto.getKmDesdeUltimoMantenimiento()).toBe(500);
  })

  it("Debe obtenerse fecha del último mantenimietno de forma correcta", () => {
    expect(compacto.getFechaUltimoMantenimiento()).toBeInstanceOf(Date);
  })

  it("Debe obtenerse alquileres desde último mantenimiento de forma correcta", () => {
    expect(compacto.getAlquileresDesdeUltimoMantenimiento()).toBe(0);
    compacto.reservar();
    compacto.devolver(500);
    expect(compacto.getAlquileresDesdeUltimoMantenimiento()).toBe(1);
  })

  // Setters
  it("Debe setear la matricula de forma correcta", () => {
    const compactoNuevo = new Compacto();
    compactoNuevo.setMatricula("ABC123");
    expect(compactoNuevo.getMatricula()).toBe("ABC123");
  })

  it("Debe registrar el kilometraje de forma correcta", () => {
    const compactoNuevo = new Compacto();
    compactoNuevo.setKilometraje(10000);
    expect(compactoNuevo.getKilometraje()).toBe(10000);
  })

  it("Debe actualizar el kilometraje si es mayor", () => {
    expect(compacto.getKilometraje()).toBe(10000);
    compacto.setKilometraje(20000);
    expect(compacto.getKilometraje()).toBe(20000);
  })

  it("NO debe permitir registrar un kilometraje menor al actual", () => {
    compacto.setKilometraje(30000);
    expect(() => compacto.setKilometraje(25000)).toThrow("El kilometraje no puede ser menor al actual.");
  })

  // Gestión de Mantenimientos
  it("Deba agregarse un mantenimiento de forma correcto", () => {
    compacto.agregarMantenimiento(mantenimientoMock);
    expect(compacto.getMantenimientos()).toHaveLength(1);
    expect(compacto.getMantenimientos()[0]).toBe(mantenimientoMock);
  })

  it("Debe agregarse varios mantenimientos de forma correcta", () => {
    let mantenimientoMock2: jest.Mocked<Mantenimiento>
    mantenimientoMock2 = { } as unknown as jest.Mocked<Mantenimiento>

    let mantenimientoMock3: jest.Mocked<Mantenimiento>
    mantenimientoMock3 = { } as unknown as jest.Mocked<Mantenimiento>

    compacto.agregarMantenimiento(mantenimientoMock);
    compacto.agregarMantenimiento(mantenimientoMock2);
    compacto.agregarMantenimiento(mantenimientoMock3);
    expect(compacto.getMantenimientos()).toHaveLength(3);
  })

  it("Debe resetear los valores de los contadores de mantenimiento", () => {
    compacto.reservar();
    compacto.devolver(5000);
    compacto.reservar();
    compacto.devolver(3000);
    compacto.reservar();
    compacto.devolver(2500);

    expect(compacto.getKmDesdeUltimoMantenimiento()).toBe(10500);
    expect(compacto.getAlquileresDesdeUltimoMantenimiento()).toBe(3)

    jest.advanceTimersByTime(100 * 24 * 60 * 60 * 1000); // Avanzar 100 días

    compacto.resetearContadoresMantenimiento();
    expect(compacto.getKmDesdeUltimoMantenimiento()).toBe(0);
    expect(compacto.getAlquileresDesdeUltimoMantenimiento()).toBe(0);

    const fechaActual = new Date();
    expect(compacto.getFechaUltimoMantenimiento().getTime()).toBe(fechaActual.getTime());
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
    jest.advanceTimersByTime(366 * 24 * 60 * 60 * 1000); // Avanzar 365 días
    expect(compacto.necesitaMantenimiento()).toBe(true);
  })

  it("Criterio 2: Debe devolver 'false' si no pasaron 12 meses desde su último mantenimiento", () => {
    jest.advanceTimersByTime(365 * 24 * 60 * 60 * 1000); // Avanzar 365 días
    expect(compacto.necesitaMantenimiento()).toBe(false);
  })

  it("Criterio 3: Debe devolver 'true' después de 5 alquileres", () => {
    for(let i = 0; i < 5; i++) {
      compacto.reservar();
      compacto.devolver(500);
    }
    expect(compacto.getAlquileresDesdeUltimoMantenimiento()).toBe(5);
    expect(compacto.necesitaMantenimiento()).toBe(true);
  })

  it("Criterio 3: Debe devolver 'false' con 4 alquileres", () => {
    for(let i = 0; i < 4; i++) {
      compacto.reservar();
      compacto.devolver(100);
    }
    expect(compacto.getAlquileresDesdeUltimoMantenimiento()).toBe(4);
    expect(compacto.necesitaMantenimiento()).toBe(false);
  })

  // Gestión de Estado
  it("El método reservar debe reservar de forma correcta", () => {
    compacto.setEstado(estadoMocK);
    compacto.reservar();
    expect(estadoMocK.reservar).toHaveBeenCalledWith(compacto);
    expect(estadoMocK.reservar).toHaveBeenCalledTimes(1);
  })

  it("El método devolver debe actualizando kilometraje y contadores", () => {
    expect(compacto.getKilometraje()).toBe(10000);
    compacto.reservar();
    compacto.devolver(500);
    expect(compacto.getKilometraje()).toBe(10500);
    expect(compacto.getKmDesdeUltimoMantenimiento()).toBe(500);
    expect(compacto.getAlquileresDesdeUltimoMantenimiento()).toBe(1);
  })

  it("El método devolver debe devolver de forma correcta", () => {
    compacto.setEstado(estadoMocK);
    compacto.reservar();
    compacto.devolver(500);
    expect(estadoMocK.devolver).toHaveBeenCalledWith(compacto);
    expect(estadoMocK.devolver).toHaveBeenCalledTimes(1);
  })

  it("El método devolver debe lanzar error si recibe km negativos", () => {
    expect(() => compacto.devolver(-500)).toThrow(
      "El kilometraje no puede ser negativo ni cero"
    );
  })

  it("El método esta disponible debe devolver true cuando estado es Disponible", () => {
    expect(compacto.getEstado().getNombre()).toBe("Disponible");
    expect(compacto.estaDisponible()).toBe(true);
  })

  it("El método esta disponible debe devolver false cuando estado es En Alquiler", () => {
    expect(compacto.getEstado().getNombre()).toBe("Disponible");
    compacto.reservar()
    expect(compacto.getEstado().getNombre()).toBe("En Alquiler");
    expect(compacto.estaDisponible()).toBe(false);
  })

  it("El método esta disponible debe devolver false cuando estado es En Mantenimiento", () => {
    expect(compacto.getEstado().getNombre()).toBe("Disponible");
    compacto.reservar()
    compacto.devolver(2500);
    compacto.reservar()
    compacto.devolver(5000);
    compacto.reservar()
    compacto.devolver(3000);
    expect(compacto.getEstado().getNombre()).toBe("En Mantenimiento");
    expect(compacto.estaDisponible()).toBe(false);
  })

  // Cálculos de Tarifa
  it("Obtener la Tarifa Base de Compacto", () => {
    expect(compacto.getTarifaBase()).toBe(30);
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

})