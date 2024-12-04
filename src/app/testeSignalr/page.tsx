"use client"
import React, { useEffect, useState } from 'react';
import { Table, Button, Spin, message } from 'antd';
import * as signalR from '@microsoft/signalr';

const PAGE_SIZE = 1; // Número de itens por página

// Tipos das respostas e dos modelos
interface Squad {
    id: string;
    name: string;
    turma: {
        id: string;
        name: string | null;
    };
    Empresa: { name: string }[];
    mentor: { id: string | null; name: string | null } | null;
}

interface SquadResponse {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    pageCount: number;
    list: Squad[];
}

const SquadsPage: React.FC = () => {
    const [squads, setSquads] = useState<Squad[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageNumber, setPage] = useState<number>(0); // Inicia na página 0
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

    useEffect(() => {
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
                        setLoading(false);
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
                    setLoading(false);
                });
            })
            .catch(err => {
                console.error('Erro ao conectar ao SignalR:', err);
                setLoading(false);
            });

        return () => {
            connection.stop().then(() => console.log('Conexão SignalR encerrada.'));
        };
    }, [pageNumber]);

    // Função para atribuir um mentor
    const assignMentor = (squadId: string, mentorId: string) => {
        if (connection) {
            connection.invoke('AssignMentor', squadId, mentorId)
                .then(() => {
                    message.success('Mentor atribuído com sucesso!');
                    setSquads(prevSquads =>
                        prevSquads.map(squad =>
                            squad.id === squadId
                                ? { ...squad, mentor: { id: mentorId, name: 'Mentor Atribuído' } }
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

    // Função para remover um mentor
    const unassignMentor = (squadId: string, mentorId: string) => {
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

    // Configuração de paginação
    const paginationConfig = {
        current: pageNumber + 1, // Ant Design começa na página 1, mas a página lógica começa na 0
        pageSize: PAGE_SIZE,
        total: totalCount,
        onChange: (page: number) => {
            setPage(page - 1); // Ajusta a página para que a primeira página seja 0
        },
    };

    // Colunas da tabela
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nome do Squad',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Turma',
            dataIndex: 'turma',
            key: 'turma',
            render: (turma: { name: string | null }) => turma.name ?? 'Não informado',
        },
        {
            title: 'Empresa',
            dataIndex: 'empresa',
            key: 'empresa',
            // render: (empresa: { name: string }[]) => empresa.map(e => e.name).join(', ') ?? 'Não informado',
        },
        {
            title: 'Mentor',
            dataIndex: 'mentor',
            key: 'mentor',
            render: (mentor: { id: string | null; name: string | null }) => (
                mentor ? mentor.name : 'Não atribuído'
            ),
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_: any, record: Squad) => (
                <div>
                    {record.mentor ? (
                        <Button onClick={() => unassignMentor(record.id, '985ea0c2-c4e6-42b5-a923-a188dc15d99e')} type="primary">
                            Remover Mentor
                        </Button>
                    ) : (
                        <Button onClick={() => assignMentor(record.id, '985ea0c2-c4e6-42b5-a923-a188dc15d99e')} type="primary">
                            Atribuir Mentor
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    if (loading) return <Spin size="large" />;

    return (
        <div>
            <h1>Squads</h1>
            <Table
                dataSource={squads}
                columns={columns}
                rowKey="id"
                pagination={paginationConfig}
            />
        </div>
    );
};

export default SquadsPage;
