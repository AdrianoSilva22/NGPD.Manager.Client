'use client'
import { globalStateAtomId } from "@/atoms/atoms";
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/SideBar';
import { ClassIes } from "@/models/ClassIes";
import { Page } from "@/models/institution";
import { Squad, initialValueSquad } from '@/models/squad';
import { apiService } from '@/service/apiService/apiService';
import "@/styles/pagination.css";
import { Table } from "antd";
import { Footer } from 'antd/es/layout/layout';
import FeatherIcon from "feather-icons-react";
import { useAtom } from "jotai";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";

export default function InstituicoesPaginition() {
    const [listClassIes, setListClassIes] = useState<ClassIes[]>([]);
    const [pageIndex, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<Page | null>(null);
    const [, setGlobalStateAtomId] = useAtom(globalStateAtomId);
    const [loading, setLoading] = useState(true);
    const [squadData, setSquadData] = useState<Squad>(initialValueSquad);
    const PAGE_SIZE = 15;
    const searchParams = useSearchParams();

    useEffect(() => {
        const getPageInfo = async () => {
            const url = `http://localhost:5293/api/v1/Institution/TurmaIes/GetAllTurmaIes?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`;
            try {
                const pageInfoResponse = await apiService.get(url);
                setPageInfo(pageInfoResponse.data);
                setListClassIes(pageInfoResponse.data.listClassIes);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getPageInfo();
    }, [pageIndex]);

    useEffect(() => {
        const classIesId = searchParams.get('classIesId');
        if (classIesId) {
            setSquadData(prevData => ({ ...prevData, classIesId }));
        }
    }, [searchParams]);

    const columTable = [
        {
            title: 'Instituição',
            dataIndex: 'institution',
            render: (institution: { name: string }) => institution.name,
        },
        {
            title: 'Curso',
            dataIndex: 'course',
        },
        {
            title: 'Turno',
            dataIndex: 'shift',
        },
        {
            title: 'Ano de Ingresso',
            dataIndex: 'period',
        },
        {
            title: 'Disponibilidade',
            dataIndex: 'availability',
            // render: (availabilityClassIes: Availability) => (
            //     <div>
            //         {availabilityClassIes.dayWeek}: {availabilityClassIes.startTime} - {availabilityClassIes.scheduleEnd}
            //     </div>
            // ),
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (classIes: ClassIes) => (
                <>
                    <button id="button-update" onClick={() => {
                        setGlobalStateAtomId(classIes.id);
                    }}>
                        <Link href={{ pathname: '/squad/register-squad', query: { classIesId: classIes.id } }} className="btn btn-sm bg-danger-light">
                            <i>
                                <FeatherIcon icon="user" size={18} />
                            </i>
                        </Link>
                    </button>

                    <button id="button-update" onClick={() => {
                        setGlobalStateAtomId(classIes.id);
                    }}>
                        <Link href={{ pathname: '/squad/register-turmacompleta', query: { classIesId: classIes.id } }} className="btn btn-sm bg-danger-light">
                            <i>
                                <FeatherIcon icon="users" size={18} />
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
                                        <h3 className="page-title">Turmas</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="student-group-form">
                            <div className="row">
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="search-student-btn">
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
                                                        <h3 className="page-title">Turmas</h3>
                                                    </div>
                                                    <div className="col-auhref text-end float-end ms-auhref download-grp">
                                                    </div>
                                                </div>
                                            </div>
                                            {pageInfo && (
                                                <>
                                                    <div className="table-responsive">
                                                        <Table
                                                            pagination={false}
                                                            columns={columTable}
                                                            dataSource={listClassIes}
                                                            rowKey={(classIes: ClassIes) => classIes.id}
                                                        />
                                                    </div>
                                                    <ReactPaginate
                                                        containerClassName={"pagination"}
                                                        pageClassName={"page-item"}
                                                        activeClassName={"active"}
                                                        onPageChange={(event) => setPage(event.selected)}
                                                        pageCount={Math.ceil(pageInfo.totalCount / 15)}
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
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

