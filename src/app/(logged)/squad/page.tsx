'use client'
import { globalStateAtomId } from "@/atoms/atoms";
import { UserSession } from "@/models/UserSession";
import { Page } from "@/models/institution";
import { Mentor } from "@/models/mentor";
import { Squad } from "@/models/squad";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService/apiService";
import { SquadServiceUpdateMentor, SquadServices } from "@/service/squad";
import "@/styles/pagination.css";
import { Table, TablePaginationConfig, Select } from "antd";
import FeatherIcon from "feather-icons-react";
import { useAtom } from "jotai";
import { getSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { TokenDecoded } from "@/models/tokenDecoded";
import { jwtDecode } from "jwt-decode";
import { PermissionRequirement } from "@/components/PermissionRequirement ";

export default function SquadsPagination() {

    const [squads, setSquads] = useState<Squad[]>([]);
    const [mentores, setMentores] = useState<MentorEstatico[]>([])
    const [mentor, setMentor] = useState<MentorEstatico[]>([])
    const { deleteEntity } = SquadServices;
    const [pageNumber, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<Page>();
    const [use, SetGlobalStateAtomId] = useAtom(globalStateAtomId);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserSession | undefined>();
    const [isAllocating, setIsAllocating] = useState(false);
    const [session, setSession] = useState<any>(null);
    const [tableKey, setTableKey] = useState(0);
    const [selectedMentor, setSelectedMentor] = useState<MentorEstatico | null>(null);
    const [perfil, setPerfil] = useState<Perfil>();

    // Dados Estáticos iniciais para o Estado
    const initialMentors: MentorEstatico[] = [
        {
            id: "302",
            contaUsuarioId: "12345-abcde-67890-fghij",
            name: "Thiago",
            email: 'thia@gmail.com',
        },
        {
            id: "303",
            contaUsuarioId: "23456-bcdef-78901-ghijk",
            name: "Bárbara",
            email: "barbr@gmail.com"
        },
        {
            id: "301",
            contaUsuarioId: "34567-cdefg-89012-hijkl",
            name: "Adriano",
            email: "mundobr097@gmail.com"
        },
    ];

    const [allocatedMentors, setAllocatedMentors] = useState<{ [squadId: string]: MentorEstatico | null }>({
        "1": initialMentors.find((mentor) => mentor.id === "302") || null,
        "2": null,
        "3": null
    })

    interface MentorEstatico {
        id: string;
        contaUsuarioId: string;
        name: string
        email: string
    }

    const PAGE_SIZE = 5;

    // Dados Estáticos iniciais para o Estado
    const initialSquads: Squad[] = [
        {
            id: "1",
            turmaId: "101",
            empresaId: "Porto Digital",
            mentorId: "301",
            name: "Squad Ficr",
            allocatedMentorEmail: ''
        },
        {
            id: "2",
            turmaId: "102",
            empresaId: "TRF",
            mentorId: "302",
            name: "Squad Unit",
            allocatedMentorEmail: ''
        },
        {
            id: "3",
            turmaId: "103",
            empresaId: "Ferreira Costa",
            mentorId: "303",
            name: "Squad Cesar",
            allocatedMentorEmail: '',
        },
    ];


    //dados estaticos pra req do select e de remover mentor
    const SelectMentor = (mentorId: string) => {
        //consumir a rota para alocar mentor ao squad
        const mentor = mentores.find((m) => m.id === mentorId);
        setSelectedMentor(mentor || null);
    }

    const allocateMentor = (squadId: string, email: string) => {
        const mentor = mentores.find((m) => m.email === email) || null;
        if (mentor) {
            setAllocatedMentors(prev => ({
                ...prev,
                [squadId]: mentor, // Aloca o mentor apenas para o squad específico
            }))
        }
    }

    // Função para remover o mentor de um squad específico
    const removeMentor = (squadId: string) => {
        setAllocatedMentors(prev => ({
            ...prev,
            [squadId]: null, // Remove o mentor apenas para o squad específico
        }))
    }

    const fetchSession = async () => {
        const userSession = await getSession();
        if (userSession) {
            setSession(userSession);
        } else {
            mensagemErro("Sessão não encontrada");
        }
    }

    const fetchUserRole = () => {

        const tokenUser = Cookies.get("tokenUserInfo")

        if (tokenUser) {
            const perfil = Cookies.get("userProfile") as string
            const tokenDecoded = jwtDecode(tokenUser) as TokenDecoded
            const emailPerfil = tokenDecoded.sub as string

            setPerfil((p) => ({ ...p, tipo: perfil }))
            setPerfil((p) => ({ ...p, sub: emailPerfil }))
        }
    }

    useEffect(() => {
        fetchSession()
        fetchUserRole()
    }, [])

    useEffect(() => {
        const getPageInfo = async () => {
            // const url = Perfil?PageNumber=${pageNumber}&pageSize=${PAGE_SIZE}&Sort=asc;
            try {
                // const pageInfoResponse = await apiService.get(url);
                // setPageInfo(pageInfoResponse.data);
                // setPerfis(pageInfoResponse.data.list)
                setSquads(initialSquads)
                setMentores(initialMentors)
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getPageInfo();
    }, [pageNumber, perfil])

    const paginationConfig: TablePaginationConfig = {
        current: pageNumber + 1,
        pageSize: PAGE_SIZE,
        total: pageInfo ? Math.ceil(pageInfo.totalCount / PAGE_SIZE) : 0,
        showSizeChanger: true,
        onChange: (page, size) => {
            if (page === 1) {
                setPage(0)
            } else if (page > 1) {
                setPage(page - 1)
            }
        },
    };

    const columTable = [
        {
            title: "Nome",
            dataIndex: "name",
        },
        {
            title: "Turma ID",
            dataIndex: "turmaId",
        },
        {
            title: "Empresa",
            dataIndex: "empresaId",
            key: "empresaId",
        },
        {
            title: "Mentor",
            dataIndex: "mentorId",
            render: (mentorId: string, squad: Squad) => {
                if (perfil?.tipo === "gerente") {
                    return (
                        <Select
                            style={{ width: 120 }}
                            className={allocatedMentors[squad.id] ? 'select-placeholder-dark' : 'select-placeholder-light'}
                            onChange={(value) => allocateMentor(squad.id, mentores.find(m => m.id === value)?.email || '')}
                            placeholder={allocatedMentors[squad.id] ? allocatedMentors[squad.id]?.name : "Selecione um mentor"}
                        >
                            {mentores.map((mentor) => (
                                <Select.Option key={mentor.id} value={mentor.id}>
                                    {mentor.name}
                                </Select.Option>
                            ))}
                        </Select>
                    );
                } else if (perfil?.tipo === "mentor") {
                    return (
                        allocatedMentors[squad.id] ? (
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                {allocatedMentors[squad.id]?.name}
                                {allocatedMentors[squad.id]?.email === perfil.sub ? (
                                    <span
                                        onClick={() => removeMentor(squad.id)}
                                        style={{ cursor: 'pointer', marginLeft: '5px', marginBottom: '15px', color: 'black' }}
                                    >
                                        <FeatherIcon icon="trash" size={10} />
                                    </span>
                                ) : (
                                    <span></span>
                                )}

                            </span>
                        ) : (
                            <span
                                onClick={() => allocateMentor(squad.id, perfil.sub || '')}
                                style={{ cursor: 'pointer' }}
                            >
                                Alocar-me ao Squad <FeatherIcon icon="plus" size={18} />
                            </span>
                        )
                    );
                }
            },
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
                                        <h3 className="page-title">Squads</h3>
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
                                            placeholder="nome ..."
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Id ..."
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="search-student-btn">
                                        <button type="button" className="btn btn-primary">
                                            pesquisar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card card-table comman-shadow">
                                <div className="card-body">

                                    {
                                        loading ?
                                            (<div className="text-center">Carregando...</div>) : (

                                                <>
                                                    <div className="page-header">
                                                        <div className="row align-items-center">
                                                            <div className="col">
                                                                <h3 className="page-title">Squads</h3>
                                                            </div>
                                                            {<PermissionRequirement permission="adicionar-squad">
                                                                <div className="col-auto text-end float-end ms-auto download-grp">
                                                                    <Link href="/squad/register-instituicao" className="btn btn-primary">
                                                                        <i className="fas fa-plus" />
                                                                    </Link>
                                                                </div>
                                                            </PermissionRequirement>}
                                                        </div>
                                                    </div>
                                                    <div className="table-responsive">
                                                        <Table
                                                            dataSource={squads}
                                                            columns={columTable}
                                                            pagination={paginationConfig}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}