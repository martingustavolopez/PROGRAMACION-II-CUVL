import { ITemporada } from "./iTemporada";

export default class TemporadaAlta implements ITemporada {

  public ajustar(tarifaBase: number): number {
    return tarifaBase * 1.20;
  }

}