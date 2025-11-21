import Cliente from "../src/cliente";
import Reserva from "../src/reserva"
import Vehiculo from "../src/Vehiculo/vehiculo";
import { ITemporada } from "../src/Temporada/iTemporada";

describe("Test de la clase Reserva", () => {

  let clienteMock: jest.Mocked<Cliente>;
  let vehiculoMock: jest.Mocked<Vehiculo>;
  let fechaInicio: Date;
  let fechaFin: Date;
  let temporadaMock: jest.Mocked<ITemporada>;
  let reserva: Reserva;

  beforeEach(() => {
    clienteMock = jest.mocked(new Cliente());
    vehiculoMock = {
      calcularTarifaConTemporada: jest.fn(),
      devolver: jest.fn()
    } as unknown as jest.Mocked<Vehiculo>

    fechaInicio = new Date(2025, 9, 27)
    fechaFin = new Date(2025, 9, 31)

    temporadaMock = {
      ajustar: jest.fn(),
      getNombre: jest.fn()
    } as jest.Mocked<ITemporada>

    reserva = new Reserva(clienteMock, vehiculoMock, fechaInicio, fechaFin, temporadaMock);
  })
  afterEach(() => {})

  it("Debe ser una instancia de Reserva", () => {
    expect(reserva).toBeInstanceOf(Reserva);
  })

  it("Debe crear una Reserva con los valores iniciales", () => {
    expect(reserva.getIdReserva()).toBe("");
    expect(reserva.getCliente()).toBe(clienteMock);
    expect(reserva.getVehiculo()).toBe(vehiculoMock);
    expect(reserva.getFechaDeInicio()).toBe(fechaInicio);
    expect(reserva.getFechaDeFin()).toBe(fechaFin);
    expect(reserva.getEstrategiaTemporada()).toBe(temporadaMock);
    expect(reserva.getKilometrosRecorridos()).toBe(0);
    expect(reserva.estaFinalizada()).toBe(false);
  })

  it("Debe setear el id de la Reserva", () => {
    reserva.setIdReserva("R-1");
    expect(reserva.getIdReserva()).toBe("R-1");
  })

  // CALCULAR DIAS
  it("Debe calcular los dias de reserva", () => {
    const dias = reserva.calcularDias();
    expect(dias).toBe(4);
  })

  // REGISTRO DE LOS KILOMETROS RECORRIDOS
  it("Debe registrar los kilometros recorridos correctamente", () => {
    reserva.setKilometrosRecorridos(1200);
    expect(reserva.getKilometrosRecorridos()).toBe(1200);
  })

  it("Debe lanzar error si la reserva está finalizada", () => {
    reserva.setKilometrosRecorridos(500);
    vehiculoMock.devolver;
    reserva.finalizarReserva();

    expect(() => reserva.setKilometrosRecorridos(600)).toThrow("No se puede modificar el kilometraje de una reserva finalizada");
  })

  // CALCULO DEL COSTO TOTAL
  it("Debe calcular el costo total de la reserva de forma correcta", () => {
    vehiculoMock.calcularTarifaConTemporada.mockReturnValue(500);
    
    reserva.setKilometrosRecorridos(150);
    expect(reserva.calcularCostoTotal()).toBe(500);
    expect(vehiculoMock.calcularTarifaConTemporada).toHaveBeenCalledWith(4, 150, temporadaMock);
  })

  it("Debe lanzar error si no se registro previamente los kilometros recorridos", () => {
    expect(() => reserva.calcularCostoTotal()).toThrow("Debe registrar el kilometraje antes de calcular el costo");
  })

  // FINALIZAR RESERVA
  it("Debe finalizar la reserva de forma correcta", () => {
    expect(reserva.estaFinalizada()).toBe(false);
    reserva.setKilometrosRecorridos(5000);
    reserva.finalizarReserva()
    expect(reserva.estaFinalizada()).toBe(true);
  })

  it("Debe lanzar error si la reserva está finalizada", () => {
    reserva.setKilometrosRecorridos(1000);
    reserva.finalizarReserva();
    expect(() => reserva.finalizarReserva()).toThrow("La reserva está finalizada.");
  })

  it("Debe lanzar error si no se registro los kilometros", () => {
    expect(() => reserva.finalizarReserva()).toThrow("Debe registrar el kilometraje antes de finalizar la reserva");
  })
  
});