import Reserva from "../reserva"
import Vehiculo from "../Vehiculo/vehiculo"

export default class ServicioEstadisticas {

  private vehiculos: Vehiculo[];
  private reservas: Reserva[];

  constructor(vehiculos: Vehiculo[], reservas: Reserva[]) {
    this.vehiculos = vehiculos;
    this.reservas = reservas;
  }

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

  public porcentajeDeOcupacionFlota(): number {
    if (this.vehiculos.length === 0) {
      return 0;
    }
    const vehiculosAlquilados = this.vehiculos.filter(
      vehiculo => vehiculo.getEstado().getNombre() === "En Alquiler"
    ).length;
    return (vehiculosAlquilados / this.vehiculos.length) * 100;
  }

  public calcularRentabilidad(vehiculo: Vehiculo): number {
    const ingresos = this.calcularIngresosVehiculo(vehiculo);
    const costos = this.calcularCostosMantenimiento(vehiculo);
    return ingresos - costos;
  }

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

  private calcularCostosMantenimiento(vehiculo: Vehiculo): number {
    const mantenimientos = vehiculo.getMantenimientos();
    return mantenimientos.reduce((total, mantenimiento) => total + mantenimiento.getCosto(), 0);
  }
  
}