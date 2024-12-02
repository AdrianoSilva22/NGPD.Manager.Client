'use client'

import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Table, TablePaginationConfig, Button, message, Modal, Spin } from "antd";
import { Select as SelectAntd } from "antd";
import Select, { components } from "react-select";
import FeatherIcon from "feather-icons-react";
import { apiService } from "@/service/apiService/apiService";
import "@/styles/pagination.css";
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";
import { UserSession } from "@/models/UserSession";
import { SquadServices } from "@/service/squad";
import { CloseCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

interface Mentor {
    id: string;
    name: string | null;
    email: string | null;
    isActive: boolean;
}

interface Squad {
    id: string;
    name: string;
    turma: {
        id: string;
        name: string | null;
    };
    empresa: {
        id: string;
        name: string | null;
        email: string | null;
    };
    mentor: Mentor | null;
}

interface MentorResponse {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    list: Mentor[];
}

interface SquadResponse {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    list: Squad[];
}

export default function SquadsAndMentorsAllocation() {
    const [squads, setSquads] = useState<Squad[]>([]);
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loggedUser, setLoggedUser] = useState<UserSession>();
    const [loggedUserRole, setLoggedUserRole] = useState<any>(null);
    const PAGE_SIZE = 10;
    const [pageNumber, setPageNumber] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSquad, setSelectedSquad] = useState<Squad | null>(null);
    const [squadSelected, setSquadSelected] = useState<Squad | null>(null);
    const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
    const { deleteEntity } = SquadServices;
    const [squadsFiltro, setSquadsFiltro] = useState<Squad[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                await Promise.all([
                    fetchMentors(), fetchSquads(), getPageInfoFilter(), fetchRole(), loadPerfil()
                ])
            } catch (error) {
                message.error("ERROR SERVER")
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [pageNumber]);

    const fetchRole = () => {
        const perfilToken = Cookies.get("userProfile")
        if (perfilToken) {
            const loggedUserRole = jwtDecode(perfilToken) as string
            setLoggedUserRole(loggedUserRole)
        }
    }

    const fetchMentors = async () => {
        try {
            const response = await apiService.get<MentorResponse>(
                `/Mentor?PageSize=${PAGE_SIZE}&PageNumber=${pageNumber}&Sort=asc`
            );
            setMentors(response.data.list);
        } catch (error) {
            message.error("Erro ao buscar mentores");
        }
    };

    const fetchSquads = async () => {
        try {
            const response = await apiService.get<SquadResponse>(
                `/Squad?PageSize=${PAGE_SIZE}&PageNumber=${pageNumber}&Sort=asc`
            );
            setSquads(response.data.list);
        } catch (error) {
            message.error("Erro ao buscar squads");
        }
    };

    const loadPerfil = async () => {
        const session = await getSession();
        setLoggedUser(session?.user);
    };

    const assignSquadToMentor = async (loggedUserEmail: string, squadId: string) => {
        try {
            const mentorId = mentors.filter((mentor) => {mentor.email == loggedUserEmail && mentor.id})
            await apiService.post(`/Mentor/${mentorId}/AssignSquad/${squadId}`);
            message.success("Squad alocado ao mentor com sucesso!");
        } catch (error) {
            message.error("Erro ao alocar squad ao mentor");
        }
    };

    const getPageInfoFilter = async () => {
        const urlFiltro = `Squad?PageNumber=${0}&pageSize=${99999999}&Sort=asc`;
        const pageInfoResponseFiltro = await apiService.get(urlFiltro);
        setSquadsFiltro(pageInfoResponseFiltro.data.list);

    }

    const options = squadsFiltro.map((squad) => ({
        value: squad.id,
        label: squad.name,
    }));

    const handleChange = (selectedOption: any) => {
        if (selectedOption) {
            const selectedSquad = squadsFiltro.find(
                (squad) => squad.id === selectedOption.value
            );
            setSquadSelected(selectedSquad || null)
        }
    };

    const CustomDropdownIndicator = (props: any) => {

        const handleClearSelection = () => {
            setSquadSelected(null);
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

    const deleteSquad = async (squad: Squad) => {
        try {
            await deleteEntity(squad.id)
            const squadsRemaining = squads?.filter((i) => i.id !== squad.id)
            setSquads(squadsRemaining)
            setSquadsFiltro(squadsRemaining)
            setSquadSelected(null)
            message.success("squad deletado com sucesso!");
        } catch (error) {
            console.log(error);
            message.error("Erro ao excluir squad");
        }
    };

    const updateMentorAlocate = (mentor: Mentor, squad: Squad,newMentorId: string) => {
        Modal.confirm({
          title: "Alterar Mentor",
          content: `Tem certeza de que deseja alterar o mentor atual para este novo mentor? 
                    O mentor atual será desalocado antes da nova alocação.`,
          okText: "Sim",
          cancelText: "Não",
          onOk: async () => {
            try {
              if (mentor?.id) {
                await apiService.post(`/Mentor/${mentor.id}/UnassignSquad/${squad.id}`);
              }
              await apiService.post(`/Mentor/${newMentorId}/AssignSquad/${squad.id}`);
              message.success("Mentor alterado com sucesso!");
            } catch (error) {
              message.error("Erro ao alterar o mentor. Tente novamente.");
            }
          },
        });
      };

    const removeMentorSquad = (loggedUserEmail:string, squadId: string) => {
        // logica para desalocar meu mentor
    }

    const showDeleteConfirm = (squad: Squad) => {
        setSelectedSquad(squad);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if (selectedSquad) {
            await deleteSquad(selectedSquad);
        }
        setIsModalVisible(false);
        setSelectedSquad(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedSquad(null);
    };

    const toggleDropdown = (institutionId: string) => {
        setDropdownVisible(dropdownVisible === institutionId ? null : institutionId);
    };


    const paginationConfig: TablePaginationConfig = {
        current: pageNumber + 1,
        pageSize: PAGE_SIZE,
        total: squads.length,
        onChange: (page) => setPageNumber(page - 1),
    };

    const columTable = [
        {
            title: "Nome do Squad",
            dataIndex: "name",
        },
        {
            title: "Turma",
            dataIndex: ["turma", "name"],
        },
        {
            title: "Empresa",
            dataIndex: ["empresa", "name"],
        },
        {
            title: "Mentor",
            dataIndex: ["empresa", "name"],
            render: (mentor: Mentor | null, squad: Squad) => {
                if (loggedUserRole === "gerente") {
                    return mentor && (
                        <SelectAntd
                        style={{ width: 120 }}
                        onChange={(value: any) => updateMentorAlocate(mentor, squad, value)}
                        placeholder={!mentor ? "Selecione um mentor" : undefined}
                        value={mentor?.name || 'ERROR SERVER MENTOR'}
                      >
                        {mentors.map((mentorOption) => (
                          <SelectAntd.Option key={mentorOption.id} value={mentorOption.id}>
                            {mentorOption.name}
                          </SelectAntd.Option>
                        ))}
                      </SelectAntd>
                    )
                } else if (loggedUserRole === "mentor") {
                    return mentor ? (
                        <span>
                            {mentor.name ? mentor.name : "Mentor ERROR SERVER"}
                            {"adrianodesilva22@gmail.com" === loggedUser?.email && (
                                <span
                                    onClick={() => removeMentorSquad(loggedUser?.email, squad.id)}
                                    style={{ cursor: 'pointer', marginLeft: '5px', color: 'red' }}
                                >
                                    <FeatherIcon icon="trash" size={14} />
                                </span>
                            )}
                        </span>
                    ) : (
                        <span
                            onClick={() => loggedUser && assignSquadToMentor(loggedUser.email, squad.id)}
                            style={{ cursor: 'pointer', color: 'blue' }}
                        >
                            Alocar-me ao Squad <FeatherIcon icon="plus" size={16} />
                        </span>
                    );
                }
                return null;
            },
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (squad: Squad) => (
                <>
                    <div className="btn-rounded">
                        <button
                            type="button"
                            className="btn btn-primary dropdown-toggle me-1"
                            onClick={() => toggleDropdown(squad.id)}
                        >
                            Ações
                        </button>
                        {dropdownVisible === squad.id && (
                            <div className="dropdown-menu show">
                                <Link href="/squad/register" className="dropdown-item">
                                    Adicionar uma Squad
                                </Link>

                                <Link href={{ pathname: '/squad/update', query: { Id: squad.id } }} className="dropdown-item">
                                    Editar uma Squad
                                </Link>

                                <Link href={{ pathname: '/squad/detalhes', query: { Id: squad.id } }} className="dropdown-item">
                                    Detalhes
                                </Link>

                                <div className="dropdown-divider" />

                                <button onClick={() => showDeleteConfirm(squad)} className="dropdown-item" role="button">
                                    Deletar uma Squad
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
                                        <h3 className="page-title">squad</h3>
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
                                            value={squadSelected ? { value: squadSelected.id, label: squadSelected.name } : "Pesquisar pelo Nome"}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="search-student-btn">
                                        <Link href="/squad/register">
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
                        ) : squadSelected ? (
                            <div className="table-responsive">
                                <Table
                                    pagination={false}
                                    columns={columTable}
                                    dataSource={squadSelected ? [squadSelected] : []}
                                    rowKey={(squad: Squad) => squad.id}

                                />
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <Table
                                    pagination={paginationConfig}
                                    columns={columTable}
                                    dataSource={squads}
                                    rowKey={(squad: Squad) => squad.id}
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
                <p>Você tem certeza que deseja excluir esta Squad?</p>
            </Modal>
        </>
    );
}
