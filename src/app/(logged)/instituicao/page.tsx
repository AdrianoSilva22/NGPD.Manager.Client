"use client"
import { globalStateAtomId } from "@/atoms/atoms";
import { Institution, Page } from "@/models/institution";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService/apiService";
import { InstituitionServices } from "@/service/institution";
import "@/styles/pagination.css";
import { Modal, Spin, Table, TablePaginationConfig } from "antd";
import { useAtom } from "jotai";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";

export default function InstitutionsPaginition() {
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const { deleteEntity } = InstituitionServices;
    const [pageNumber, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<Page>();
    const [isLoading, setIsLoading] = useState(false);
    const [] = useAtom(globalStateAtomId);
    const PAGE_SIZE = 15;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedInstituion, setSelectedInstituion] = useState<Institution | null>(null);
    useEffect(() => {
        const getPageInfo = async () => {
            try {
                const url = `Ies?PageNumber=${pageNumber}&pageSize=${PAGE_SIZE}&Sort=asc`
                const pageInfoResponse = await apiService.get(url);
                setPageInfo({
                    currentePage: pageInfoResponse.data.currentePage,
                    pageSize: pageInfoResponse.data.pageSize,
                    totalCount: pageInfoResponse.data.totalCount,
                    pageCount: pageInfoResponse.data.pageCount,
                    list: pageInfoResponse.data.list
                });
                setInstitutions(pageInfoResponse.data.list);
            } catch (error) {
                console.error(error);
            }
        };
        getPageInfo();
    }, [pageNumber]);

    const paginationConfig: TablePaginationConfig = {
        current: pageNumber + 1,
        pageSize: PAGE_SIZE,
        total: pageInfo ? Math.ceil(pageInfo.totalCount / PAGE_SIZE) : 0,
        onChange: (page, size) => {
            if (page === 1) {
                setPage(0)
            } else if (page > 1) {
                setPage(page - 1)
            }
        },
    };


    const deleteInstituicao = async (instituion: Institution) => {
        try {
            await deleteEntity(instituion.id);
            const filteredEmpresas = institutions?.filter(i => i.id !== instituion.id);
            setInstitutions(filteredEmpresas);
            mensagemSucesso("Instituição deletada com sucesso!");
        } catch (error) {
            console.log(error);
            mensagemErro('Erro ao excluir Empresa');
        }
    };

    const showDeleteConfirm = (instituion: Institution) => {
        setSelectedInstituion(instituion);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if (selectedInstituion) {
            await deleteInstituicao(selectedInstituion);
        }
        setIsModalVisible(false);
        setSelectedInstituion(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedInstituion(null);
    };

    const columTable = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (institution: Institution) => (
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
                        <Link href={{ pathname: '/empresa/register' }} className="dropdown-item">
                            Adicionar uma Insituição
                        </Link>
                        <Link href={{ pathname: '/instituicao/detalhes', query: { Id: institution.id } }} className="dropdown-item">
                            Visualizar uma Insituição
                        </Link>
                        <Link href={{ pathname: '/instituicao/update', query: { Id: institution.id } }} className="dropdown-item">
                            Editar uma Insituição
                        </Link>
                        <div className="dropdown-divider" />
                        <button onClick={() => showDeleteConfirm(institution)} className="dropdown-item" role="button">
                            Deletar uma instituição
                        </button>
                    </div>
                </div>
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
                                        <h3 className="page-title">Instituição</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="student-group-form">
                            <div className="row">
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                        <div className="search-student-btn">
                                            <Link href="/instituicao/register">
                                                <button type="button" className="btn btn-primary">Incluir</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isLoading ? (
                            <div className="loading-spinner">
                                <Spin size="large" />
                            </div>
                        ) : (
                            pageInfo && (
                                <div className="table-responsive">
                                    <Table
                                        pagination={paginationConfig}
                                        columns={columTable}
                                        dataSource={institutions}
                                        rowKey={(institution: Institution) => institution.id}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <Modal
                title="Confirmação de Exclusão"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Sim"
                cancelText="Não"
            >
                <p>Você tem certeza que deseja excluir esta Instituicao?</p>
            </Modal>
        </>
    );
}
