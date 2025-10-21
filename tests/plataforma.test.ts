import Plataforma from "../src/plataforma";
import Vehiculo from "../src/vehiculo";
import Compacto from "../src/compacto";
import Sedan from "../src/sedan";
import Suv from "../src/suv";
import Cliente from "../src/cliente";
import { EstadoVehiculo } from "../src/estado_vehiculo";

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
        const plataforma = new Plataforma();
        const vehiculo = new Compacto("AD123BC", 10000);

        plataforma.agregarVehiculo(vehiculo);

        const vehiculoEncontrado = plataforma.buscarVehiculo("AD123BC");

        expect(vehiculoEncontrado).not.toBeNull();
        expect(vehiculoEncontrado?.getMatricula()).toEqual("AD123BC");
    });

    it("Debe mostrar los Vehiculos Disponibles", () => {
        const plataforma = new Plataforma();
        const vehiculoCompacto = new Compacto("AA123BC", 10000)
        const vehiculoSedan = new Sedan("AB456BC", 20000)
        const vehiculoSuv = new Suv("AC789BC", 30000)

        plataforma.agregarVehiculo(vehiculoCompacto);
        plataforma.agregarVehiculo(vehiculoSedan);
        plataforma.agregarVehiculo(vehiculoSuv);

        vehiculoCompacto.setEstado(EstadoVehiculo.EN_MANTENIMIENTO);

        const vehiculosDisponibles = plataforma.getVehiculosDisponibles();

        expect(vehiculosDisponibles).not.toBeNull();
        expect(vehiculosDisponibles.length).toEqual(2);

    });

    it("Debe registrar mantenimiento correctamente", () => {
        const sistema = new Plataforma();
        const vehiculo = new Compacto("ABC123", 1000);
        sistema.agregarVehiculo(vehiculo);
        
        // terminar test de mantenimiento
        
    });



    it("Debe validar disponibilidad de forma correcta")






})