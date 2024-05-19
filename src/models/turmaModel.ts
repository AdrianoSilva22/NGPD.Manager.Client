
export interface Turma {
    id: string
    Periodo: string
    Turno: string
    Curso: string
    CsvFile:  File | null
    InstitutionId: string| undefined
    DisponibilidadeId: string | undefined
}

export const valorInicialTurma: Turma = {
    id: '',
    Periodo: '',
    Turno: '',
    Curso: '',
    CsvFile: null,
    InstitutionId: '',
    DisponibilidadeId: ''
};