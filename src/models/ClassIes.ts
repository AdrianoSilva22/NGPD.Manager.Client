
export interface ClassIes {
    id: string
    period: string
    shift : string
    course: string
    csvFile:  File | null
    institutionId: string| undefined
    availabilityId: string | undefined
}

export const initialValueClassIes: ClassIes = {
    id: '',
    period: '',
    shift: '',
    course: '',
    institutionId: '',
    csvFile: null,
    availabilityId: '',
};