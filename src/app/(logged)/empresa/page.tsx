'use client'
import { Empresa } from "@/models/empresa";
import { Page as InstitutionPage } from "@/models/institution";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService/apiService";
import { EmpresaService } from "@/service/empresa";
import "@/styles/pagination.css";
import { Modal, Table, TablePaginationConfig } from "antd";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { Button } from "@nextui-org/react";

export default function EmpresasPaginition() {
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const { deleteEntity } = EmpresaService;
    const [pageNumber, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<InstitutionPage | null>(null);
    const PAGE_SIZE = 15;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
    const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);

    useEffect(() => {
        const getPageInfo = async () => {
            try {
                const url = `Empresa?PageNumber=${pageNumber}&pageSize=${PAGE_SIZE}&Sort=asc`
                const pageInfoResponse = await apiService.get(url);
                setPageInfo({
                    currentePage: pageInfoResponse.data.currentePage,
                    pageSize: pageInfoResponse.data.pageSize,
                    totalCount: pageInfoResponse.data.totalCount,
                    pageCount: pageInfoResponse.data.pageCount,
                    list: pageInfoResponse.data.list
                });
                setEmpresas(pageInfoResponse.data.list);
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

    const deleteEmpresa = async (empresa: Empresa) => {
        try {
            await deleteEntity(empresa.id);
            const filteredEmpresas = empresas?.filter(i => i.id !== empresa.id);
            setEmpresas(filteredEmpresas);
            mensagemSucesso("Empresa deletada com sucesso!");
        } catch (error) {
            console.log(error);
            mensagemErro('Erro ao excluir Empresa');
        }
    };

    const showDeleteConfirm = (empresa: Empresa) => {
        setSelectedEmpresa(empresa);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if (selectedEmpresa) {
            await deleteEmpresa(selectedEmpresa);
        }
        setIsModalVisible(false);
        setSelectedEmpresa(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedEmpresa(null);
    };

    const toggleDropdown = (empresaId: string) => {
        setDropdownVisible(dropdownVisible === empresaId ? null : empresaId);
    };

    const columTable = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Contato',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (empresa: Empresa) => (
                <>
                    <div className="btn-rounded">
                        <button
                            type="button"
                            className="btn btn-primary dropdown-toggle me-1"
                            onClick={() => toggleDropdown(empresa.id)}
                        >
                            Ações
                        </button>
                        {dropdownVisible === empresa.id && (
                            <div className="dropdown-menu show">
                                <Link href={{ pathname: '/empresa/register' }} className="dropdown-item">
                                    Adicionar uma Instituição
                                </Link>
                                <Link href={{ pathname: '/empresa/update', query: { Id: empresa.id } }} className="dropdown-item">
                                    Editar uma instituição
                                </Link>
                                <Link href={{ pathname: '/empresa/detalhes', query: { Id: empresa.id } }} className="dropdown-item">
                                    Detalhes
                                </Link>
                                <Link href={{ pathname: '/empresa/disponibilidade', query: { Id: empresa.id } }} className="dropdown-item">
                                    Editar disponibilidade
                                </Link>
                                <div className="dropdown-divider" />
                                <button onClick={() => showDeleteConfirm(empresa)} className="dropdown-item" role="button">
                                    Deletar uma instituição
                                </button>
                            </div>
                        )}
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
                                        <h3 className="page-title">Empresa</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="student-group-form">
                            <div className="row">
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                        <div className="search-student-btn">
                                            <Link href="/empresa/register">
                                                <button type="button" className="btn btn-primary">Incluir</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        pageInfo &&
                        <div className="table-responsive">
                            <Table
                                pagination={paginationConfig}
                                columns={columTable}
                                dataSource={empresas}
                                rowKey={(empresa: Empresa) => empresa.email}
                            />
                        </div>
                    }
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
                <p>Você tem certeza que deseja excluir esta Empresa?</p>
            </Modal>
        </>
    )
}
