export default class Mantenimiento {

  private idMantenimiento: number;
  private fecha: Date;
  private costo: number;
  private descripcion: string;

  constructor(fecha: Date, costo: number, descripcion: string) {
    this.idMantenimiento = 0;
    this.fecha = fecha
    this.costo = costo;
    this.descripcion = descripcion;
  }

  public setIdMantenimiento(id: number): void {
    this.idMantenimiento = id;
  }

  public getIdMantenimiento(): number {
    return this.idMantenimiento;
  }

  public getFecha(): Date {
    return this.fecha;
  }

  public getCosto(): number {
    return this.costo;
  }

  public getDescripcion(): string {
    return this.descripcion;
  }
  
  public obtenerDetalles(): string {
    return `
      Mantenimiento nº${this.getIdMantenimiento()}
      Costo: $${this.getCosto()}
      Fecha: ${this.getFecha()}
      Descripción: ${this.getDescripcion()}
    `;  
  }

}