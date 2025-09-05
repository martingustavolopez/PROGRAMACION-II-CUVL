import Socio from "./socio"
import Entrenadores from "./entrenadores";
import ClasesGrupales from "./clasesgrupales";

export default class Gimnasio {
    private socio: Array<Socio>
    private entrenadores: Array<Entrenadores>
    private clasesgrupales: Array<ClasesGrupales>

    constructor() {
        this.socio = [];
        this.entrenadores = [];
        this.clasesgrupales = [];
    }

    
}