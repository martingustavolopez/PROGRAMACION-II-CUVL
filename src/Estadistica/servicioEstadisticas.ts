import Reserva from "../reserva"
import Vehiculo from "../Vehiculo/vehiculo"

/**
 * Clase encargada de calcular estadísticas sobre la flota de vehículos y sus reservas.
 * Proporciona métricas de uso, rentabilidad y ocupación de la flota.
 */
export default class ServicioEstadisticas {

  private vehiculos: Vehiculo[];
  private reservas: Reserva[];

  /**
   * Constructor de la clase ServicioEstadisticas.
   * @param vehiculos - Array de vehículos de la flota.
   * @param reservas - Array de reservas finalizadas.
   */
  constructor(vehiculos: Vehiculo[], reservas: Reserva[]) {
    this.vehiculos = vehiculos;
    this.reservas = reservas;
  }

  /**
   * Determina el vehículo con mayor cantidad de alquileres en un rango de fechas.
   * @param fechaInicio - Fecha de inicio del rango a analizar.
   * @param fechaFin - Fecha de fin del rango a analizar.
   * @returns El vehículo más alquilado en el rango de fechas especificadas.
   * @throws {Error} Si no hay vehículos alquilados en las fechas especificadas.
   * @throws {Error} Si ocurre un error al determinar el vehículo más alquilado.
   */
  public vehiculoMasAlquilado(fechaInicio: Date, fechaFin: Date): Vehiculo {
    const cantidad = this.cantAlquileresPorVehiculo(fechaInicio, fechaFin);
    if (cantidad.size === 0) {
      throw new Error("No hay vehículos alquilados en las fechas especificadas.");
    }
    let vehiculoMasAlquilado: Vehiculo | undefined;
    let maxAlquileres = 0;

    cantidad.forEach((cant, vehiculo) => {
      if (cant > maxAlquileres) {
        maxAlquileres = cant;
        vehiculoMasAlquilado = vehiculo;
      }
    });

    if(!vehiculoMasAlquilado) {
      throw new Error("Error al determinar el vehiculo más alquilado.");
    }
    return vehiculoMasAlquilado;
  }

  /**
   * Determina el vehículo con menor cantidad de alquileres en un rango de fechas.
   * @param fechaInicio - Fecha de inicio del rango a analizar. 
   * @param fechaFin - Fecha de fin del rango a analizar.
   * @returns El vehículo menos alquilado en el rango de fechas especificadas.
   * @throws {Error} Si no hay vehículos alquilados en las fechas especificadas.
   * @throws {Error} Si ocurre un error al determinar el vehículo menos alquilado.
   */
  public vehiculoMenosAlquilado(fechaInicio: Date, fechaFin: Date): Vehiculo {
    const cantidad = this.cantAlquileresPorVehiculo(fechaInicio, fechaFin);
    if (cantidad.size === 0) {
      throw new Error("No hay vehículos alquilados en las fechas especificadas.");
    }
    let vehiculoMenosAlquilado: Vehiculo | undefined;
    let minAlquileres = Infinity;

    cantidad.forEach((cant, vehiculo) => {
      if (cant < minAlquileres) {
        minAlquileres = cant;
        vehiculoMenosAlquilado = vehiculo; 
      }
    });

    if (!vehiculoMenosAlquilado) {
      throw new Error("Error al determinar el vehiculo menos alquilado.");
    }
    return vehiculoMenosAlquilado;
  }

  /**
   * Determina el vehículo con mayor rentabilidad de toda la flota.
   * La rentabilidad se calcula como: ingresos totales - costos de mantenimiento.
   * @returns El vehículo más rentable de la flota.
   * @throws {Error} Si no hay vehículos en la flota.
   * @throws {Error} Si ocurre un error al determinar el vehículo más rentable.
   */
  public vehiculoMasRentable(): Vehiculo {
    if (this.vehiculos.length === 0) {
      throw new Error("No hay vehiculos en la flota");
    }
    let vehiculoMayorRentabilidad: Vehiculo | undefined = undefined;
    let maxRentabilidad: number = -Infinity;

    for (const vehic of this.vehiculos) {
      const rentabilidad = this.calcularRentabilidad(vehic);

      if (rentabilidad > maxRentabilidad) {
        maxRentabilidad = rentabilidad;
        vehiculoMayorRentabilidad = vehic;
      }
    }

    if (!vehiculoMayorRentabilidad) {
      throw new Error("Error al determinar el vehiculo más rentable.");
    }
    return vehiculoMayorRentabilidad;
  }

  /**
   * Determina el vehículo con menor rentabilidad de toda la flota.
   * La rentabilidad se calcula como: ingresos totales - costos de mantenimiento.
   * @returns El vehículo menos rentable de la flota.
   * @throws {Error} Si no hay vehículos en la flota.
   * @throws {Error} Si ocurre un error al determinar el vehículo menos rentable.
   */
  public vehiculoMenosRentable(): Vehiculo {
    if (this.vehiculos.length === 0) {
      throw new Error("No hay vehiculos en la flota");
    }
    let vehiculoMenorRentabilidad: Vehiculo | undefined = undefined;
    let menosRentabilidad: number = Infinity;

    for (const vehic of this.vehiculos) {
      const rentabilidad = this.calcularRentabilidad(vehic);

      if (rentabilidad < menosRentabilidad) {
        menosRentabilidad = rentabilidad;
        vehiculoMenorRentabilidad = vehic;
      }
    }

    if (!vehiculoMenorRentabilidad) {
      throw new Error("Error al determinar el vehiculo menos rentable.");
    }
    return vehiculoMenorRentabilidad;
  }

  /**
   * Calcula el porcentaje de ocupación actual de la flota.
   * Se determina qué porcentaje de vehículos están en estado "En Alquiler".
   * @returns Porcentaje de ocupación. Retorna 0 si no hay vehículos en la flota.
   * 
   * @example
   *  Si hay 10 vehículos y 3 están en alquiler:
   *  Devuelve: 30
   */
  public porcentajeDeOcupacionFlota(): number {
    if (this.vehiculos.length === 0) {
      return 0;
    }
    const vehiculosAlquilados = this.vehiculos.filter(
      vehiculo => vehiculo.getEstado().getNombre() === "En Alquiler"
    ).length;
    return (vehiculosAlquilados / this.vehiculos.length) * 100;
  }

  /**
   * Calcula la rentabilidad de un vehículo específico.
   * La rentabilidad es la diferencia entre los ingresos y los costos de mantenimiento.
   * 
   * @param vehiculo - Vehículo del cual se quiera calcular la rentabilidad
   * @returns Rentabilidad del vehículo, puede ser negativa si los costos superan a los ingresos.
   * 
   * @example 
   *  Vehículo con ingresos de 5000 y costos de 1500:
   *  Rentabilidad: 5000 - 1500 = 3500
   * 
   * @example 
   *  Vehículo con ingresos de 1000 y costos de 2000:
   *  Rentabilidad: 1000 - 2000 = -1000 
  */
  public calcularRentabilidad(vehiculo: Vehiculo): number {
    const ingresos = this.calcularIngresosVehiculo(vehiculo);
    const costos = this.calcularCostosMantenimiento(vehiculo);
    return ingresos - costos;
  }

  /**
   * @private
   * Método privado que cuenta la cantidad de alquileres por vehículo en un rango de fechas.
   * Filtra las reservas que se solapan en el rango de fechas y las agrupa por vehículo.
   * Una reserva está dentro del rango sí:
   * - Su fecha de inicio está dentro del rango.
   * - Su fecha de fin está dentro del rango.
   * - Envuelve completamente el rango (inicia antes y termina después).
   * @param fechaInicio - Fecha de inicio del rango a analizar.
   * @param fechaFin - Fecha de fin del rango a analizar.
   * @returns Map con vehículos como clave y cantidad de alquileres como valor.
   */
  private cantAlquileresPorVehiculo(fechaInicio: Date, fechaFin: Date): Map<Vehiculo, number> {
    const cant = new Map<Vehiculo, number>();

    const reservasFiltradas = this.reservas.filter(reserva => {
      const inicioReserva = reserva.getFechaDeInicio();
      const finReserva = reserva.getFechaDeFin();

      return(
        (inicioReserva >= fechaInicio && inicioReserva <= fechaFin) || 
        (finReserva >= fechaInicio && finReserva <= fechaFin) ||
        (inicioReserva <= fechaInicio && finReserva >= fechaFin)
      );
    });

    for (const reserva of reservasFiltradas) {
      const vehiculo = reserva.getVehiculo();
      const cantActual = cant.get(vehiculo) || 0;
      cant.set(vehiculo, cantActual + 1);
    }

    return cant;
  }

  /**
   * @private
   * Método privado que calcula los ingresos totales generados por un vehículo específico pasado por parámetro.
   * Suma el costo de todas las reservas finalizadas (kilómetros registrados) del vehículo.
   * Ignora las reservas sin kilómetros registrados y maneja errores en el cálculo de costos.
   * @param vehiculo - Vehículo del cual calcular los ingresos.
   * @returns Suma total de ingresos del vehículo.
   */
  private calcularIngresosVehiculo(vehiculo: Vehiculo): number {
    const reservasVehiculo = this.reservas.filter(
      reserva => reserva.getVehiculo().getMatricula() === vehiculo.getMatricula()
    );

    return reservasVehiculo.reduce((total, reserva) => {
      try {
        if (reserva.getKilometrosRecorridos() > 0) {
          return total + reserva.calcularCostoTotal();
        }
        return total;
      } catch (error) {
        return total;
      }
    }, 0);
  }

  /**
   * @private
   * Método privado que calcula los costos totales de mantenimiento de un vehículo.
   * Suma el costo de todos los mantenimientos registrados para el vehículo.
   * @param vehiculo - Vehículo del cual se va a calcular los costos de mantenimiento.
   * @returns La suma total de costos de mantenimiento.
   */
  private calcularCostosMantenimiento(vehiculo: Vehiculo): number {
    const mantenimientos = vehiculo.getMantenimientos();
    return mantenimientos.reduce((total, mantenimiento) => total + mantenimiento.getCosto(), 0);
  }
  
}