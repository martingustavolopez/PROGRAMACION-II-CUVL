import { ITemporada } from "./iTemporada";

/**
 * Clase que representa la lógica de variación de la tarifa base del vehículo ajustandola a la temporada Baja.
 */
export default class TemporadaBaja implements ITemporada {

  /**
   * Ajusta la tarifaBase recibida aplicandole un -20% a la misma.
   * @param tarifaBase - Tarifa base diaria del vehículo.
   * @returns La tarifa base diaria -10%
   */
  public ajustar(tarifaBase: number): number {
    return tarifaBase * 0.90;
  }

  /**
   * Se obtiene el nombre de la estategia de temporada.
   * @returns El nombre de la temporada: "Temporada Baja".
   */
  public getNombre(): string {
    return "Temporada Baja";
  }

}