import { EstadoVehiculo } from "./estaddo_vehiculo";

export default abstract class Vechiulo {
    protected matricula: string;
    protected estado: EstadoVehiculo;
    protected kilometraje: number;
    
    constructor()
    constructor(matricula: string, kilometraje: number )
    constructor(matricula?: string, kilometraje?: number) {
        this.matricula = matricula ?? "";
        this.kilometraje = kilometraje ?? 0;
        this.estado = EstadoVehiculo.DISPONIBLE
    }
}