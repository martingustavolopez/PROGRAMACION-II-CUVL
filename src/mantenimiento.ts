export default class Mantenimiento {

  private fecha: Date;
  private costo: number;

  constructor() {
    this.fecha = new Date();
    this.costo = 0;
  }

  public getFecha(): Date {
    return this.fecha;
  }

  public setFecha(fecha: Date): void {
    this.fecha = fecha;
  }

  public getCosto(): number {
    return this.costo;
  }

  public setCosto(value: number): void {
    this.costo = value;
  }

}