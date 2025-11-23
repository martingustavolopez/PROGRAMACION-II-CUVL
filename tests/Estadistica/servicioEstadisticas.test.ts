import Reserva from "../../src/reserva";
import ServicioEstadisticas from "../../src/Estadistica/servicioEstadisticas";
import Vehiculo from "../../src/Vehiculo/vehiculo";

describe("Test de la clase ServicioEstadisticas", () => {
  let estadisticas: ServicioEstadisticas;
  let vehiculoMock1: jest.Mocked<Vehiculo>;
  let vehiculoMock2: jest.Mocked<Vehiculo>;
  let vehiculoMock3: jest.Mocked<Vehiculo>;
  let reservaMock1: jest.Mocked<Reserva>;
  let reservaMock2: jest.Mocked<Reserva>;
  let reservaMock3: jest.Mocked<Reserva>;
  let reservaMock4: jest.Mocked<Reserva>;

  beforeEach(() => {
    jest.clearAllMocks();
    vehiculoMock1 = {
      getMatricula: jest.fn().mockReturnValue("MUC973"),
      getEstado: jest.fn().mockReturnValue({ getNombre: jest.fn().mockReturnValue("En Alquiler") }),
      getMantenimientos: jest.fn().mockReturnValue([
        { getCosto: jest.fn().mockReturnValue(700) },
      ])
    } as unknown as jest.Mocked<Vehiculo>

    vehiculoMock2 = {
      getMatricula: jest.fn().mockReturnValue("NMD212"),
      getEstado: jest.fn().mockReturnValue({ getNombre: jest.fn().mockReturnValue("Disponible") }),
      getMantenimientos: jest.fn().mockReturnValue([
        { getCosto: jest.fn().mockReturnValue(1000) },
        { getCosto: jest.fn().mockReturnValue(500) }
      ])
    } as unknown as jest.Mocked<Vehiculo>

    vehiculoMock3 = {
      getMatricula: jest.fn().mockReturnValue("LMR894"),
      getEstado: jest.fn().mockReturnValue({ getNombre: jest.fn().mockReturnValue("En Alquiler") }),
      getMantenimientos: jest.fn().mockReturnValue([])
    } as unknown as jest.Mocked<Vehiculo>

    reservaMock1 = {
      getVehiculo: jest.fn().mockReturnValue(vehiculoMock1),
      getFechaDeInicio: jest.fn().mockReturnValue(new Date(2025, 10, 3)),
      getFechaDeFin: jest.fn().mockReturnValue(new Date(2025, 10, 6)),
      getKilometrosRecorridos: jest.fn().mockReturnValue(300),
      calcularCostoTotal: jest.fn().mockReturnValue(3000)
    } as unknown as jest.Mocked<Reserva>

    reservaMock2 = {
      getVehiculo: jest.fn().mockReturnValue(vehiculoMock2),
      getFechaDeInicio: jest.fn().mockReturnValue(new Date(2025, 10, 1)),
      getFechaDeFin: jest.fn().mockReturnValue(new Date(2025, 10, 5)),
      getKilometrosRecorridos: jest.fn().mockReturnValue(500),
      calcularCostoTotal: jest.fn().mockReturnValue(5000)
    } as unknown as jest.Mocked<Reserva>

    reservaMock3 = {
      getVehiculo: jest.fn().mockReturnValue(vehiculoMock3),
      getFechaDeInicio: jest.fn().mockReturnValue(new Date(2025, 10, 3)),
      getFechaDeFin: jest.fn().mockReturnValue(new Date(2025, 10, 7)),
      getKilometrosRecorridos: jest.fn().mockReturnValue(200),
      calcularCostoTotal: jest.fn().mockReturnValue(2000)
    } as unknown as jest.Mocked<Reserva>

    reservaMock4 = {
      getVehiculo: jest.fn().mockReturnValue(vehiculoMock2),
      getFechaDeInicio: jest.fn().mockReturnValue(new Date(2025, 10, 3)),
      getFechaDeFin: jest.fn().mockReturnValue(new Date(2025, 10, 5)),
      getKilometrosRecorridos: jest.fn().mockReturnValue(100),
      calcularCostoTotal: jest.fn().mockReturnValue(1000)
    } as unknown as jest.Mocked<Reserva>

  })

  // Vehículo más alquilado
  it("Debe devolver el vehículo más alquilado en el rango de fechas", () => {
    const vehiculos = [vehiculoMock1, vehiculoMock2, vehiculoMock3];
    const reservas = [reservaMock1, reservaMock2, reservaMock3, reservaMock4];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    let fechaInicio = new Date(2025, 10, 1);
    let fechaFin = new Date(2025, 10, 31);

    const resultado = estadisticas.vehiculoMasAlquilado(fechaInicio, fechaFin);
    expect(resultado).toBe(vehiculoMock2);
    expect(resultado.getMatricula()).toBe("NMD212");
  })

  it("Debe lanzar error si no hay vehiculos alquilados para esas fechas", () => {
    const vehiculos = [vehiculoMock1, vehiculoMock2, vehiculoMock3];
    const reservas = [reservaMock1, reservaMock2, reservaMock3, reservaMock4];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    let fechaInicio = new Date(2025, 9, 1);
    let fechaFin = new Date(2025, 9, 30);
    expect(() => estadisticas.vehiculoMasAlquilado(fechaInicio, fechaFin)).toThrow(
      "No hay vehículos alquilados en las fechas especificadas."
    );
  })

  it("Vehiculo Más Alquilado lanza error si queda undefined", () => {
    const vehiculos = [vehiculoMock1, vehiculoMock2, vehiculoMock3];
    const reservas = [reservaMock1, reservaMock2, reservaMock3, reservaMock4];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    let fechaInicio = new Date(2025, 9, 1);
    let fechaFin = new Date(2025, 9, 31);

    // MOCK: Map falso
    const fakeMap = {
      size: 1,
      forEach: jest.fn(),
    }

    // Mock del método cantAlquileresPorVehiculo
    jest.spyOn(estadisticas as any, "cantAlquileresPorVehiculo")
      .mockReturnValue(fakeMap);

    expect(() =>
      estadisticas.vehiculoMasAlquilado(fechaInicio, fechaFin)
    ).toThrow("Error al determinar el vehiculo más alquilado.");
  });

  // Vehículo menos alquilado
  it("Debe devolver el vehículo menos alquilado en el rango de fechas", () => {
    const vehiculos = [vehiculoMock1, vehiculoMock2, vehiculoMock3];
    const reservas = [reservaMock1, reservaMock2, reservaMock3, reservaMock4];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    let fechaInicio = new Date(2025, 10, 1);
    let fechaFin = new Date(2025, 10, 31);

    const resultado = estadisticas.vehiculoMenosAlquilado(fechaInicio, fechaFin);
    expect(resultado).toBe(vehiculoMock1);
    expect(resultado.getMatricula()).toBe("MUC973");
  })

  it("Debe lanzar error si no hay vehiculos alquilados para esas fechas", () => {
    const vehiculos = [vehiculoMock1, vehiculoMock2, vehiculoMock3];
    const reservas = [reservaMock1, reservaMock2, reservaMock3, reservaMock4];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    let fechaInicio = new Date(2025, 9, 1);
    let fechaFin = new Date(2025, 9, 31);
    expect(() => estadisticas.vehiculoMenosAlquilado(fechaInicio, fechaFin)).toThrow(
      "No hay vehículos alquilados en las fechas especificadas."
    );
  })

  it("Vehiculo Menos Alquilado lanza error si queda undefined", () => {
    const vehiculos = [vehiculoMock1, vehiculoMock2, vehiculoMock3];
    const reservas = [reservaMock1, reservaMock2, reservaMock3, reservaMock4];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    let fechaInicio = new Date(2025, 9, 1);
    let fechaFin = new Date(2025, 9, 31);

    // MOCK: Map falso
    const fakeMap = {
      size: 1,
      forEach: jest.fn(),
    }

    // Mock del método cantAlquileresPorVehiculo
    jest.spyOn(estadisticas as any, "cantAlquileresPorVehiculo")
      .mockReturnValue(fakeMap);

    expect(() =>
      estadisticas.vehiculoMenosAlquilado(fechaInicio, fechaFin)
    ).toThrow("Error al determinar el vehiculo menos alquilado.");
  });

  // Vehículo con mayor rentabilidad
  it("Debe retornar el vehículo con más rentabilidad", () => {
    const vehiculos = [vehiculoMock1, vehiculoMock2, vehiculoMock3];
    const reservas = [reservaMock1, reservaMock2, reservaMock3, reservaMock4];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    const vehicMasRentable = estadisticas.vehiculoMasRentable();

    // vehiculoMock1: ingresos 3000 - costo 700 = 2300
    // vehiculoMock2: ingresos (5000 + 1000) - costo (1000 + 500) = 4500
    // vehiculoMock3: ingresos 2000 - costo 0 = 2000
    expect(vehicMasRentable).toBe(vehiculoMock2);
  })

  it("Debe lanzar error si no hay vehículos en la flota", () => {
    const vehiculos: Vehiculo[] = [];
    const reservas: Reserva[] = [];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    expect(() => estadisticas.vehiculoMasRentable()).toThrow(
      "No hay vehiculos en la flota"
    );
  })

  it("Vehiculo Más Rentable lanza error si queda undefined", () => {
    const vehiculos = [vehiculoMock1, vehiculoMock2, vehiculoMock3];
    const reservas = [reservaMock1, reservaMock2, reservaMock3, reservaMock4];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);

    // Mock del método cantAlquileresPorVehiculo
    jest.spyOn(estadisticas as any, "calcularRentabilidad")
      .mockReturnValue(-Infinity);

    expect(() =>
      estadisticas.vehiculoMasRentable()
    ).toThrow("Error al determinar el vehiculo más rentable.");
  });

  // Vehículo con menor rentabilidad
  it("Debe retornar el vehículo con menor rentabilidad", () => {
    const vehiculos = [vehiculoMock1, vehiculoMock2, vehiculoMock3];
    const reservas = [reservaMock1, reservaMock2, reservaMock3, reservaMock4];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    const vehicMenosRentable = estadisticas.vehiculoMenosRentable();

    // vehiculoMock1: ingresos 3000 - costo 700 = 2300
    // vehiculoMock2: ingresos (5000 + 1000) - costo (1000 + 500) = 4500
    // vehiculoMock3: ingresos 2000 - costo 0 = 2000
    expect(vehicMenosRentable).toBe(vehiculoMock3);
  })

  it("Debe lanzar error si no hay vehículos en la flota", () => {
    const vehiculos: Vehiculo[] = [];
    const reservas: Reserva[] = [];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    expect(() => estadisticas.vehiculoMenosRentable()).toThrow(
      "No hay vehiculos en la flota"
    );
  })

  it("Vehiculo Menos Rentable lanza error si queda undefined", () => {
    const vehiculos = [vehiculoMock1, vehiculoMock2, vehiculoMock3];
    const reservas = [reservaMock1, reservaMock2, reservaMock3, reservaMock4];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);

    // Mock del método cantAlquileresPorVehiculo
    jest.spyOn(estadisticas as any, "calcularRentabilidad")
      .mockReturnValue(Infinity);

    expect(() =>
      estadisticas.vehiculoMenosRentable()
    ).toThrow("Error al determinar el vehiculo menos rentable.");
  });

  // Porcentaje de ocupación de la flota
  it("Debe calcular el porcentaje de ocupación de la flota de forma correcta", () => {
    const vehiculos: Vehiculo[] = [vehiculoMock1, vehiculoMock2, vehiculoMock3];
    const reservas: Reserva[] = [];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    expect(vehiculoMock1.getEstado().getNombre()).toBe("En Alquiler")
    expect(vehiculoMock2.getEstado().getNombre()).toBe("Disponible")
    expect(vehiculoMock3.getEstado().getNombre()).toBe("En Alquiler")
    // 2 de 3 vehiculos están alquilados = 66.666..% => 66.67
    expect(estadisticas.porcentajeDeOcupacionFlota()).toBeCloseTo(66.67, 1);
  })

  it("Debe devolver 0 el porcentaje de ocupación de la flota si no hay vehiculos", () => {
    const vehiculos: Vehiculo[] = [];
    const reservas: Reserva[] = [];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    expect(estadisticas.porcentajeDeOcupacionFlota()).toBe(0);
  })

  it("Debe devolver 0 también si no hay ningún vehiculo en alquiler", () => {
    vehiculoMock1.getEstado = jest.fn().mockReturnValue(
      { getNombre: jest.fn().mockReturnValue("Disponible") }
    )
    vehiculoMock3.getEstado = jest.fn().mockReturnValue(
      { getNombre: jest.fn().mockReturnValue("Disponible") }
    )
    const vehiculos: Vehiculo[] = [vehiculoMock1, vehiculoMock2, vehiculoMock3];
    const reservas: Reserva[] = [];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    expect(estadisticas.porcentajeDeOcupacionFlota()).toBe(0);
  })

  it("Debe devolver 100 si todos los vehiculos están en alquiler", () => {
    vehiculoMock2.getEstado = jest.fn().mockReturnValue(
      { getNombre: jest.fn().mockReturnValue("En Alquiler") }
    )
    const vehiculos: Vehiculo[] = [vehiculoMock1, vehiculoMock2, vehiculoMock3];
    const reservas: Reserva[] = [];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    expect(estadisticas.porcentajeDeOcupacionFlota()).toBe(100);
  })

  // Calcular Rentabilidad
  it("Debe calcular la rentabilidad de un vehículo de forma correcta", () => {
    const vehiculos: Vehiculo[] = [vehiculoMock2];
    const reservas: Reserva[] = [reservaMock2, reservaMock4];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    expect(estadisticas.calcularRentabilidad(vehiculoMock2)).toBe(4500);
    // Ingresos: 5000 + 1000 = 6000
    // Costos: 1000 + 500 = 1500
    // Rentabilidad: 6000 - 1500 = 4500
  })

  it("Debe devolver una rentabilidad negativa si los costos superan los ingresos", () => {
    vehiculoMock1.getMantenimientos = jest.fn().mockReturnValue([
      { getCosto: jest.fn().mockReturnValue(5000) }
    ])
    const vehiculos: Vehiculo[] = [vehiculoMock1];
    const reservas: Reserva[] = [reservaMock1];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    expect(estadisticas.calcularRentabilidad(vehiculoMock1)).toBe(-2000);
    // Ingresos: 3000
    // Costos: 5000
    // Rentabilidad: -2000
  })

  it("Se debe ignorar reserva que no tenga kilometros recorridos", () => {
    let reservaMock5: jest.Mocked<Reserva>;
    reservaMock5 = {
      getVehiculo: jest.fn().mockReturnValue(vehiculoMock1),
      getFechaDeInicio: jest.fn().mockReturnValue(new Date(2025, 10, 4)),
      getFechaDeFin: jest.fn().mockReturnValue(new Date(2025, 10, 8)),
      getKilometrosRecorridos: jest.fn().mockReturnValue(0),
      calcularCostoTotal: jest.fn().mockReturnValue(1000)
    } as unknown as jest.Mocked<Reserva>
    const vehiculos: Vehiculo[] = [vehiculoMock1];
    const reservas: Reserva[] = [reservaMock1, reservaMock5];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    expect(estadisticas.calcularRentabilidad(vehiculoMock1)).toBe(2300);
    // Solo se cuenta la reservaMock3
    // Ingresos: 3000
    // Costos: 700
    // Rentabilidad: 2300
  })

})