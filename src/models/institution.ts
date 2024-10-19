
export interface Institution {
    id: string
    name: string;
    contact: string;
}

export interface Page {
    currentePage: number
    list:[]
    pageSize: number
    pageCount: number
    totalCount: number
}




 export const initialvalueInstitution: Institution = {
    id: '',
    contact: '',
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