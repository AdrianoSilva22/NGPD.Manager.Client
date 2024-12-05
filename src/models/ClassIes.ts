import { Squad } from './squad';
import { Institution } from "./institution"
import { Student } from "./student"

export interface ClassIes {
    id: string
    name: string
    csvFile: File | null
    instituticaoid: string 
    availabilityId: string 
    Squad: []
    availabilities: [] 
    alunos: Student[] | null

}

export const initialValueClassIes: ClassIes = {
    id: '',
    name: '',
    instituticaoid: '',
    csvFile: null,
    availabilityId: '',
    availabilities: [],
    Squad: [],
    alunos: null
}