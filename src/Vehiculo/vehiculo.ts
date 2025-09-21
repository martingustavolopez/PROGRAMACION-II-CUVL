import { ESTADO_VEHICULO } from "../Vehiculo/estadoVehiculo"

export default abstract class Vehiculo {

  private matricula: string;
  private estadoVehiculo: ESTADO_VEHICULO;
  private kilometrajeTotal: number;

  protected tarifaBase: number;

  constructor() {
    this.matricula = "";
    this.estadoVehiculo = ESTADO_VEHICULO.DISPONIBLE;
    this.kilometrajeTotal = 0;
    this.tarifaBase = 0;
  }

  public abstract calcularTarifa(): number;
  



}