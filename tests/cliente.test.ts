import Cliente from "../src/cliente"
import Reserva from "../src/reserva";

describe("Test de la clase Cliente", () => {

  it("Debe crear un cliente vacío, sin pasar parámetros", () => {
    const cliente = new Cliente();

    expect(cliente.getNombre()).toBe("");
    expect(cliente.getId()).toBe(0);
    expect(cliente.getReservas()).toEqual([]);
  })

  it("Debe crear un cliente pasando el nombre y el id por parámetros", () => {
    const cliente = new Cliente("Juan", 1);
    
    expect(cliente.getNombre()).toBe("Juan");
    expect(cliente.getId()).toBe(1);
    expect(cliente.getReservas()).toEqual([]);
  })

  it("Debe obtener una copia del array de reservas", () => {
    const cliente = new Cliente("Alan", 2);
    const reservaMock = { } as unknown as Reserva;
    cliente.agregarReserva(reservaMock);

    expect(cliente.getReservas().length).toBe(1);
  })

  it("Debe retornar todas las reservas agregadas", () => {
    const cliente = new Cliente("Lucas", 3);
    const reservaMock1 = { } as unknown as Reserva;
    const reservaMock2 = { } as unknown as Reserva;
    
    cliente.agregarReserva(reservaMock1);
    cliente.agregarReserva(reservaMock2);

    expect(cliente.getReservas()).toEqual([reservaMock1, reservaMock2]);
    expect(cliente.getReservas().length).toBe(2);
  })

  it("Debe actualizar el nombre del cliente", () => {
    const cliente = new Cliente();
    cliente.setNombre("Carlos Garcia");
    expect(cliente.getNombre()).toBe("Carlos Garcia");
  })

})