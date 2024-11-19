'use client'
import { globalStateAtomId } from "@/atoms/atoms";
import { Institution, Page } from "@/models/institution";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService/apiService";
import { InstituitionServices } from "@/service/institution";
import "@/styles/pagination.css";
import { Modal, Spin, Table, TablePaginationConfig } from "antd";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { CloseCircleOutlined } from "@ant-design/icons";

export default function InstitutionsPaginition() {
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [institutionsFiltro, setInstitutionsFiltro] = useState<Institution[]>([]);
    const { deleteEntity } = InstituitionServices;
    const [pageNumber, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<Page>();
    const [isLoading, setIsLoading] = useState(false);
    const [] = useAtom(globalStateAtomId);
    const PAGE_SIZE = 2;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedInstituion, setSelectedInstituion] = useState<Institution | null>(null);
    const [institutionSelected, setInstitutionSelected] = useState<Institution | null>(null);
    const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);

    const options = institutionsFiltro.map((instituion) => ({
        value: instituion.id,
        label: instituion.name,
    }));

    const handleChange = (selectedOption: any) => {
        if (selectedOption) {
            const selectedInstitution = institutionsFiltro.find(
                (institution) => institution.id === selectedOption.value
            );
            setInstitutionSelected(selectedInstitution || null)
        }
    };

    const CustomDropdownIndicator = (props: any) => {

        const handleClearSelection = () => {
            setInstitutionSelected(null);
        };
        return (
            <components.DropdownIndicator {...props}>
                <CloseCircleOutlined
                    style={{ fontSize: 16 }}
                    onClick={handleClearSelection}
                />
            </components.DropdownIndicator>
        );
    };

    useEffect(() => {
        const getPageInfo = async () => {
            try {
                setIsLoading(true);

                const url = `Ies?PageNumber=${pageNumber}&pageSize=${PAGE_SIZE}&Sort=asc`;
                const urlFiltro = `Ies?PageNumber=${0}&pageSize=${99999999}&Sort=asc`;

                const pageInfoResponseFiltro = await apiService.get(urlFiltro);
                const pageInfoResponse = await apiService.get(url);

                setPageInfo({
                    currentePage: pageInfoResponse.data.currentePage,
                    pageSize: pageInfoResponse.data.pageSize,
                    totalCount: pageInfoResponse.data.totalCount,
                    pageCount: pageInfoResponse.data.pageCount,
                    list: pageInfoResponse.data.list,
                });

                setInstitutions(pageInfoResponse.data.list);
                setInstitutionsFiltro(pageInfoResponseFiltro.data.list);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
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
                setPage(0);
            } else if (page > 1) {
                setPage(page - 1);
            }
        },
    };

    const deleteInstituicao = async (instituion: Institution) => {
        try {
            await deleteEntity(instituion.id)
            const institutionsRemaining = institutions?.filter((i) => i.id !== instituion.id)
            setInstitutions(institutionsRemaining)
            setInstitutionsFiltro(institutionsRemaining)
            setInstitutionSelected(null)
            mensagemSucesso("Instituição deletada com sucesso!");
        } catch (error) {
            console.log(error);
            mensagemErro("Erro ao excluir institution");
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

    const toggleDropdown = (institutionId: string) => {
        setDropdownVisible(dropdownVisible === institutionId ? null : institutionId);
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
            render: (institution: Institution) => (
                <>
                    <div className="btn-rounded">
                        <button
                            type="button"
                            className="btn btn-primary dropdown-toggle me-1"
                            onClick={() => toggleDropdown(institution.id)}
                        >
                            Ações
                        </button>
                        {dropdownVisible === institution.id && (
                            <div className="dropdown-menu show">
                                <Link href="/institution/register" className="dropdown-item">
                                    Adicionar uma Instituição
                                </Link>
    
                                <Link href={{ pathname: '/institution/update', query: { Id: institution.id } }} className="dropdown-item">
                                    Editar uma instituição
                                </Link>
    
                                <Link href={{ pathname: '/institution/detalhes', query: { Id: institution.id } }} className="dropdown-item">
                                    Detalhes
                                </Link>
    
                                <Link href={{ pathname: '/institution/disponibilidade', query: { Id: institution.id } }} className="dropdown-item">
                                    Editar disponibilidade
                                </Link>
    
                                <div className="dropdown-divider" />
    
                                <button onClick={() => showDeleteConfirm(institution)} className="dropdown-item" role="button">
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
                                        <h3 className="page-title">Instituição</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="student-group-form">
                            <div className="row">
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                        <Select
                                            options={options}
                                            placeholder="Pesquisar pelo Nome"
                                            onChange={handleChange}
                                            components={{
                                                DropdownIndicator: CustomDropdownIndicator,
                                            }}
                                            value={institutionSelected ? { value: institutionSelected.id, label: institutionSelected.name } : "Pesquisar pelo Nome"}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="search-student-btn">
                                        <Link href="/instituicao/register">
                                            <button type="button" className="btn btn-primary">Incluir</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="loading-spinner">
                                <Spin size="large" />
                            </div>
                        ) : institutionSelected ? (
                            <div className="table-responsive">
                                <Table
                                    pagination={false}
                                    columns={columTable}
                                    dataSource={institutionSelected ? [institutionSelected] : []}
                                    rowKey={(institution: Institution) => institution.id}
                                />
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <Table
                                    pagination={paginationConfig}
                                    columns={columTable}
                                    dataSource={institutions}
                                    rowKey={(institution: Institution) => institution.id}
                                />
                            </div>
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
                <p>Você tem certeza que deseja excluir esta Instituição?</p>
            </Modal>
        </>
    );
}