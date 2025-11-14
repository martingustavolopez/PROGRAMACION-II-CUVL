import { ITemporada } from "./iTemporada";

export default class TemporadaBaja implements ITemporada {

  public ajustar(tarifaBase: number): number {
    return tarifaBase * 0.90;
  }

  public getNombre(): string {
    return "Temporada Baja";
  }

}