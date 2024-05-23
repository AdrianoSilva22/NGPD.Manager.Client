
export interface Squad {
    id: string
    classSquad: string | undefined
    nameSquad: string
    studants: File | null
    mentor: null | string
}

export const initialValueSquad: Squad = {
    id: '',
    classSquad: '',
    nameSquad: '',
    mentor: null,
    studants: null
};