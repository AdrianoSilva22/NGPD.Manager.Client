// Importações necessárias
'use client'
import { Empresa } from "@/models/empresa";
import { Page as InstitutionPage } from "@/models/institution";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService/apiService";
import { EmpresaService } from "@/service/empresa";
import "@/styles/pagination.css";
import { Modal, Table } from "antd";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { Button } from "@nextui-org/react";

export default function EmpresasPaginition() {
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const { deleteEntity } = EmpresaService;
    const [pageIndex, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<InstitutionPage | null>(null);
    const PAGE_SIZE = 15;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
    const [dropdownVisible, setDropdownVisible] = useState<string | null>(null); // Estado para controlar o dropdown

    useEffect(() => {
        const getPageInfo = async () => {
            try {
                const url = `http://localhost:5189/api/Empresa?PageSize=${PAGE_SIZE}&PageNumber=${pageIndex}&Sort=asc`
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
    }, [pageIndex]);

    const deleteEmpresa = async (empresa: Empresa) => {
        try {
            await deleteEntity(empresa.id);
            const filteredEmpresas = empresas?.filter(i => i.contact !== empresa.contact);
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
                                pagination={false}
                                columns={columTable}
                                dataSource={empresas}
                                rowKey={(empresa: Empresa) => empresa.contact}
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
