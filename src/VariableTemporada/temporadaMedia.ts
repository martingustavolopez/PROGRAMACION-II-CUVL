import { ITemporada } from "./iTemporada";

export default class TemporadaMedia implements ITemporada {

  public ajustar(tarifaBase: number): number {
    return tarifaBase;
  }

}