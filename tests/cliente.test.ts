import Cliente from "../src/cliente"
import Reserva from "../src/reserva";

describe("Test de la clase Cliente", () => {

  let reservaMock1: jest.Mocked<Reserva>;
  let reservaMock2: jest.Mocked<Reserva>;
  let cliente: Cliente;

  beforeEach(() => {
    cliente = new Cliente("Juan", 44);

    reservaMock1 = { } as unknown as jest.Mocked<Reserva>
    reservaMock2 = { } as unknown as jest.Mocked<Reserva>
  })

  it("Debe ser una instancia de cliente", () => {
    expect(cliente).toBeInstanceOf(Cliente);
  })

  it("Debe crear un cliente con los valores iniciales", () => {
    expect(cliente.getNombre()).toBe("Juan");
    expect(cliente.getId()).toBe(44);
    expect(cliente.getReservas()).toEqual([]);
  })

  it("Debe crear un cliente vacío, sin pasar parámetros", () => {
    const cliente = new Cliente();

    expect(cliente.getNombre()).toBe("");
    expect(cliente.getId()).toBe(0);
    expect(cliente.getReservas()).toEqual([]);
  })

  it("Debe obtener una copia del array de reservas", () => {
    const cliente = new Cliente("Alan", 22);
    cliente.agregarReserva(reservaMock1);
    expect(cliente.getReservas().length).toBe(1);
  })

  it("Debe retornar todas las reservas agregadas", () => {
    const cliente = new Cliente("Lucas", 33);
    cliente.agregarReserva(reservaMock1);
    cliente.agregarReserva(reservaMock2);

    expect(cliente.getReservas()).toEqual([reservaMock1, reservaMock2]);
    expect(cliente.getReservas().length).toBe(2);
  })

  it("Debe setear el nombre del cliente", () => {
    const cliente = new Cliente();
    cliente.setNombre("Carlos");
    expect(cliente.getNombre()).toBe("Carlos");
  })

  it("Debe setear el id del cliente", () => {
    const cliente = new Cliente();
    cliente.setId(88);
    expect(cliente.getId()).toBe(88);
  })

})