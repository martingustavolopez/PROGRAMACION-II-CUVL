/**
 * Clase que representa un mantenimiento realizado por un vehículo.
 * Incluye fecha, costo, descripción y un identificador asignado externamente.
 */
export default class Mantenimiento {

  private idMantenimiento: number;
  private fecha: Date;
  private costo: number;
  private descripcion: string;

   /**
  * Constructor de la clase Mantenimiento.
  * @param fecha - Fecha en la que se realizó el mantenimiento.
  * @param costo - Costo total del mantenimiento.
  * @param descripcion - Descripción detallada del mantenimiento realizado.
  */
  constructor(fecha: Date, costo: number, descripcion: string) {
    this.idMantenimiento = 0;
    this.fecha = fecha
    this.costo = costo;
    this.descripcion = descripcion;
  }

  /**
   * Se asigna un id al mantenimiento.
   * @param id - Id del mantenimiento.
   */
  public setIdMantenimiento(id: number): void {
    this.idMantenimiento = id;
  }

  /**
   * Se obtiene el id del mantenimiento
   * @returns {number} Id del mantenimiento.
   */
  public getIdMantenimiento(): number {
    return this.idMantenimiento;
  }

  /**
   * Se obtiene la fecha del mantenimiento
   * @returns {Date} Fecha del mantenimiento.
   */
  public getFecha(): Date {
    return this.fecha;
  }

  /**
   * Se obtiene el costo del mantenimiento
   * @returns {number} Costo del mantenimiento.
   */
  public getCosto(): number {
    return this.costo;
  }

  /**
   * Se obtiene la descripción del mantenimiento
   * @returns {string} Descripción del mantenimiento.
   */
  public getDescripcion(): string {
    return this.descripcion;
  }
  
  /**
   * Se devuelve un texto con los detalles completos del mantenimiento.
   * @returns {string} Detalles formateados del mantenimiento.
   */
  public obtenerDetalles(): string {
    return `
      Mantenimiento nº${this.getIdMantenimiento()}
      Costo: $${this.getCosto()}
      Fecha: ${this.getFecha()}
      Descripción: ${this.getDescripcion()}
    `;  
  }

}