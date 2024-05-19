'use client'
import { Estudante } from "@/models/estudanteModel";
import { Page } from "@/models/instituicaoModel";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService";
import { EstudanteService } from "@/service/estudante";
import "@/styles/pagination.css";
import { Table } from "antd";
import FeatherIcon from "feather-icons-react";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import SideBar from '../../Sidebar/SideBar';
import Header, { default as Footer } from '../../components/Header/Header';

export default function InstituicoesPaginition() {

    const [estudantes, setEstudantes] = useState<Estudante[]>()
    const { deleteEntity } = EstudanteService
    const [pageIndex, setPage] = useState(0)
    const [pageInfo, setPageInfo] = useState<Page>()
    const PAGE_SIZE = 15

    useEffect(() => {
        const getPageInfo = async () => {
            const url = `http://localhost:5293/api/v1/studant?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`
            try {
                const pageInfoResponse = await apiService.get(url)
                setPageInfo(pageInfoResponse.data)
                setEstudantes(pageInfoResponse.data.studants)
            } catch (error) {
                console.error(error);
            }
        }
        getPageInfo()
    }, [pageIndex])

    const deleteEstudante = async (estudante: Estudante) => {
        try {
            await deleteEntity(estudante.id)
            const filterEstudante = estudantes?.filter(i => i.email !== estudante.email)
            setEstudantes(filterEstudante)
            mensagemSucesso("Estudante deletado com sucesso!")
        } catch (error) {
            console.log(error);
            mensagemErro('Erro ao excluir Instituição');
        }
    };

    const columTable = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'nome',
        },
        {
            title: 'turmaId',
            dataIndex: 'turmaId',
            key: 'contato',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'contato',
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (estudante: Estudante) => (
                <>

                    <button id="button-delete" onClick={async () => {
                        await deleteEstudante(estudante)
                    }}>
                        <Link href="#" className="btn btn-sm bg-success-light me-2">
                            <i>
                                <FeatherIcon icon="trash" size={16} />
                            </i>
                        </Link>
                    </button>

                    <Link href={{pathname:'/estudante/update', query:{ estudanteEmail: estudante.email, estudanteName: estudante.name, turmaId: estudante.turmaId, estudanteId: estudante.id} }} className="btn btn-sm bg-danger-light">
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
                <Header />
                <SideBar />
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
                                                <h3 className="page-title">Estudantes</h3>
                                            </div>
                                            <div className="col-auhref text-end float-end ms-auhref download-grp">
                                                <Link href="/estudante/register" className="btn btn-primary">
                                                    <i className="fas fa-plus" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        pageInfo &&
                                        <div className="table-responsive" >
                                            <Table

                                                pagination={false}
                                                // pagination={{
                                                //     total: pageInfo.instituicoes.length,
                                                //     showSizeChanger: true,
                                                //     showTotal: (total, range) =>
                                                //         `visualizando ${range[0]} a ${range[1]}`,
                                                //     onChange: handlePageChange,
                                                // }}
                                                columns={columTable}
                                                dataSource={estudantes}
                                                rowKey={(estudante: Estudante) => estudante.id}
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
                        </div>
                    </div>


                </div>

            </div>

            <Footer />
        </>
    )
}