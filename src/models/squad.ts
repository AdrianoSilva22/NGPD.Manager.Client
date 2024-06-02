export interface Squad {
    id: string
    qtd: string
    classSquad: string | undefined
    nameSquad: string
    classIesId:string
    mentorId: string
}

export const initialValueSquad: Squad = {
    id: '',
    classSquad: '',
    nameSquad: '',
    mentorId: '',
    qtd: "",
    classIesId: ""
};