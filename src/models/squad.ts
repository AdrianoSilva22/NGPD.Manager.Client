

export interface Squad {
    id: string
    qtd: string
    classSquad: string | undefined
    nameSquad: string
    classIesId:string
    mentor: null | string
}

export const initialValueSquad: Squad = {
    id: '',
    classSquad: '',
    nameSquad: '',
    mentor: null,
    qtd: "",
    classIesId: ""
};