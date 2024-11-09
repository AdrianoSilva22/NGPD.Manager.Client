'use client';

import { globalStateAtomId } from "@/atoms/atoms";
import { UserSession } from "@/models/UserSession";
import { Page } from "@/models/institution";
import { Mentor } from "@/models/mentor";
import { Squad } from "@/models/squad";
import { mensagemErro } from "@/models/toastr";
import { apiService } from "@/service/apiService/apiService";
import { SquadServices } from "@/service/squad";
import "@/styles/pagination.css";
import { Table, TablePaginationConfig, Select } from "antd";
import FeatherIcon from "feather-icons-react";
import { useAtom } from "jotai";
import { getSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { jwtDecode } from "jwt-decode";
import { PermissionRequirement } from "@/components/PermissionRequirement ";

export default function SquadsPagination() {
    const [squads, setSquads] = useState<Squad[]>([]);
    const [mentores, setMentores] = useState<MentorEstatico[]>([]);
    const [selectedMentor, setSelectedMentor] = useState<MentorEstatico | null>(null);
    const [perfil, setPerfil] = useState<Perfil | null>(null);

    // Definindo o estado inicial dos mentores e squads
    const initialMentors: MentorEstatico[] = [
        { id: "302", contaUsuarioId: "12345-abcde-67890-fghij", name: "Thiago", email: 'thia@gmail.com' },
        { id: "303", contaUsuarioId: "23456-bcdef-78901-ghijk", name: "Bárbara", email: "barbr@gmail.com" },
        { id: "301", contaUsuarioId: "34567-cdefg-89012-hijkl", name: "Adriano", email: "mundobr097@gmail.com" },
    ];

    const initialSquads: Squad[] = [
        { id: "1", turmaId: "101", empresaId: "Porto Digital", mentorId: "301", name: "Squad Ficr", allocatedMentorEmail: '' },
        { id: "2", turmaId: "102", empresaId: "TRF", mentorId: "302", name: "Squad Unit", allocatedMentorEmail: '' },
        { id: "3", turmaId: "103", empresaId: "Ferreira Costa", mentorId: "303", name: "Squad Cesar", allocatedMentorEmail: '' },
    ];

    // Estados para controle de exibição e sessão
    const [pageNumber, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<Page>();
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<any>(null);

    const PAGE_SIZE = 5;

    interface MentorEstatico {
        id: string;
        contaUsuarioId: string;
        name: string;
        email: string;
    }

    interface Perfil {
        tipo: string;
        sub: string;
    }

    const fetchSession = async () => {
        const userSession = await getSession();
        if (userSession) {
            setSession(userSession);
        } else {
            mensagemErro("Sessão não encontrada");
        }
    };

    const fetchUserRole = () => {
        const tokenUser = Cookies.get("tokenUserInfo");
        if (tokenUser) {
            const perfil = Cookies.get("userProfile") as string;
            const tokenDecoded = jwtDecode<{ sub: string }>(tokenUser);
            setPerfil({ tipo: perfil, sub: tokenDecoded.sub });
        }
    };

    // Carrega as informações iniciais dos squads e mentores
    useEffect(() => {
        fetchSession();
        fetchUserRole();
        setSquads(initialSquads);
        setMentores(initialMentors);
        setLoading(false);
    }, [pageNumber]);

    useEffect(() => {
        console.log(mentores);
        
    }, [mentores]);

    // Configuração de paginação
    const paginationConfig: TablePaginationConfig = {
        current: pageNumber + 1,
        pageSize: PAGE_SIZE,
        total: pageInfo ? Math.ceil(pageInfo.totalCount / PAGE_SIZE) : 0,
        showSizeChanger: true,
        onChange: (page) => setPage(page - 1),
    };

    // Alocação e remoção de mentores
    const allocateMentor = (squadId: string, mentorId: string) => {
        const mentor = mentores.find((m) => m.id === mentorId);
        if (mentor) {
            setSelectedMentor(mentor);
        }
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
                            onChange={(value) => allocateMentor(squad.id, value)}
                            placeholder="Selecione um mentor"
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
                        selectedMentor ? (
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                {selectedMentor.name}
                                {selectedMentor.email === perfil.sub ? (
                                    <span
                                        onClick={() => setSelectedMentor(null)}
                                        style={{ cursor: 'pointer', marginLeft: '5px', color: 'black' }}
                                    >
                                        <FeatherIcon icon="trash" size={10} />
                                    </span>
                                ) : null}
                            </span>
                        ) : (
                            <span onClick={() => allocateMentor(squad.id, perfil.sub || '')} style={{ cursor: 'pointer' }}>
                                Alocar-me ao Squad <FeatherIcon icon="plus" size={18} />
                            </span>
                        )
                    );
                }
            },
        },
    ];

    return (
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
                                    <input type="text" className="form-control" placeholder="nome ..." />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Id ..." />
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <button type="button" className="btn btn-primary">
                                    Pesquisar
                                </button>
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
                                                <h5 className="card-title">Squads</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <Table
                                        columns={columTable}
                                        dataSource={squads}
                                        pagination={paginationConfig}
                                        loading={loading}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ReactPaginate
                        previousLabel={<AiFillLeftCircle />}
                        nextLabel={<AiFillRightCircle />}
                        breakLabel="..."
                        pageCount={pageInfo ? Math.ceil(pageInfo.totalCount / PAGE_SIZE) : 0}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={5}
                        onPageChange={({ selected }) => setPage(selected)}
                        containerClassName="pagination"
                        activeClassName="active"
                    />
                </div>
            </div>
        </div>
    );
}