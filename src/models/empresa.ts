import { Squad } from "./squad";

export interface Empresa {
    id: string
    name: string
    email: string
    listSquad: Squad[] | null
    course: string;
    shift: string;
    period: string;
    institution: string;
   

}

export const initialValueEmpresa: Empresa = {
    id: '',
    name: '',
    email: '',
    listSquad: null,
    course: "",
    shift: "",
    period: "",
    institution: "",
    
}