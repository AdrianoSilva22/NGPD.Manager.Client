import { Availability } from "./AvailabilityClassIes"
import { Institution } from "./institution"
import { Student } from "./student"

export interface ClassIes {
    id: string
    period: string
    shift: string
    course: string
    csvFile: File | null
    institutionId: string | undefined
    availabilityId: string | undefined
    institution: Institution | null
    availabilities: Availability | {}
    listStudant: Student[] | null

}

export const initialValueClassIes: ClassIes = {
    id: '',
    period: '',
    shift: '',
    course: '',
    institutionId: '',
    csvFile: null,
    availabilityId: '',
    availabilities: {},
    institution: null,
    listStudant: null
}