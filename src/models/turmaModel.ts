export interface Turma {
    id_instituicao: string;
    periodo: string;
    turno: string;
    curso: string;
    id_disponibilidade: string;
    listStudants: {
        name: string;
        email: string;
    }[];
}


export const valorInicialTurma: Turma = {
    id_instituicao: '',
    periodo: '',
    turno: '',
    curso: '',
    id_disponibilidade: '',
    listStudants: []
};