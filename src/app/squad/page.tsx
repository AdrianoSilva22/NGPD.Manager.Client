'use client'
import { globalStateAtomId } from "@/atoms/atoms";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/SideBar";
import { Page } from "@/models/institution";
import { Mentor } from "@/models/mentor";
import { Squad } from "@/models/squad";
import { apiService } from "@/service/apiService/apiService";
import { SquadServices } from "@/service/squad";
import "@/styles/pagination.css";
import { Table } from "antd";
import FeatherIcon from "feather-icons-react";
import { useAtom } from "jotai";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";

export default function SquadsPaginition() {

    const [squads, setSquads] = useState<Squad[]>([])
    const { deleteEntity } = SquadServices
    const [pageIndex, setPage] = useState(0)
    const [pageInfo, setPageInfo] = useState<Page>()
    const [use, SetGlobalStateAtomId] = useAtom(globalStateAtomId)
    const [loading, setLoading] = useState(true);

    const PAGE_SIZE = 15
    
    useEffect(() => {
        const getPageInfo = async () => {
            const url = `http://localhost:5293/api/v1/Squad?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`
            try {
                const pageInfoResponse = await apiService.get(url)
                setPageInfo(pageInfoResponse.data)
                setSquads(pageInfoResponse.data.listSquad)
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        getPageInfo()
    }, [pageIndex])
    
    const columTable = [
        {
            title: 'Nome',
            dataIndex: 'name',
        },
        {
            title: 'Mentor',
            dataIndex: 'mentor',
            render: (mentor: Mentor | null, squad: Squad) => (
                <div>
                    {mentor && mentor.name ? mentor.name : <>
                        <button id="button-update" onClick={() => {
                            SetGlobalStateAtomId(squad.id)
                        }}>
                            <Link href={{ pathname: '/squad/update', }} className="btn btn-sm bg-danger-light">
                                <i>
                                <FeatherIcon icon="plus" size={18} /> Alocar Mentor
                                </i>
                            </Link>
                        </button>
                    </>
                    }
                </div>
            )
        },
        {
            title: 'Ações',
            render: (squad: Squad) => (
                <>
                    <button id="button-update" onClick={() => {
                        SetGlobalStateAtomId(squad.id)
                    }}>
                        <Link href={{ pathname: '/squad/update', }} className="btn btn-sm bg-danger-light">
                            <i>
                                <FeatherIcon icon="edit" size={18} />
                            </i>
                        </Link>
                    </button>
                </>
            ),
        },
    ];

    return (
        <>
         <Header />
          <Sidebar />
            <div className="main-wrapper">
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="page-header">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="page-sub-header">
                                        <h3 className="page-title">Squads</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="student-group-form">
                            <div className="row">
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by ID ..."
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by Name ..."
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="search-student-btn">
                                    <button type="button" className="btn btn-primary">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card card-table comman-shadow">

                                <div className="card-body">
                                    {loading ? (
                                        <div className="text-center">Carregando...</div>
                                    ) : (
                                        <>

                                            <div className="page-header">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <h3 className="page-title">Squads</h3>
                                                    </div>
                                                    <div className="col-auhref text-end float-end ms-auhref download-grp">
                                                        <Link href="/squad/register-instituicao" className="btn btn-primary">
                                                            <i className="fas fa-plus" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                pageInfo &&
                                                <div className="table-responsive" >
                                                    <Table

                                                        pagination={false}
                                                        columns={columTable}
                                                        dataSource={squads}
                                                        rowKey={(squad: Squad) => squad.id}
                                                    />

                                                </div>

                                            }
                                            {
                                                pageInfo &&
                                                <ReactPaginate
                                                    containerClassName={"pagination"}
                                                    pageClassName={"page-item"}
                                                    activeClassName={"active"}
                                                    onPageChange={(event) => setPage(event.selected)}
                                                    pageCount={Math.ceil(pageInfo.totalCount / 15)}
                                                    breakLabel="..."
                                                    previousLabel={
                                                        < IconContext.Provider value={{ color: "#B8C1CC", size: "26px" }}>
                                                            <AiFillLeftCircle />
                                                        </IconContext.Provider>
                                                    }
                                                    nextLabel={
                                                        <IconContext.Provider value={{ color: "#B8C1CC", size: "26px" }}>
                                                            <AiFillRightCircle />
                                                        </IconContext.Provider>
                                                    }
                                                />
                                            }
                                        </>

                                    )}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </>
    )
}