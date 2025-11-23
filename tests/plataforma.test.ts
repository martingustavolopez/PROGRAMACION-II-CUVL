import Plataforma from "../src/plataforma";
import Vehiculo from "../src/Vehiculo/vehiculo";
import ServicioEstadisticas from "../src/Estadistica/servicioEstadisticas";
import Reserva from "../src/reserva";
import { ITemporada } from "../src/Temporada/iTemporada";
import Cliente from "../src/cliente";

describe("Test clase Plataforma", () => {

    let plataforma: Plataforma;

    let vehiculoMock: jest.Mocked<Vehiculo>;
    let clienteMock: jest.Mocked<Cliente>
    let reservaMock: jest.Mocked<Reserva>;
    let temporadaMock: jest.Mocked<ITemporada>;
    let estadisticasMock: jest.Mocked<ServicioEstadisticas>;

    beforeEach(() => {
        jest.clearAllMocks();

        plataforma = new Plataforma();

        vehiculoMock = {
            getMatricula: jest.fn().mockReturnValue("MND231"),
            estaDisponible: jest.fn().mockReturnValue(true),
            reservar: jest.fn(),
            agregarMantenimiento: jest.fn(),
            setEstado: jest.fn()
        } as unknown as jest.Mocked<Vehiculo>;

        clienteMock = {
            getId: jest.fn().mockReturnValue(1),
            agregarReserva: jest.fn()
        } as unknown as jest.Mocked<Cliente>;

        reservaMock = {
            getIdReserva: jest.fn().mockReturnValue(1),
            getCliente: jest.fn().mockReturnValue(clienteMock),
            getVehiculo: jest.fn().mockReturnValue(vehiculoMock),
            getFechaDeInicio: jest.fn(),
            getFechaDeFin: jest.fn(),
        } as unknown as jest.Mocked<Reserva>;

        temporadaMock = {
            calcularPrecio: jest.fn().mockReturnValue(100),
        } as unknown as jest.Mocked<ITemporada>;

        estadisticasMock = {
            vehiculoMasAlquilado: jest.fn().mockReturnValue(vehiculoMock),
            vehiculoMenosAlquilado: jest.fn().mockReturnValue(vehiculoMock),
            vehiculoMasRentable: jest.fn().mockReturnValue(vehiculoMock),
            vehiculoMenosRentable: jest.fn().mockReturnValue(vehiculoMock),
            porcentajeDeOcupacionFlota: jest.fn().mockReturnValue(75)
        } as unknown as jest.Mocked<ServicioEstadisticas>;
    })

    it("Debe ser una instancia de plataforma", () => {
        expect(plataforma).toBeInstanceOf(Plataforma);
    })

    it("Debe crear una Reserva con los valores iniciales", () => {
        expect(plataforma.getVehiculos()).toEqual([]);
        expect(plataforma.getReservas()).toEqual([]);
        expect(plataforma.getClientes()).toEqual([]);
    })

    // Ver bien cómo manejar el tema de estadisticas.
    it("Debe crear instancia de ServicioEstadisticas", () => {
        expect(plataforma.getEstadisticas()).toBeDefined();
    })

    // Gestión de Vehículos
    it("Debe agregar un vehículo de forma correcta", () => {
        plataforma.agregarVehiculo(vehiculoMock);
        expect(plataforma.getVehiculos()).toHaveLength(1);
        expect(plataforma.getVehiculos()[0]).toBe(vehiculoMock);
    })

    it("Debe lanzar un error si el vehículo con esa matrícula ya existe", () => {
        plataforma.agregarVehiculo(vehiculoMock);
        expect(() => {
            plataforma.agregarVehiculo(vehiculoMock);
        }).toThrow(`Ya existe un vehículo con la matrícula ${vehiculoMock.getMatricula()}`)
    })

    it("Debe buscar el vehículo por su matrícula de forma correcta", () => {
        plataforma.agregarVehiculo(vehiculoMock);
        expect(plataforma.buscarVehiculo("MND231")).toBe(vehiculoMock);
    })

    it("Debe devolver null si no existe el vehículo con esa matrícula", () => {
        expect(plataforma.buscarVehiculo("ABC123")).toBeNull();
    })

    it("Debe devolver solo vehículos disponibles", () => {
        let vehiculoMock2: jest.Mocked<Vehiculo>;
        vehiculoMock2 = {
            getMatricula: jest.fn().mockReturnValue("NMI937"),
            estaDisponible: jest.fn().mockReturnValue(false),
        } as unknown as jest.Mocked<Vehiculo>;

        plataforma.agregarVehiculo(vehiculoMock);
        plataforma.agregarVehiculo(vehiculoMock2);
        expect(plataforma.getVehiculosDisponibles()).toHaveLength(1);
        expect(plataforma.getVehiculosDisponibles()[0]).toBe(vehiculoMock);
    })

    it("Debe devoler un array vacío si no hay vehículos disponibles", () => {
        vehiculoMock.estaDisponible.mockReturnValue(false);
        plataforma.agregarVehiculo(vehiculoMock);
        expect(plataforma.getVehiculosDisponibles()).toEqual([]);
    })

    // Gestión de Clientes
    it("Debe agregar un cliente de forma correcta", () => {
        plataforma.agregarCliente(clienteMock);
        expect(plataforma.getClientes()).toHaveLength(1);
        expect(plataforma.getClientes()[0]).toBe(clienteMock);
    })

    it("Debe lanzar un error si el cliente con ese id ya existe", () => {
        plataforma.agregarCliente(clienteMock);
        expect(() => {
            plataforma.agregarCliente(clienteMock);
        }).toThrow(`Ya existe un cliente con el id ${clienteMock.getId()}`)
    })
    
    it("Debe buscar el cliente por el id de forma correcta", () => {
        plataforma.agregarCliente(clienteMock);
        expect(plataforma.buscarCliente(1)).toBe(clienteMock);
    })

    it("Debe devolver null si no existe el cliente con ese id", () => {
        expect(plataforma.buscarCliente(11)).toBeNull();
    })

    // Gestión de Reservas
    it("Debe crear una reserva de forma correcta", () => {
        plataforma.agregarCliente(clienteMock);
        plataforma.agregarVehiculo(vehiculoMock);
        const fechaInicio = new Date(2025, 11, 3);
        const fechaFin = new Date(2025, 11, 10);

        plataforma.crearReserva(1, "MND231", fechaInicio, fechaFin, temporadaMock);
        expect(plataforma.getReservas()).toHaveLength(1);
        expect(clienteMock.agregarReserva).toHaveBeenCalled();
        expect(vehiculoMock.reservar).toHaveBeenCalled();
    })

    it("NO debe poder crear la reserva si el cliente no exise, lanza error", () => {
        plataforma.agregarCliente(clienteMock);
        plataforma.agregarVehiculo(vehiculoMock);
        const fechaInicio = new Date(2025, 11, 3);
        const fechaFin = new Date(2025, 11, 10);
        expect(() => {
            plataforma.crearReserva(11, "MND231", fechaInicio, fechaFin, temporadaMock);
        }).toThrow(`Cliente con ID 11 no encontrado`);
    })

    it("NO debe poder crear la reserva si el vehiculo no exise, lanza error", () => {
        plataforma.agregarCliente(clienteMock);
        plataforma.agregarVehiculo(vehiculoMock);
        const fechaInicio = new Date(2025, 11, 3);
        const fechaFin = new Date(2025, 11, 10);
        expect(() => {
            plataforma.crearReserva(1, "XVT123", fechaInicio, fechaFin, temporadaMock);
        }).toThrow(`Vehículo con matrícula XVT123 no encontrado`);
    })

    it("NO debe poder crear la reserva si el vehiculo no esta disponible, lanza error", () => {
        plataforma.agregarCliente(clienteMock);
        plataforma.agregarVehiculo(vehiculoMock);
        vehiculoMock.estaDisponible.mockReturnValue(false);
        const fechaInicio = new Date(2025, 11, 3);
        const fechaFin = new Date(2025, 11, 10);
        expect(() => {
            plataforma.crearReserva(1, "MND231", fechaInicio, fechaFin, temporadaMock);
        }).toThrow(`Vehículo ${vehiculoMock.getMatricula()} no disponible para las fechas solicitadas`);
    })

    it("NO debe poder crear la reserva si la fecha inicio es mayor o igual que la de fin, lanza error", () => {
        plataforma.agregarCliente(clienteMock);
        plataforma.agregarVehiculo(vehiculoMock);
        const fechaInicio = new Date(2025, 11, 13);
        const fechaFin = new Date(2025, 11, 10);
        expect(() => {
            plataforma.crearReserva(1, "MND231", fechaInicio, fechaFin, temporadaMock);
        }).toThrow("La fecha de inicio debe ser anterior a la fecha de fin");
    })

    // FALTAN ALGUNOS DE ACA EN EL MEDIO







    // Estadisticas
    it("Debe obtener el vehículo más alquilado", () => {
        plataforma.setEstadisticas(estadisticasMock);
        const fechaInicio = new Date(2025, 1, 1);
        const fechaFin = new Date(2025, 12, 31);
        expect(plataforma.getVehiculoMasAlquilado(fechaInicio, fechaFin)).toBe(vehiculoMock);
        expect(estadisticasMock.vehiculoMasAlquilado).toHaveBeenCalledWith(fechaInicio, fechaFin);
    })

    it("Debe obtener el vehículo menos alquilado", () => {
        plataforma.setEstadisticas(estadisticasMock);
        const fechaInicio = new Date(2025, 1, 1);
        const fechaFin = new Date(2025, 12, 31);
        expect(plataforma.getVehiculoMenosAlquilado(fechaInicio, fechaFin)).toBe(vehiculoMock);
        expect(estadisticasMock.vehiculoMenosAlquilado).toHaveBeenCalledWith(fechaInicio, fechaFin);
    })

    it("Debe obtener el vehículo más rentable", () => {
        plataforma.setEstadisticas(estadisticasMock);
        expect(plataforma.getVehiculoMasRentable()).toBe(vehiculoMock)
        expect(estadisticasMock.vehiculoMasRentable).toHaveBeenCalled();
    })

    it("Debe obtener el vehículo menos rentable", () => {
        plataforma.setEstadisticas(estadisticasMock);
        expect(plataforma.getVehiculoMenosRentable()).toBe(vehiculoMock)
        expect(estadisticasMock.vehiculoMenosRentable).toHaveBeenCalled();
    })

    it("Debe obtener el porcentaje de ocupación de flota", () => {
        plataforma.setEstadisticas(estadisticasMock);
        expect(plataforma.getPorcentajeOcupacionFlota()).toBe(75);
        expect(estadisticasMock.porcentajeDeOcupacionFlota).toHaveBeenCalled();
    })

});