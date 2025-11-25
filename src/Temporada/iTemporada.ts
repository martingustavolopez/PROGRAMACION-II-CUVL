/**
 * Interfaz que declara las firmas a implementar por las clases que implementen la interfaz de la estrategia de temporada.
 * - ajustar.
 * - getNombre.
 */export interface ITemporada {
  ajustar(tarifaBase: number): number
  getNombre(): string
}