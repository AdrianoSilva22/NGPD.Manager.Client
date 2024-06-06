'use client'
import { globalStateAtomId } from "@/atoms/atoms";
import Sidebar from "@/components/Sidebar/SideBar";
import { Institution, Page } from "@/models/institution";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService/apiService";
import { InstituitionServices } from "@/service/institution";
import "@/styles/pagination.css";
import { Modal, Spin, Table } from "antd";
import FeatherIcon from "feather-icons-react";
import { useAtom } from "jotai";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import Header, { default as Footer } from '../../components/Header/Header';

export default function InstitutionsPaginition() {
    const [institutions, setInstitutions] = useState<Institution[]>();
    const { deleteEntity } = InstituitionServices;
    const [pageIndex, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<Page>();
    const [isLoading, setIsLoading] = useState(false);
    const [] = useAtom(globalStateAtomId);
    const PAGE_SIZE = 15;
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedInstituion, setSelectedInstituion] = useState<Institution | null>(null)

    useEffect(() => {
        const getPageInfo = async () => {
            try {
                setIsLoading(true); // Iniciar carregamento
                const url = `http://localhost:5293/api/v1/institution?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`
                const pageInfoResponse = await apiService.get(url)
                setPageInfo(pageInfoResponse.data)
                setInstitutions(pageInfoResponse.data.institution)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        getPageInfo()
    }, [pageIndex])

    const deleteInstituicao = async (institution: Institution) => {
        try {
            await deleteEntity(institution.id);
            const filteredInstitutions = institutions?.filter(i => i.contact !== institution.contact);
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
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Contato',
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (institution: Institution) => (
                <>
                <button id="button-delete" onClick={() => showDeleteConfirm(institution)}>
                    <Link href="#" className="btn btn-sm bg-success-light me-2">
                        <i>
                            <FeatherIcon icon="trash" size={16} />
                        </i>
                    </Link>
                </button>

                <Link href={{ pathname: '/instituicao/update', query: { Id: institution.id } }} className="btn btn-sm bg-danger-light">
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
                                        <h3 className="page-title">Instituições</h3>
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
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card card-table comman-shadow">

                                <div className="card-body">
                                    <div className="page-header">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="page-title">Instituições</h3>
                                            </div>
                                            <div className="col-auhref text-end float-end ms-auhref download-grp">
                                                <Link href="/instituicao/register" className="btn btn-primary">
                                                    <i className="fas fa-plus" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        isLoading ? (
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
                                                        rowKey={(institution: Institution) => institution.contact}
                                                    />
                                                </div>
                                            )
                                        )
                                    }
                                    {
                                        pageInfo && (
                                            <ReactPaginate
                                                containerClassName={"pagination"}
                                                pageClassName={"page-item"}
                                                activeClassName={"active"}
                                                onPageChange={(event) => setPage(event.selected)}
                                                pageCount={Math.ceil(pageInfo.totalCount / 15)}
                                                breakLabel="..."
                                                previousLabel={
                                                    < IconContext.Provider value={{ color: "#B8C1CC", size: "26px" }}>
                                                        <AiFillLeftCircle />
                                                    </IconContext.Provider>
                                                }
                                                nextLabel={
                                                    <IconContext.Provider value={{ color: "#B8C1CC", size: "26px" }}>
                                                        <AiFillRightCircle />
                                                    </IconContext.Provider>
                                                }
                                            />
                                        )
                                    }
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
                <p>Você tem certeza que deseja excluir esta Instituicao?</p>
            </Modal>
        </>
    )
}
