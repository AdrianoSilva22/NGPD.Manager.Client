"use client"
import { globalStateAtomId } from "@/atoms/atoms";
import { Institution, Page } from "@/models/institution";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService/apiService";
import { InstituitionServices } from "@/service/institution";
import "@/styles/pagination.css";
import { Modal, Spin, Table } from "antd";
import { useAtom } from "jotai";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";

export default function InstitutionsPaginition() {
    const [institutions, setInstitutions] = useState<Institution[]>([]); // Inicia como array vazio
    const { deleteEntity } = InstituitionServices;
    const [pageIndex, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<Page>();
    const [isLoading, setIsLoading] = useState(false);
    const [] = useAtom(globalStateAtomId);
    const PAGE_SIZE = 15;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedInstituion, setSelectedInstituion] = useState<Institution | null>(null);
    useEffect(() => {
        const getPageInfo = async () => {
            try {
                const url = `http://localhost:5189/api/Ies?PageSize=${PAGE_SIZE}&PageNumber=${pageIndex}&Sort=asc`
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
    }, [pageIndex]);


    const deleteInstituicao = async (institution: Institution) => {
        try {
            await deleteEntity(institution.id);
            const filteredInstitutions = institutions?.filter(i => i.email !== institution.email);
            setInstitutions(filteredInstitutions);
            mensagemSucesso("Instituição deletada com sucesso!");
        } catch (error) {
            console.log(error);
            mensagemErro('Erro ao excluir Instituição');
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
                                        pagination={false}
                                        columns={columTable}
                                        dataSource={institutions}
                                        rowKey={(institution: Institution) => institution.id} // Usando 'id' como rowKey
                                    />
                                </div>
                            )
                        )}
                        {pageInfo && (
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
