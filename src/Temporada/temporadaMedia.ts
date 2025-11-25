import { ITemporada } from "./iTemporada";

/**
 * Clase que representa la lógica de variación de la tarifa base del vehículo ajustandola a la temporada Media.
 */
export default class TemporadaMedia implements ITemporada {

  /**
   * No ajusta la tarifaBase recibida, quedando la misma tarifa base diaria del vehículo en si.
   * @param tarifaBase - Tarifa base diaria del vehículo.
   * @returns {number} La tarifa base diaria estándar (propia del vehículo).
   */
  public ajustar(tarifaBase: number): number {
    return tarifaBase;
  }

  /**
   * Se obtiene el nombre de la estategia de temporada.
   * @returns {string} El nombre de la temporada: "Temporada Media".
   */
  public getNombre(): string {
    return "Temporada Media";
  }

}