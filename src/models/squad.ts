
export interface Squad {
    id: string
    turma: string | undefined
    NameSquad: string
    Studants: File | null
}

export const valorInicialSquad: Squad = {
    id: '',
    turma: '',
    NameSquad: '',
    Studants: null
};