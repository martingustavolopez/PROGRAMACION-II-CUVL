import { ITemporada } from "./iTemporada";

export default class TemporadaMedia implements ITemporada {

  public ajustar(tarifaBase: number): number {
    return tarifaBase;
  }

  public getNombre(): string {
    return "Temporada Media";
  }

}