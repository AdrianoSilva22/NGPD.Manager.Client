'use client'
import { globalStateAtomId } from "@/atoms/atoms";
import { UserSession } from "@/models/UserSession";
import { Page } from "@/models/institution";
import { Mentor } from "@/models/mentor";
import { Squad } from "@/models/squad";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService/apiService";
import { SquadServiceUpdateMentor, SquadServices } from "@/service/squad";
import "@/styles/pagination.css";
import { Table, TablePaginationConfig } from "antd";
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
    const [pageNumber, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<Page>();
    const [use, SetGlobalStateAtomId] = useAtom(globalStateAtomId);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserSession | undefined>();
    const [isAllocating, setIsAllocating] = useState(false);
    const [session, setSession] = useState<any>(null);
    const [tableKey, setTableKey] = useState(0);

    const [perfis, setPerfis] = useState<Perfil[]>([]);

    const PAGE_SIZE = 1;

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
            const url = `Perfil?PageNumber=${pageNumber}&pageSize=${PAGE_SIZE}&Sort=asc`;
            try {
                const pageInfoResponse = await apiService.get(url);
                setPageInfo(pageInfoResponse.data);
                setPerfis(pageInfoResponse.data.list)

                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getPageInfo();
    }, [pageNumber])

    const paginationConfig: TablePaginationConfig = {
        current: pageNumber + 1,
        pageSize: PAGE_SIZE,
        total: pageInfo ? Math.ceil(pageInfo.totalCount / PAGE_SIZE) : 0,
        showSizeChanger: true,
        onChange: (page, size) => {
            if (page === 1) {
                setPage(0)
            } else if (page > 1) {
                setPage(page - 1)
            }
        },
    };

    const columTable = [
        {
            title: 'Tipo',
            dataIndex: 'tipo',
        },
    ];

    return (
        <>
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
                                            placeholder="nome ..."
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Id ..."
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="search-student-btn">
                                        <button type="button" className="btn btn-primary">
                                            pesquisar
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

                                    {
                                        loading ?
                                            (<div className="text-center">Carregando...</div>) : (

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
                                                    <div className="table-responsive">
                                                        <Table
                                                            dataSource={perfis}
                                                            columns={columTable}
                                                            pagination={paginationConfig}
                                                            rowKey="id"
                                                        />
                                                    </div>
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
