import { AvailabilityClassIes } from "./AvailabilityClassIes"
import { Institution } from "./institution"
import { Student } from "./student"

export interface Availability {
    id: string
    period: string 
    shift: string
    course: string
    csvFile: File | null
    instituticaoid: string | undefined
    availabilityId: string | undefined
    institution: Institution | null
    availability: AvailabilityClassIes | null
    listStudant: Student[] | null

}

export const initialValueClassIesAvailability: Availability = {
    id: '',
    period: '',
    shift: '',
    course: '',
    instituticaoid: '',
    csvFile: null,
    availabilityId: '',
    availability: null,
    institution: null,
    listStudant: null
}