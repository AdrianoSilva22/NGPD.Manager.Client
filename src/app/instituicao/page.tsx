// 'use client'
// import { Instituicoes } from "@/components/instituicoesComponent";
// import { Page } from "@/models/instituicaoModel";
// import { apiService } from "@/service/apiService";
// import { InstituicaoService } from "@/service/instituicao";
// import "@/styles/pagination.css";
// import { useEffect, useState } from "react";
// import { IconContext } from "react-icons";
// import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
// import ReactPaginate from "react-paginate";

// export default function InstituicoesPaginition() {
//     const { getTotalEntities } = InstituicaoService

//     const [pageIndex, setPage] = useState(0)
//     const [pageInfo, setPageInfo] = useState<Page>()
//     const PAGE_SIZE = 50

//     useEffect(() => {
//         const getPageInfo = async () => {
//             const url = `http://localhost:5141/instituicao?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`
//             try {
//                 const pageInfoResponse = await apiService.get(url)
//                 setPageInfo(pageInfoResponse.data)
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         getPageInfo()
//     }, [pageIndex])

//     return (
//         <div className="App">
//             {
//                 pageInfo &&
//                 <>
//                     <Instituicoes instituicoes={pageInfo.instituicoes} />

//                     <ReactPaginate
//                         containerClassName={"pagination"}
//                         pageClassName={"page-item"}
//                         activeClassName={"active"}
//                         onPageChange={(event) => setPage(event.selected)}
//                         pageCount={Math.ceil(pageInfo.totalCount / 15)}
//                         breakLabel="..."
//                         previousLabel={
//                             < IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
//                                 <AiFillLeftCircle />
//                             </IconContext.Provider>
//                         }
//                         nextLabel={
//                             <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
//                                 <AiFillRightCircle />
//                             </IconContext.Provider>
//                         }
//                     />
//                 </>
//             }

//         </div>
//     )
// }