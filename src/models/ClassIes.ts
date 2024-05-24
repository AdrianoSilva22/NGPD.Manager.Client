import { Availability } from "./AvailabilityClassIes"
import { Institution } from "./institution"

export interface ClassIes {
    id: string
    period: string
    shift: string
    course: string
    csvFile: File | null
    institutionId: string | undefined
    availabilityId: string | undefined
    institution: Institution | null
    availability: Availability | null
}

export const initialValueClassIes: ClassIes = {
    id: '',
    period: '',
    shift: '',
    course: '',
    institutionId: '',
    csvFile: null,
    availabilityId: '',
    availability: null,
    institution: null
}