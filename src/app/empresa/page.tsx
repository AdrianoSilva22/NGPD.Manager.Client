'use client'
import Sidebar from "@/components/Sidebar/SideBar";
import { Empresa } from "@/models/empresa";
import { Page } from "@/models/institution";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService/apiService";
import { EmpresaService } from "@/service/empresa";
import "@/styles/pagination.css";
import { Modal, Table } from "antd";
import FeatherIcon from "feather-icons-react";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import Header, { default as Footer } from '../../components/Header/Header';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

export default function EmpresasPaginition() {
    const [empresas, setEmpresas] = useState<Empresa[]>();
    const { deleteEntity } = EmpresaService;
    const [pageIndex, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<Page>();
    const PAGE_SIZE = 15;
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null)

    useEffect(() => {
        const getPageInfo = async () => {
            try {
                const url = `http://localhost:5293/api/v1/Empresa?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`
                const pageInfoResponse = await apiService.get(url)
                setPageInfo(pageInfoResponse.data)
                setEmpresas(pageInfoResponse.data.empresa)
            } catch (error) {
                console.error(error);
            }
        }
        getPageInfo()
    }, [pageIndex])

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
            render: (empresa: Empresa) => (
               
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
                    <Link href={{ pathname: '/empresa/register',  }} className="dropdown-item" >
                      Adicionar uma Insituticao
                    </Link>
                    <Link  href={{ pathname: '/empresa/update', query: { Id: empresa.id } }} className="dropdown-item" >
                     Editar uma instituicao
                    </Link>
                    <Link href={{ pathname: '/empresa/detalhes', query: { Id: empresa.id } }} className="dropdown-item" >
                     Detalhes
                    </Link>
                    <Link  href={{ pathname: '/empresa/disponibilidade', query: { Id: empresa.id } }} className="dropdown-item" >
                     Editar disponibilidade
                    </Link>
                    <div className="dropdown-divider" />
                    <button onClick={() => showDeleteConfirm(empresa)} className="dropdown-item" role="button">
                    Deletar uma instituição
                    </button>
                  </div>
                </div>
                {/* <button id="button-delete" onClick={() => showDeleteConfirm(empresa)}>
                    <Link href="#" className="btn btn-sm bg-success-light me-2">
                        <i>
                            <FeatherIcon icon="trash" size={16} />
                        </i>
                    </Link>
                </button>

                        <Link href={{ pathname: '/empresa/update', query: { Id: empresa.id } }} className="btn btn-sm bg-danger-light">
                            <i>
                                <FeatherIcon icon="edit" size={18} />
                            </i>
                        </Link>

                        <Link href={{ pathname: '/empresa/disponibilidade', query: { Id: empresa.id } }} className="btn btn-sm bg-danger-light">
                            <i>
                                <FeatherIcon icon="clock" size={18} />
                            </i>
                        </Link> */}
                    

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
                                <Link    href="/empresa/register">
                                <button type="button" className="btn btn-primary">Incluir</button>
                                </Link>
                                </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                       
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                        
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                                    {
                                        pageInfo &&
                                        <div className="table-responsive" >
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
                                    }


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