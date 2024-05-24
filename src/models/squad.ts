
export interface Squad {
    id: string
    classSquad: string | undefined
    nameSquad: string
    studants: File | null
    mentorId: string
    squadId: string 
}

export const initialValueSquad: Squad = {
    id: '',
    classSquad: '',
    nameSquad: '',
    squadId: '',
    mentorId: '',
    studants: null
};