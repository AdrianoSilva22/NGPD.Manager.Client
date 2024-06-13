export interface Squad {
    id: string
    qtd: string
    institutionClasseId: string
    classModule: string | undefined
    nameSquad: string
    turmaIesId:string
    mentorId: string
    empresaId: string
}

export const initialValueSquad: Squad = {
    id: '',
    institutionClasseId: '',
    classModule: '',
    nameSquad: '',
    mentorId: '',
    qtd: "",
    turmaIesId: "",
    empresaId: ""
};