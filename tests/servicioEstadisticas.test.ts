import Reserva from "../src/reserva";
import ServicioEstadisticas from "../src/servicioEstadisticas";
import Vehiculo from "../src/Vehiculo/vehiculo";

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

  // VEHICULO MÁS ALQUILADO
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

  // VEHICULO MENOS ALQUILADO
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

  it("Debe devolver el vehículo menos alquilado en el rango de fechas", () => {
    const vehiculos = [vehiculoMock1, vehiculoMock2, vehiculoMock3];
    const reservas = [reservaMock1, reservaMock2, reservaMock3, reservaMock4];
    estadisticas = new ServicioEstadisticas(vehiculos, reservas);
    let fechaInicio = new Date(2025, 9, 1);
    let fechaFin = new Date(2025, 9, 31);
    expect(() => estadisticas.vehiculoMenosAlquilado(fechaInicio, fechaFin)).toThrow(
      "No hay vehículos alquilados en las fechas especificadas." 
    );
  })

  // VEHICULO MAYOR RENTABILIDAD
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

  // VEHICULO CON MENOR RENTABILIDAD
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

})