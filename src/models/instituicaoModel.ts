
export interface Instituicao {
    id: string
    nome: string;
    contato: string;
}

export interface Page {
    currentePage: number
    instituicoes: Instituicao[]
    pageSize: number
    totalCount: number
    totalPages: number
}




 export const valorInicialInstituicao: Instituicao = {
    id: '',
    contato: '',
    nome: ''
}

// export interface PaginationProps {
//     items: number;
//     currentPage: any;
//     pageSize: any;
//     onPageChange: any;
// }

// export interface PaginationPropscurrentPage {
//     currentPage: any;
// }

// export interface PaginationPropspageSize {
//     pageSize: any;
// }