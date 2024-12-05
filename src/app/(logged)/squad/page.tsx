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
import * as signalR from '@microsoft/signalr';

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
    pageCount: number;
    list: Squad[];
}

interface Empresa {
    id: string;
    name: string;
    email: string;
    squads: any[];
    disponibilidades: any[];
}
export default function SquadsAndMentorsAllocation() {
    const [squads, setSquads] = useState<Squad[]>([]);
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [empresas, setEmpresas] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loggedUser, setLoggedUser] = useState<UserSession>();
    const [loggedUserRole, setLoggedUserRole] = useState<any>(null);
    const PAGE_SIZE = 3;
    const [pageNumber, setPageNumber] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSquad, setSelectedSquad] = useState<Squad | null>(null);
    const [squadSelected, setSquadSelected] = useState<Squad | null>(null);
    const [SelectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
    const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
    const { deleteEntity } = SquadServices;
    const [squadsFiltro, setSquadsFiltro] = useState<Squad[]>([]);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                await Promise.all([
                    fetchMentorsAndEmpresa(), fetchConnectionHub(), getPageInfoFilter(), fetchRole(), loadPerfil()
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

    const fetchMentorsAndEmpresa = async () => {
        try {
            const responseMentors = await apiService.get<MentorResponse>(
                `/Mentor?PageSize=${9999999}&PageNumber=${0}&Sort=asc`
            );

            const responseEmpresas = await apiService.get<MentorResponse>(
                `/Empresa?PageSize=${9999999}&PageNumber=${0}&Sort=asc`
            );

            setEmpresas(responseEmpresas.data.list)
            setMentors(responseMentors.data.list);

        } catch (error) {
            message.error("Erro ao buscar mentores");
        }
    };

    const fetchConnectionHub = () => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5189/squadhub') // URL do seu Hub SignalR
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => {
                console.log('Conectado ao SquadHub!');
                setConnection(connection); // Armazena a conexão

                // Invoca o método 'GetSquads' no SignalR
                connection.invoke('GetSquads', pageNumber, PAGE_SIZE, "asc")
                    .catch(err => {
                        console.error('Erro ao invocar GetSquads:', err);
                        setIsLoading(false);
                    });

                // Recebendo squads via SignalR
                connection.on('ReceiveAllSquads', (data: SquadResponse) => {
                    if (data && data.list) {
                        setSquads(data.list);
                        setTotalCount(data.totalCount);
                        setPageCount(data.pageCount); // Define o total de páginas
                    } else {
                        setSquads([]);
                    }
                    setIsLoading(false);
                });
            })
            .catch(err => {
                console.error('Erro ao conectar ao SignalR:', err);
                setIsLoading(false);
            });

        return () => {
            connection.stop().then(() => console.log('Conexão SignalR encerrada.'));
        };
    }

    const loadPerfil = async () => {
        const session = await getSession();
        setLoggedUser(session?.user);
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
            setIsModalVisible(false);
        } catch (error) {
            console.log(error);
            message.error("Erro ao excluir squad");
        }
    };

    const updateMentorAlocate = (mentor: Mentor, squad: Squad, newMentorId: string) => {
        Modal.confirm({
            title: "Alterar Mentor",
            content: `Tem certeza de que deseja alterar o mentor atual para este novo mentor? 
                        O mentor atual será desalocado antes da nova alocação.`,
            okText: "Sim",
            cancelText: "Não",
            onOk: async () => {
                try {
                    if (mentor?.id) {
                        if (connection) {
                            await connection.invoke('UnassignMentor', squad.id, mentor.id);
                        } else {
                            console.error('Erro: A conexão SignalR não está disponível.');
                            message.error('Erro: A conexão SignalR não está disponível.');
                            return;
                        }
                    }

                    const newMentor = mentors.find((mentor) => mentor.id === newMentorId);
                    if (!newMentor) {
                        message.error('Novo mentor não encontrado!');
                        return;
                    }

                    if (connection) {
                        await connection.invoke('AssignMentor', squad.id, newMentor.id);
                    } else {
                        console.error('Erro: A conexão SignalR não está disponível.');
                        message.error('Erro: A conexão SignalR não está disponível.');
                        return;
                    }

                    setSquads(prevSquads =>
                        prevSquads.map(squad =>
                            squad.id === squad.id
                                ? { ...squad, mentor: newMentor }
                                : squad
                        )
                    );

                    message.success("Mentor alterado com sucesso!");
                } catch (error) {
                    console.error('Erro ao alterar o mentor:', error);
                    message.error("Erro ao alterar o mentor. Tente novamente.");
                }
            },
        });
    };

    const assignMentor = (squadId: string, loggedUserEmail: string) => {
        const mentorFound = mentors.find((mentor) => mentor.email || mentor.id === loggedUserEmail);

        if (!mentorFound) {
            message.error('Mentor não encontrado!');
            return;
        }

        const mentorId = mentorFound.id;

        if (connection) {
            connection.invoke('AssignMentor', squadId, mentorId)
                .then(() => {
                    message.success('Mentor atribuído com sucesso!');
                    setSquads(prevSquads =>
                        prevSquads.map(squad =>
                            squad.id === squadId
                                ? { ...squad, mentor: mentorFound }
                                : squad
                        )
                    );
                })
                .catch(err => {
                    console.error('Erro ao atribuir mentor:', err);
                    message.error('Erro ao atribuir mentor!');
                });
        }
    };

    const unassignMentor = (squadId: string, loggedUserEmail: string) => {

        const mentorFound = mentors.find((mentor) => mentor.email === loggedUserEmail);
        console.log(mentors);

        if (!mentorFound) {
            message.error('Mentor não encontrado!');
            return;
        }

        const mentorId = mentorFound.id;

        if (connection) {
            connection.invoke('UnassignMentor', squadId, mentorId)
                .then(() => {
                    message.success('Mentor removido com sucesso!');
                    setSquads(prevSquads =>
                        prevSquads.map(squad =>
                            squad.id === squadId
                                ? { ...squad, mentor: null }
                                : squad
                        )
                    );
                })
                .catch(err => {
                    console.error('Erro ao remover mentor:', err);
                    message.error('Erro ao remover mentor!');
                });
        }
    };

    const assignEmpresaToSquad = (empresaId: string, squadId: string) => {
        fetch(`http://localhost:5189/api/Empresa/${empresaId}/AssignSquad?squadId=${squadId}`, {
            method: "POST",
        })
            .then(response => {
                if (response.ok) {
                    message.success("Empresa alocada com sucesso!");
                } else {
                    message.error("Erro ao alocar empresa");
                }
            })
            .catch(err => {
                message.error("Erro ao alocar empresa");
                console.error(err);
            });
    };


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
        total: totalCount,
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
            dataIndex: ["empresa"],
            render: (empresa: Empresa, squad: Squad) => {
                if (loggedUserRole === "gerente") {
                    return !empresa ? (
                        <div>
                            <SelectAntd
                                style={{ width: 200, marginLeft: "8px" }}
                                placeholder="Alocar..."
                                onChange={(selectedEmpresaId) => {
                                    Modal.confirm({
                                        title: "Alocar Empresa",
                                        content: `Você tem certeza que deseja alocar a empresa ao squad?`,
                                        okText: "Sim",
                                        cancelText: "Não",
                                        onOk: () => {
                                            assignEmpresaToSquad(selectedEmpresaId, squad.id);
                                        },
                                    });
                                }}
                            >
                                {empresas.map((empresaOption) => (
                                    <SelectAntd.Option key={empresaOption.id} value={empresaOption.id}>
                                        {empresaOption.name}
                                    </SelectAntd.Option>
                                ))}
                            </SelectAntd>
                        </div>
                    ) : (
                        <span>{empresa.name}</span>
                    );
                } else if (loggedUserRole === "mentor") {
                    return <span>{empresa?.name}</span>
                }
            }
        },
        {
            title: "Mentor",
            dataIndex: 'mentor',
            render: (mentor: Mentor, squad: Squad) => {
                if (loggedUserRole === "gerente") {
                    return (
                        mentor ? (
                            <SelectAntd
                                style={{ width: 120 }}
                                onChange={(value: any) => updateMentorAlocate(mentor, squad, value)}
                                placeholder={!mentor ? "Selecione um mentor" : undefined}
                                value={mentor?.id || undefined}
                                dropdownRender={(menu) => (
                                    <>
                                        {mentor && (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    padding: "8px",
                                                    cursor: "pointer",
                                                    color: "red",
                                                    fontWeight: "bold",
                                                    borderBottom: "1px solid #f0f0f0",
                                                }}
                                                onClick={() =>
                                                    Modal.confirm({
                                                        title: "Remover Mentor",
                                                        content: `Tem certeza de que deseja remover o mentor ${mentor.name} deste squad?`,
                                                        okText: "Sim",
                                                        cancelText: "Não",
                                                        onOk: () => unassignMentor(squad.id, mentor.email || ""),
                                                    })
                                                }
                                            >
                                                remover
                                            </div>
                                        )}
                                        {menu}
                                    </>
                                )}
                            >
                                {mentors.map((mentorOption) => (
                                    <SelectAntd.Option key={mentorOption.id} value={mentorOption.id}>
                                        {mentorOption.name}
                                    </SelectAntd.Option>
                                ))}
                            </SelectAntd>

                        ) : (
                            <SelectAntd
                                style={{ width: 120 }}
                                onChange={(value: any) => {
                                    const selectedMentor = mentors.find((mentor) => mentor.id === value);

                                    Modal.confirm({
                                        title: "Atribuir Mentor",
                                        content: `Você tem certeza que deseja atribuir o mentor ${selectedMentor?.name} ao squad ${squad.name}?`,
                                        okText: "Sim",
                                        cancelText: "Não",
                                        onOk: () => assignMentor(squad.id, value),
                                    });
                                }}
                                placeholder={!mentor ? "Selecione um mentor" : undefined}
                            >
                                {mentors.map((mentorOption) => (
                                    <SelectAntd.Option key={mentorOption.id} value={mentorOption.id}>
                                        {mentorOption.name}
                                    </SelectAntd.Option>
                                ))}
                            </SelectAntd>

                        )
                    )

                } else if (loggedUserRole === "mentor") {
                    return mentor ? (
                        <span>
                            {mentor.name ? mentor.name : "Mentor ERROR SERVER"}
                            {mentor.email === loggedUser?.email && (
                                <span
                                    onClick={() => unassignMentor(squad.id, loggedUser?.email)}
                                    style={{ cursor: 'pointer', marginLeft: '5px', color: 'red' }}
                                >
                                    <FeatherIcon icon="trash" size={14} />
                                </span>
                            )}
                        </span>
                    ) : (
                        <span
                            onClick={() => loggedUser && assignMentor(squad.id, loggedUser.email)}
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
