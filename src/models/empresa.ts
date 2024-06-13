import { Squad } from "./squad";

export interface Empresa {
    id: string
    name: string
    contact: string
    listSquad: Squad[] | null
    course: string;
    shift: string;
    period: string;
    institution: string;
   

}

export const initialValueEmpresa: Empresa = {
    id: '',
    name: '',
    contact: '',
    listSquad: null,
    course: "",
    shift: "",
    period: "",
    institution: "",
    
}