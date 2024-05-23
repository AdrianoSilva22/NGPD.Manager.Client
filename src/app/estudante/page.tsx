'use client'
import Sidebar from "@/Sidebar/SideBar";
import { globalStateAtomId } from "@/atoms/atoms";
import Header from "@/components/Header/Header";
import { ClassIes } from "@/models/ClassIes";
import { Page } from "@/models/institution";
import { Student } from "@/models/student";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { ClassIesServiceDelete } from "@/service/ClassIes";
import { apiService } from "@/service/apiService";
import "@/styles/pagination.css";
import { Table } from "antd";
import { Footer } from "antd/es/layout/layout";
import FeatherIcon from "feather-icons-react";
import { useAtom } from "jotai";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";

export default function InstituicoesPaginition() {

    const [students, setStudents] = useState<ClassIes[]>()
    const { deleteEntity } = ClassIesServiceDelete
    const [pageIndex, setPage] = useState(0)
    const [pageInfo, setPageInfo] = useState<Page>()
    const [, SetGlobalStateAtomId] = useAtom(globalStateAtomId)
    const [loading, setLoading] = useState(true);
    const PAGE_SIZE = 15

    useEffect(() => {
        const getPageInfo = async () => {
            const url = `http://localhost:5293/api/v1/studant?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`
            try {
                const pageInfoResponse = await apiService.get(url)
                setPageInfo(pageInfoResponse.data)
                setStudents(pageInfoResponse.data.studants)
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        getPageInfo()
    }, [pageIndex])

    const deleteStudent = async (student: Student) => {
        try {
            if (students) {
                await deleteEntity(student.id)
                const filterStudents = students.filter(i => i.id !== student.id)
                setStudents(filterStudents)
                mensagemSucesso("Estudante deletado com sucesso!")
            }
        } catch (error) {
            console.log(error);
            mensagemErro('Erro ao excluir Estudante');
            student.contact
            student.name
        }
    };

    const columTable = [
        {
            title: 'Nome',
            dataIndex: 'name',
        },
        {
            title: 'Contato',
            dataIndex: 'contact',
        },
        {
            title: 'instituição',
            dataIndex: 'turmaIes',
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (student: Student) => (
                <>
                    <button id="button-delete" onClick={async () => {
                        await deleteStudent(student)
                    }}>
                        <Link href="#" className="btn btn-sm bg-success-light me-2">
                            <i>
                                <FeatherIcon icon="trash" size={16} />
                            </i>
                        </Link>
                    </button>

                    <button id="button-update" onClick={() => {
                        SetGlobalStateAtomId(student.id)
                    }}>
                        <Link href={{ pathname: '/estudante/update', }} className="btn btn-sm bg-danger-light">
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
            <div className="main-wrapper">
                <Header />
                <Sidebar />
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="page-header">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="page-sub-header">
                                        <h3 className="page-title">Estudantes</h3>
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
                                                        <h3 className="page-title">Estudantes</h3>
                                                    </div>
                                                    <div className="col-auhref text-end float-end ms-auhref download-grp">
                                                        <Link href="/estudante/register" className="btn btn-primary">
                                                            <i className="fas fa-plus" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            {pageInfo && (
                                                <>
                                                    <div className="table-responsive">
                                                        <Table
                                                            pagination={false}
                                                            columns={columTable}
                                                            dataSource={students}
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
    )
}