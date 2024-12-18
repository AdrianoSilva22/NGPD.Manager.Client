'use client'
import { ClassIes } from "@/models/ClassIes";
import { Page } from "@/models/institution";
import { Student } from "@/models/student";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService/apiService";
import { StudentServices } from "@/service/student";
import "@/styles/pagination.css";
import { Modal, Table } from "antd";
import { Footer } from "antd/es/layout/layout";
import FeatherIcon from "feather-icons-react";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";

export default function StudentsPaginition() {

    const [students, setStudents] = useState<ClassIes[]>()
    const { deleteEntity } = StudentServices
    const [pageIndex, setPage] = useState(0)
    const [pageInfo, setPageInfo] = useState<Page>()
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
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

    const showDeleteConfirm = (student: Student) => {
        setSelectedStudent(student);
        setIsModalVisible(true);
    };

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
            student.email
            student.name
        }
    };

    const handleOk = async () => {
        if (selectedStudent) {
            await deleteStudent(selectedStudent);
        }
        setIsModalVisible(false);
        setSelectedStudent(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedStudent(null);
    };

    const columTable = [
        {
            title: 'Nome',
            dataIndex: 'name',
        },
        {
            title: 'Contato',
            dataIndex: 'email',
        },
        {
            title: 'Instituição',
            dataIndex: 'turmaIes',
            key: 'institutionName',
            render: (turmaIes: ClassIes) => (
                <div>
                    {/* {turmaIes.institution ? turmaIes.institution.name : 'N/A'} */}
                </div>
            ),
        },
        {
            title: 'Turma',
            dataIndex: 'turmaIes',
            key: 'course',
            render: (turmaIes: ClassIes) => (
                <div>
                    {/* {turmaIes.course || 'N/A'} - {turmaIes.shift || 'N/A'} - {turmaIes.period || 'N/A'} */}
                </div>
            ),
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (student: Student) => (
                <>
                  <button id="button-delete" onClick={() => showDeleteConfirm(student)}>
                    <Link href="#" className="btn btn-sm bg-success-light me-2">
                        <i>
                            <FeatherIcon icon="trash" size={16} />
                        </i>
                    </Link>
                </button>

                <Link href={{ pathname: '/estudante/update', query: { Id: student.id } }} className="btn btn-sm bg-danger-light">
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
            <div className="main-wrapper">
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
                                                            rowKey={(student: ClassIes) => student.id}
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
            <Modal
                title="Confirmação de Exclusão"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Sim"
                cancelText="Não"
            >
                <p>Você tem certeza que deseja excluir esta Empresa?</p>
            </Modal>
        </>
    )
}