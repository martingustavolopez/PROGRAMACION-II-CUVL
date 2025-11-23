import Cliente from "../src/cliente";
import Reserva from "../src/reserva";
import Vehiculo from "../src/Vehiculo/vehiculo";
import { ITemporada } from "../src/Temporada/iTemporada";

describe("Test de la clase Reserva", () => {

  let clienteMock: jest.Mocked<Cliente>;
  let vehiculoMock: jest.Mocked<Vehiculo>;
  let fechaInicio: Date;
  let fechaFin: Date;
  let temporadaMock: jest.Mocked<ITemporada>;
  let reserva: Reserva;
  let idReserva: number = 1;

  beforeEach(() => {
    jest.clearAllMocks();

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

    reserva = new Reserva(idReserva, clienteMock, vehiculoMock, fechaInicio, fechaFin, temporadaMock);
  })

  it("Debe ser una instancia de Reserva", () => {
    expect(reserva).toBeInstanceOf(Reserva);
  })

  it("Debe crear una Reserva con los valores iniciales", () => {
    expect(reserva.getIdReserva()).toBe(idReserva);
    expect(reserva.getCliente()).toBe(clienteMock);
    expect(reserva.getVehiculo()).toBe(vehiculoMock);
    expect(reserva.getFechaDeInicio()).toBe(fechaInicio);
    expect(reserva.getFechaDeFin()).toBe(fechaFin);
    expect(reserva.getEstrategiaTemporada()).toBe(temporadaMock);
    expect(reserva.getKilometrosRecorridos()).toBe(0);
    expect(reserva.estaFinalizada()).toBe(false);
  })

  // Getters
  it("Debe devolver el id de la reserva de forma correcta", () => {
    expect(reserva.getIdReserva()).toBe(1);
  })

  it("Debe devolver el cliente de forma correcta", () => {
    expect(reserva.getCliente()).toBe(clienteMock);
  })
  
  it("Debe devolver el vehículo de forma correcta", () => {
    expect(reserva.getVehiculo()).toBe(vehiculoMock);
  })

  it("Debe devolver la fecha de inicio de forma correcta", () => {
    expect(reserva.getFechaDeInicio()).toBe(fechaInicio);
  })

  it("Debe devolver la fechad de fin de forma correcta", () => {
    expect(reserva.getFechaDeFin()).toBe(fechaFin);
  })

  it("Debe devolver los kilometros recorridos de forma correcta", () => {
    expect(reserva.getKilometrosRecorridos()).toBe(0);
  })

  it("Debe devolver la temporada de forma correcta", () => {
    expect(reserva.getEstrategiaTemporada()).toBe(temporadaMock);
  })

  it("Debe devolver el estado de finalizado de forma correcta", () => {
    expect(reserva.estaFinalizada()).toBe(false);
  })
  
  // Registro de Kilometros Recorridos
  it("Debe registrar los kilometros recorridos correctamente", () => {
    reserva.setKilometrosRecorridos(1200);
    expect(reserva.getKilometrosRecorridos()).toBe(1200);
  })

  it("Debe lanzar error si se registran kilometros menores o iguales a cero", () => {
    expect(() => reserva.setKilometrosRecorridos(0)).toThrow("Los kilometros recorridos deben ser mayores a cero");
    expect(() => reserva.setKilometrosRecorridos(-1000)).toThrow("Los kilometros recorridos deben ser mayores a cero")
  })
  
  it("Debe lanzar error si la reserva está finalizada", () => {
    reserva.setKilometrosRecorridos(500);
    vehiculoMock.devolver;
    reserva.finalizarReserva();
    
    expect(() => reserva.setKilometrosRecorridos(600)).toThrow("No se puede modificar el kilometraje de una reserva finalizada");
  })
  
  // Calcular dias
  it("Debe calcular los dias de reserva", () => {
    expect(reserva.calcularDias()).toBe(4);
  })

  it("Debe calcular dias de forma correcta si son en el mismo día", () => {
    const fecha = new Date(2025, 10, 1);
    reserva = new Reserva(1, clienteMock, vehiculoMock, fecha, fecha, temporadaMock);
    expect(reserva.calcularDias()).toBe(0);
  })

  // Calculo del Costo Total
  it("Debe calcular el costo total de la reserva de forma correcta", () => {
    vehiculoMock.calcularTarifaConTemporada.mockReturnValue(500);
    
    reserva.setKilometrosRecorridos(150);
    expect(reserva.calcularCostoTotal()).toBe(500);
    expect(vehiculoMock.calcularTarifaConTemporada).toHaveBeenCalledWith(4, 150, temporadaMock);
  })

  it("Debe lanzar error si no se registro previamente los kilometros recorridos", () => {
    expect(() => reserva.calcularCostoTotal()).toThrow("Debe registrar el kilometraje antes de calcular el costo");
  })

  it("Debe poder calcular el costo total de la reserva varias veces", () => {
    reserva.setKilometrosRecorridos(1000);
    vehiculoMock.calcularTarifaConTemporada.mockReturnValue(500);
    
    expect(reserva.calcularCostoTotal()).toBe(500);
    expect(reserva.calcularCostoTotal()).toBe(500);
    expect(reserva.calcularCostoTotal()).toBe(500);
    expect(vehiculoMock.calcularTarifaConTemporada).toHaveBeenCalledTimes(3);
  })

  // Finalizar la Reserva
  it("Debe finalizar la reserva de forma correcta", () => {
    expect(reserva.estaFinalizada()).toBe(false);
    reserva.setKilometrosRecorridos(5000);
    reserva.finalizarReserva()
    expect(reserva.estaFinalizada()).toBe(true);
    expect(vehiculoMock.devolver).toHaveBeenCalledWith(5000);
    expect(vehiculoMock.devolver).toHaveBeenCalledTimes(1);
  })

  it("Debe lanzar error si la reserva está finalizada", () => {
    reserva.setKilometrosRecorridos(1000);
    reserva.finalizarReserva();
    expect(() => reserva.finalizarReserva()).toThrow("La reserva está finalizada.");
  })

  it("Debe lanzar error si se intenta finalizar la reserva con 0 kilometros", () => {
    expect(() => reserva.setKilometrosRecorridos(0)).toThrow(
      "Los kilometros recorridos deben ser mayores a cero"
    )
    expect(() => reserva.finalizarReserva()).toThrow(
      "Debe registrar el kilometraje antes de finalizar la reserva"
    );
  })

  it("Debe lanzar error si no se registro los kilometros", () => {
    expect(() => reserva.finalizarReserva()).toThrow("Debe registrar el kilometraje antes de finalizar la reserva");
  })

  // Flujo Completo de Reserva
  it("Debe ejecutar el flujo completo de una reserva de forma correcta", () => {
    expect(reserva.estaFinalizada()).toBe(false);
    expect(reserva.getKilometrosRecorridos()).toBe(0);
    reserva.setKilometrosRecorridos(1500);
    expect(reserva.getKilometrosRecorridos()).toBe(1500);
   
    vehiculoMock.calcularTarifaConTemporada.mockReturnValue(600);
    expect(reserva.calcularCostoTotal()).toBe(600);
    expect(vehiculoMock.calcularTarifaConTemporada).toHaveBeenCalledWith(4, 1500, temporadaMock);

    reserva.finalizarReserva();
    expect(reserva.estaFinalizada()).toBe(true);
    expect(vehiculoMock.devolver).toHaveBeenCalledWith(1500);

    expect(() => reserva.setKilometrosRecorridos(2000)).toThrow("No se puede modificar el kilometraje de una reserva finalizada");
    expect(() => reserva.finalizarReserva()).toThrow("La reserva está finalizada");
  })
  
  it("Debe poder calcular costo antes de finalizar pero no viceversa", () => {
    reserva.setKilometrosRecorridos(2000);
    vehiculoMock.calcularTarifaConTemporada.mockReturnValue(800);
    
    expect(reserva.calcularCostoTotal()).toBe(800);
    expect(reserva.estaFinalizada()).toBe(false);

    reserva.finalizarReserva();
    expect(reserva.estaFinalizada()).toBe(true);
    expect(() => reserva.setKilometrosRecorridos(4000)).toThrow(
      "No se puede modificar el kilometraje de una reserva finalizada"
    );
  })

  it("Debe mantener los datos correctos después de finalizar la reserva", () => {
    const kmRecorridos = 2500;
    reserva.setKilometrosRecorridos(kmRecorridos);
    reserva.finalizarReserva();

    expect(reserva.getIdReserva()).toBe(1);
    expect(reserva.getCliente()).toBe(clienteMock);
    expect(reserva.getVehiculo()).toBe(vehiculoMock);
    expect(reserva.getKilometrosRecorridos()).toBe(kmRecorridos);
    expect(reserva.getFechaDeInicio()).toBe(fechaInicio);
    expect(reserva.getFechaDeFin()).toBe(fechaFin);
    expect(reserva.getEstrategiaTemporada()).toBe(temporadaMock);
    expect(reserva.estaFinalizada()).toBe(true);
  })

});