'use client'
import { globalStateAtomId } from "@/atoms/atoms";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/SideBar";
import { UserSession } from "@/models/UserSession";
import { Page } from "@/models/institution";
import { Mentor } from "@/models/mentor";
import { Squad } from "@/models/squad";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService/apiService";
import { SquadServiceUpdateMentor, SquadServices } from "@/service/squad";
import "@/styles/pagination.css";
import { Table } from "antd";
import FeatherIcon from "feather-icons-react";
import { useAtom } from "jotai";
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";

export default function SquadsPagination() {
    const { updateAlocationEntity } = SquadServiceUpdateMentor;
    const [squads, setSquads] = useState<Squad[]>([]);
    const { deleteEntity } = SquadServices;
    const [pageIndex, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<Page>();
    const [use, SetGlobalStateAtomId] = useAtom(globalStateAtomId);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserSession | undefined>();
    const [isAllocating, setIsAllocating] = useState(false);
    const [session, setSession] = useState<any>(null);

    const PAGE_SIZE = 15;

    useEffect(() => {
        const fetchSession = async () => {
            const userSession = await getSession();
            if (userSession) {
                setSession(userSession);
            } else {
                mensagemErro("Sessão não encontrada");
            }
        };

        fetchSession();
    }, []);

    useEffect(() => {
        const getPageInfo = async () => {
            const url = `http://localhost:5293/api/v1/Squad?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`;
            try {
                const pageInfoResponse = await apiService.get(url);
                setPageInfo(pageInfoResponse.data);
                setSquads(pageInfoResponse.data.listSquad);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getPageInfo();
    }, [pageIndex]);

    const allocateMentor = async (squad: Squad) => {
        if (isAllocating) return;

        setIsAllocating(true);

        try {
            if (session) {
                await updateAlocationEntity(squad.id, session.user.email);
                mensagemSucesso("Sucesso ao alocar");

                // Atualizando o estado dos squads
                setSquads(prevSquads =>
                    prevSquads.map(s =>
                        s.id === squad.id ? { ...s, mentor: { name: session.user.name } } : s
                    )
                );
            } else {
                mensagemErro("Sessão não encontrada");
            }
        } catch (error) {
            mensagemErro("Erro ao alocar mentor. Por favor, tente novamente.");
            console.error("Erro ao alocar mentor:", error);
        } finally {
            setIsAllocating(false);
        }
    };

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
                    {mentor && mentor.name ? (
                        <span>{mentor.name}</span>
                    ) : (
                        <button
                            id="button-update"
                            onClick={() => allocateMentor(squad)}
                            disabled={isAllocating}
                        >
                            <i>
                                <FeatherIcon icon="plus" size={18} /> Alocar Mentor
                            </i>
                        </button>
                    )}
                </div>
            )
        },
        {
            title: 'Ações',
            render: (text: string, squad: Squad) => (
                <>
                    <Link href={{ pathname: '/squad/update', query: { Id: squad.id } }} className="btn btn-sm bg-danger-light">
                        <i>
                            <FeatherIcon icon="edit" size={18} />
                        </i>
                    </Link>
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
                                <div className="col-lg-2">
                                    <div className="search-student-btn">
                                        <button type="button" className="btn btn-primary">
                                            Search
                                        </button>
                                    </div>
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
                                                    <div className="col-auto text-end float-end ms-auto download-grp">
                                                        <Link href="/squad/register-instituicao" className="btn btn-primary">
                                                            <i className="fas fa-plus" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                pageInfo &&
                                                <div className="table-responsive">
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
                                                    pageCount={Math.ceil(pageInfo.totalCount / PAGE_SIZE)}
                                                    breakLabel="..."
                                                    previousLabel={
                                                        <IconContext.Provider value={{ color: "#B8C1CC", size: "26px" }}>
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
    );
}
