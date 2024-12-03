"use client"
import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { Table, Spin } from 'antd';

// Tipos das respostas e dos modelos
interface Mentor {
    id: string;
    name: string | null;
    email: string | null;
    isActive: boolean;
}
interface Empresa {
    id: string;
    name: string | null;
    email: string | null;
};


interface Squad {
    id: string;
    name: string;
    turma: {
        id: string;
        name: string | null;
    };
    Empresa: Empresa[]
    mentor: Mentor | null;
}   

interface SquadResponse {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    list: Squad[];
}

const SquadsPage: React.FC = () => {
    const [squads, setSquads] = useState<Squad[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null); // Armazenando a conexão

    // Função para conectar ao SignalR e gerenciar os squads
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
                connection.invoke('GetSquads')
                    .catch(err => {
                        console.error('Erro ao invocar GetSquads:', err);
                        setLoading(false);
                    });

                // Configura o recebimento de squads via SignalR
                connection.on('ReceiveAllSquads', (data: SquadResponse) => {
                    if (data && data.list) {
                        setSquads(data.list);
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

        // return () => {
        //     connection.stop().then(() => console.log('Conexão SignalR encerrada.'));
        // };
    }, []);

    // Função para atribuir mentor
    const assignMentor = (squadId: string, mentorId: string) => {
        if (connection?.state === signalR.HubConnectionState.Connected) {
            connection.invoke('AssignMentor', squadId, mentorId)
                .catch(err => console.error('Erro ao atribuir mentor:', err));
        } else {
            console.error('A conexão não está estabelecida.');
        }
    };

    // Função para desatribuir mentor
    const unassignMentor = (squadId: string, mentorId: string) => {
        if (connection?.state === signalR.HubConnectionState.Connected) {
            connection.invoke('UnassignMentor', squadId, mentorId)
                .catch(err => console.error('Erro ao desatribuir mentor:', err));
        } else {
            console.error('A conexão não está estabelecida.');
        }
    };

    // Definindo as colunas da tabela
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
            // render: (empresa: { name: string | null }) => empresa.name ?? 'Não informado',
        },
        {
            title: 'Mentor',
            dataIndex: 'mentor',
            key: 'mentor',
            render: (mentor: { name: string | null }) => mentor ? mentor.name : 'Não atribuído',
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_: any, record: Squad) => (
                <div>
                    {/* Botão para atribuir mentor */}
                    {!record.mentor && (
                        <button onClick={() => assignMentor(record.id, "985ea0c2-c4e6-42b5-a923-a188dc15d99e")}>Atribuir Mentor</button>
                    )}

                    {/* Botão para remover mentor */}
                    {record.mentor && (
                        <button onClick={() => unassignMentor(record.id, "985ea0c2-c4e6-42b5-a923-a188dc15d99e")}>Remover Mentor</button>
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
                loading={loading}
                pagination={false}
            />
        </div>
    );
};

export default SquadsPage;
