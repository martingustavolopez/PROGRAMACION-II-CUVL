import Cliente from "../src/cliente";
import Reserva from "../src/reserva"
import Vehiculo from "../src/Vehiculo/vehiculo";
import Sedan from "../src/Vehiculo/sedan";
import { ITemporada } from "../src/Temporada/iTemporada";

describe("Test de la clase Reserva", () => {

  let reserva: Reserva;
  let fechaInicio: Date;
  let fechaFin: Date;
  let temporadaMock: jest.Mocked<ITemporada>;
  //let vehiculoMock: jest.Mocked<Vehiculo>;

  // Mock Cliente
  const clienteMock = {
    getNombre: jest.fn(),
    getid: jest.fn(),
    getReservas: jest.fn()
  } as unknown as Cliente;

  // Mock Vehiculo
  const vehiculoMock = {
    getMatricula: jest.fn(),
    getEstado: jest.fn(),
    getKilometraje: jest.fn(),
    devolver: jest.fn()
  } as unknown as Vehiculo;

  beforeEach(() => {
    fechaInicio = new Date(2025, 9, 27)
    fechaFin = new Date(2025, 9, 31)
    reserva = new Reserva(clienteMock, vehiculoMock, fechaInicio, fechaFin);

    temporadaMock = {
      ajustar: jest.fn(),
      getNombre: jest.fn()
    };
  })
  afterEach(() => {})

  it("Debe ser una instancia de Reserva", () => {
    expect(reserva).toBeInstanceOf(Reserva);
  })

  it("Debe crear una Reserva con los valores iniciales predeterminados", () => {
    expect(reserva.getCliente()).toBe(clienteMock);
    expect(reserva.getVehiculo()).toBe(vehiculoMock);
    expect(reserva.getFechaDeInicio()).toBe(fechaInicio);
    expect(reserva.getFechaDeFin()).toBe(fechaFin);
    expect(reserva.getKilometrosRecorridos()).toBe(0);
  })

  it("Debe registrar los kilometros recorridos correctamente", () => {
    reserva.setKilometrosRecorridos(12000);
    expect(reserva.getKilometrosRecorridos()).toBe(12000);
  })

  it("Debe calcular los dias de reserva", () => {
    const dias = reserva.calcularDias();
    expect(dias).toBe(4);
  })

  it("Debe calcular los dias de reserva (alternativa)", () => {
    const dias = reserva.calcularDiasAlternativa();
    expect(dias).toBe(4);
  })



  
  // Ver bien este test... me perdí que estoy testeando exactamente???
  /*it("Debe registrar el costo total de la reserva", () => {
    const dias = reserva.calcularDias();
    const kilometrosRecorridos = reserva.getKilometrosRecorridos();

    vehiculoMock.getTarifaBase.mockReturnValue(30)

    temporadaMock.ajustar.mockReturnValue(vehiculoMock.getTarifaBase());

    const costoTotal = vehiculoMock.calcularTarifaConTemporada(dias, kilometrosRecorridos, temporadaMock);
    reserva.setCostoTotal(costoTotal)

    expect(reserva.getCostoTotal()).toBe(1200);
  })*/

  it("Debe finalizar la reserva", () => {
    expect(reserva.getFinalizada()).toBe(false);
    reserva.setKilometrosRecorridos(5000);
    reserva.finalizarReserva()
    expect(() => reserva.finalizarReserva()).toThrow(
      "La reserva está finalizada."
    );
    expect(() => reserva.finalizarReserva()).not.toThrow(
      "El kilometraje no puede ser negativo o cero"
    );
  })
  
})