'use client'
import { globalStateAtomId } from "@/atoms/atoms";
import { ClassIes } from "@/models/ClassIes";
import { Page } from "@/models/institution";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { ClassIesServiceDelete } from "@/service/ClassIes";
import { apiService } from "@/service/apiService/apiService";
import "@/styles/pagination.css";
import { Modal, Table } from "antd";
import { Footer } from "antd/es/layout/layout";
import FeatherIcon from "feather-icons-react";
import { useAtom } from "jotai";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";

export default function ClassesPaginition() {

    const [listClassIes, setListClassIes] = useState<ClassIes[]>([]);
    const { deleteEntity } = ClassIesServiceDelete;
    const [pageIndex, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<Page | null>(null);
    const [, SetGlobalStateAtomId] = useAtom(globalStateAtomId);
    const [loading, setLoading] = useState(true);
    const PAGE_SIZE = 15;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedClassIes, setSelectedClassIes] = useState<ClassIes | null>(null);

    useEffect(() => {
        const getPageInfo = async () => {
            try {
                setLoading(true);
                const url = `http://localhost:5189/api/Turma?PageSize=${PAGE_SIZE}&PageNumber=${pageIndex}&Sort=asc`;
                const pageInfoResponse = await apiService.get(url);
                setPageInfo({
                    currentePage: pageInfoResponse.data.currentePage,
                    pageSize: pageInfoResponse.data.pageSize,
                    totalCount: pageInfoResponse.data.totalCount,
                    pageCount: pageInfoResponse.data.pageCount,
                    list: pageInfoResponse.data.list
                });
                setListClassIes(pageInfoResponse.data.list);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        getPageInfo();
    }, [pageIndex]);

    const deleteClassIes = async (classIes: ClassIes) => {
        try {
            if (listClassIes) {
                await deleteEntity(classIes.id);
                const filterlistClassIes = listClassIes.filter(i => i.id !== classIes.id);
                setListClassIes(filterlistClassIes);
                mensagemSucesso("Turma deletada com sucesso!");
            }
        } catch (error) {
            console.log(error);
            mensagemErro('Erro ao excluir Turma');
        }
    };

    const showDeleteConfirm = (classIes: ClassIes) => {
        setSelectedClassIes(classIes);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if (selectedClassIes) {
            await deleteClassIes(selectedClassIes);
        }
        setIsModalVisible(false);
        setSelectedClassIes(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedClassIes(null);
    };

    const columTable = [
        {
            title: 'Curso',
            dataIndex: 'name',
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (classIes: ClassIes) => (
                <>
                    <div className="btn-rounded">
                        <button
                            type="button"
                            className="btn btn-primary dropdown-toggle me-1"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Ações
                        </button>
                        <div className="dropdown-menu">
                            <Link href={{ pathname: '/instituicao/turma/register' }} className="dropdown-item" >
                                Adicionar Turma
                            </Link>
                            <Link href={{ pathname: '/instituicao/turma/detalhes', query: { Id: classIes.id } }} className="dropdown-item" >
                                Visualizar Turma
                            </Link>
                            <Link href={{ pathname: '/instituicao/turma/disponibilidade', query: { Id: classIes.id } }} className="dropdown-item"  >
                                Editar disponibilidade
                            </Link>
                            <div className="dropdown-divider" />
                            <button onClick={() => showDeleteConfirm(classIes)} className="dropdown-item" role="button" color="red" >
                                Deletar Turma
                            </button>
                        </div>
                    </div>
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
                                        <h3 className="page-title">Turmas</h3>
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
                                                        <h3 className="page-title">Turmas</h3>
                                                    </div>
                                                    <div className="col-auhref text-end float-end ms-auhref download-grp">
                                                        <Link href="/instituicao/turma/register" className="btn btn-primary">
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
