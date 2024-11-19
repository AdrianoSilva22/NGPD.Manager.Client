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

export default function SquadsPagination() {
    const [squads, setSquads] = useState<Squad[]>([]);
    const [mentores, setMentores] = useState<MentorEstatico[]>([]);
    const [selectedMentor, setSelectedMentor] = useState<MentorEstatico | null>(null);
    const [perfil, setPerfil] = useState<Perfil | null>(null);

    const initialMentors: MentorEstatico[] = [
        { id: "302", contaUsuarioId: "12345-abcde-67890-fghij", name: "Thiago", email: 'thia@gmail.com' },
        { id: "303", contaUsuarioId: "23456-bcdef-78901-ghijk", name: "Bárbara", email: "barbr@gmail.com" },
        { id: "301", contaUsuarioId: "34567-cdefg-89012-hijkl", name: "Adriano", email: "adrianodesilva22@gmail.com" },
        { id: "301", contaUsuarioId: "34567-cdefg-89012-hijkl", name: "mundobr", email: "mundobr097@gmail.com" },
    ];

    const initialSquads: Squad[] = [
        { id: "1", turmaId: "101", empresaId: "Porto Digital", mentorId: "302", name: "Squad Ficr", allocatedMentorEmail: 'thia@gmail.com' },
        { id: "2", turmaId: "102", empresaId: "TRF", mentorId: "", name: "Squad Unit", allocatedMentorEmail: '' },
        { id: "3", turmaId: "103", empresaId: "Ferreira Costa", mentorId: "", name: "Squad Cesar", allocatedMentorEmail: '' },
    ];

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
            const userProfileEncoded = Cookies.get("userProfile");
            if (userProfileEncoded) {
                const UserProfileDecoded = jwtDecode(userProfileEncoded) as string;
                const tokenDecoded = jwtDecode<{ sub: string }>(tokenUser);
                if (UserProfileDecoded) {
                    setPerfil({ tipo: UserProfileDecoded, sub: tokenDecoded.sub });
                }
            }
        }
    };

    useEffect(() => {
        fetchSession();
        fetchUserRole();
        setSquads(initialSquads);
        setMentores(initialMentors);
        setLoading(false);
    }, [pageNumber]);

    const paginationConfig: TablePaginationConfig = {
        current: pageNumber + 1,
        pageSize: PAGE_SIZE,
        total: pageInfo ? Math.ceil(pageInfo.totalCount / PAGE_SIZE) : 0,
        showSizeChanger: true,
        onChange: (page) => setPage(page - 1),
    };

    const allocateMentor = (squadId: string, emailMentor: string) => {
        
        const mentor = mentores.find((m) => m.email === emailMentor);
        if (mentor) {
            setSquads((prevSquads) =>
                prevSquads.map((squad) =>
                    squad.id === squadId
                        ? { ...squad, mentorId: mentor.id, allocatedMentorEmail: mentor.email }
                        : squad
                )
            );
        } else {
            setSquads((prevSquads) =>
                prevSquads.map((squad) =>
                    squad.id === squadId
                        ? { ...squad, mentorId: '', allocatedMentorEmail: '' }
                        : squad
                )
            );
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
                                <Select.Option key={mentor.id} value={mentor.email}>
                                    {mentor.name}
                                </Select.Option>
                            ))}
                        </Select>
                    );
                } else if (perfil?.tipo === "mentor") {
                    return (
                        <span>
                            {mentorId ? (
                                <>
                                    {mentores.find((m) => m.id === mentorId)?.name || "Sem mentor"}
                                    {mentores.find((m) => m.id === mentorId)?.email === perfil.sub && (
                                        <span
                                            onClick={() =>
                                                allocateMentor(squad.id, '') // Removendo o mentor do Squad
                                            }
                                            style={{ cursor: 'pointer', marginLeft: '5px', color: 'red' }}
                                        >
                                            <FeatherIcon icon="trash" size={14} />
                                        </span>
                                    )}
                                </>
                            ) : (
                                <span
                                    onClick={() => allocateMentor(squad.id, perfil.sub)}
                                    style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                    Alocar-me ao Squad <FeatherIcon icon="plus" size={16} />
                                </span>
                            )}
                        </span>
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
                        <h3 className="page-title">Squads</h3>
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
    );
}
