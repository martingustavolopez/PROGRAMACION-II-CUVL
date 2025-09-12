enum Estado { DISPONIBLE, EN_ALQUILER, NECESITA_LIMPIEZA }


abstract class Vehiculo {
    matricula
    estado
    kilometraje // kilometraje anterior
    tarifa

    constructor(_matricula, _estado, _kilometraje, _tarifa) {
        this.matricula = _matricula;
        this.estado = _estado;
        this.kilometraje = _kilometraje;
        this.tarifa = _tarifa;
    }

    //getters
    //setters

    abstract getTarifa()
    private getTarifaPorDias(total_dias: number) {
        return this.tarifa * total_dias
    }

    alquilar() {
        this.estado = Estado::EN_ALQUILER
    }

    devolver() {
        this.estado = Estado::NECESITA_LIMPIEZA
    }


}

class SUV extends Vehiculo {

}

class Sedan {

}

class Compacto {
    const tarifa = 30;
    const cargo = 0.15;
    const min_km = 100;

    constructor(matricula, estado, kilometraje, tarifa) {
        super(matricula, estado, kilometraje, tarifa)
    }

    getTarifa(total_dias: number, kilometraje_actual: number): number {
        const tarifa_base_por_dias = getTarifaPorDias(total_dias)

        // calcular los kms recorridos (kilometraje_actual - kilometraje_anterior)
        const kmsRecorridos = kilometraje_actual - this.kilometraje
        
        // calcular cuanto kms por día (kilometraje hecho / dias de alquiler)
        const kmsPorDia = kmsRecorridos / total_dias
        
        // si no supera el km minimo, le cobro la tarifa base * dias
        if (kmsPorDia <= min_km) {
            return tarifa_base_por_dias
        }

        // calcular la tarifa si se excedió de 100km por día 
        const kmsACobrar = (kmsPorDia - min_km) * total_dias

        return tarifa_base_por_dias + kmsACobrar * cargo 
    }
}

class Reserva {
    fechaInicio: Date
    fechaFin: Date
    vehiculo: Vehiculo
    cliente: Cliente
    kilometraje_actual: number

    getTotalACobrar() {
        const total_dias = fechaFin - fechaInicio
        return vehiculo.getTarifa(total_dias, kilometraje_actual)
    }
}


class Cliente {

}