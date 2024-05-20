
export interface Instituicao {
    id: string
    name: string;
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
    name: ''
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