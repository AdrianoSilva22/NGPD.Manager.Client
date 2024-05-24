import { ClassIes } from "./ClassIes";

export interface Student {
    id: string,
    turmaId: string
    contact: string
    name: string
    turmaIes: ClassIes;
}

export const initialvalueStudent: Student = {
    id: '',
    turmaId: '',
    contact: '',
    name: '',
    turmaIes: {
        availabilityId: '',
        id: '',
        course: '',
        csvFile: null,
        institutionId: '',
        period: '',
        shift: '',
        availability: null,
        institution: null   
    }
}