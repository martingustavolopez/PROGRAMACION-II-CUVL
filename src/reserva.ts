import Cliente from "./cliente";
import Vehiculo from "./vehiculo";

export default class Reserva {
    private cliente: Cliente;
    private vehiculo: Vehiculo;
    private fechaDeInicio: Date
    private fechaDeFin: Date
    private kilometrajeFinal: number
    private costoTotal: number

    constructor(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date){
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaDeInicio = fechaInicio;
        this.fechaDeFin = fechaFin;
        this.kilometrajeFinal = 0;
        this.costoTotal = 0;
    }

    public setCliente(value: Cliente){
        this.cliente = value;
    }

    public getCliente(){
        return this.cliente;
    }

    public setVehiculo(value: Vehiculo){
        this.vehiculo = value;
    }

    public getVehiculo(){
        return this.vehiculo;
    }

    public setFechaDeInicio(value: Date){
        this.fechaDeInicio = value;
    }

    public getFechaDeInicio(){
        return this.fechaDeInicio;
    }

    public setFechaDeFin(value: Date){
        this.fechaDeFin = value;
    }

    public getFechaDeFin(){
        return this.fechaDeFin;
    }
    
    public setKilometrajeFinal(value: number){
        this.kilometrajeFinal = value;
    }

    public getKilometrajeFinal(){
        return this.kilometrajeFinal;
    }

    public setCostoTotal(value: number){
        this.costoTotal = value;
    }

    public getCostoTotal(){
        return this.costoTotal;
    }

    public calcularDias(): number{
        const diferencia = this.getFechaDeFin().getTime() - this.getFechaDeInicio().getTime();
        return diferencia / (1000 * 60 * 60 * 24)
    }

    public calcularCostoTotal(): void{
        this.costoTotal = this.calcularDias() * 2 //precio 
    }

}





















