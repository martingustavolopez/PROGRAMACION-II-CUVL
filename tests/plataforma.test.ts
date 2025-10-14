import Plataforma from "../src/plataforma";
import Vehiculo from "../src/vehiculo";
import Compacto from "../src/compacto";
import Cliente from "../src/cliente";

describe("Test clase Plataforma", () => {

    it("Debe inicializar arrays vacios al crear el sistema", () => {
        const plataforma = new Plataforma();

        expect(plataforma.getVehiculos().length).toEqual(0);
        expect(plataforma.getClientes().length).toEqual(0);
        expect(plataforma.getReservas().length).toEqual(0);
    });

    it("Debe agregar Vehiculo de forma correcta", () => {
        const plataforma = new Plataforma();
        const vehiculo = new Compacto("AD123BC", 10000);

        plataforma.agregarVehiculo(vehiculo);

        expect(plataforma.getVehiculos().length).toEqual(1);

    });

    it("Debe agregar un Cliente de forma correcta", () => {
        const plataforma = new Plataforma();
        const cliente = new Cliente("Martin", 25, "martingustavolopez@gmail.com");

        plataforma.agregarCliente(cliente)

        expect(plataforma.getClientes().length).toEqual(1);
    });

    it("Debe buscar un Vehiculo de forma correcta", () => {

        
    })


})