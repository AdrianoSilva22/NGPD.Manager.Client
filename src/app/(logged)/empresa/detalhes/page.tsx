'use client';

import { Suspense } from "react"; // Importando Suspense do React
import { Empresa } from "@/models/empresa"; 
import { Squad } from "@/models/squad";
import { EmpresaService } from "@/service/empresa";
import "@/styles/pagination.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Table, Tooltip } from "antd";
import { Footer } from "antd/es/layout/layout";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";

const DetailsCompany = () => {
    const [listEmpresa, setListEmpresa] = useState<Empresa | null>(null);
    const [loading, setLoading] = useState(true);
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
    const [expandedSection, setExpandedSection] = useState<'empresa' | 'squad'>('empresa');

    const router = useRouter(); 

    useEffect(() => {
        const fetchClassById = async () => {
            try {
                const { searchParams } = new URL(window.location.href);
                const empresaId = searchParams.get('Id'); 
                if (empresaId) {
                    const response = await EmpresaService.getEntityById(empresaId);
                    setListEmpresa(response.data);
                }
            } catch (error) {
                console.error('Error fetching class:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClassById();
    }, [router]);

    const handleExpand = (id: string, section: 'empresa' | 'squad') => {
        if (expandedRowKeys.includes(id) && expandedSection === section) {
            setExpandedRowKeys([]);
            setExpandedSection('empresa');
        } else {
            setExpandedRowKeys([id]);
            setExpandedSection(section);
        }
    };

    const columns = [
        {
            title: 'Empresa',
            dataIndex: 'empresa',
            key: 'empresa',
            render: (empresa: string, record: Empresa) => (
                <Tooltip title="Mostrar Empresa">
                    <span
                        style={{ cursor: 'pointer', color: '#1890ff' }}
                        onClick={() => handleExpand(record.id, 'empresa')}
                    >
                        {expandedRowKeys.includes(record.id) && expandedSection === 'empresa' ? <UpOutlined /> : <DownOutlined />}
                        Detalhes da Empresa
                    </span>
                </Tooltip>
            ),
        },
        {
            title: 'Squad',
            dataIndex: 'listSquad',
            key: 'listSquad',
            render: (listSquad: Squad[], record: Empresa) => (
                <Tooltip title="Mostrar Squad">
                    <span
                        style={{ cursor: 'pointer', color: '#1890ff' }}
                        onClick={() => handleExpand(record.id, 'squad')}
                    >
                        {expandedRowKeys.includes(record.id) && expandedSection === 'squad' ? <UpOutlined /> : <DownOutlined />}
                        Mostrar Squad
                    </span>
                </Tooltip>
            ),
        }
    ];

    if (loading) {
        return <div className="text-center">Carregando...</div>;
    }

    return (
        <>
            <h6 style={{ float:'right' }} className="breadcrumb-item">
                <Link href="/empresa">Empresas/</Link>
            </h6>
            <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Detalhes da Empresa</h4>
            <Table
                columns={columns}
                pagination={false}
                dataSource={listEmpresa ? [listEmpresa] : []}
                rowKey={(record) => record.id}
                expandable={{
                    expandedRowKeys: expandedRowKeys,
                    expandedRowRender: (record: Empresa) => (
                        <div style={{ margin: '20px 0' }}>
                            {expandedSection === 'empresa' && (
                                <div>
                                    <h4>Empresa</h4>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Nome da Empresa</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={record.id}>
                                                <td>{record.name}</td>
                                                <td>{record.contact}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {expandedSection === 'squad' && (
                                <div>
                                    <h4>Squad</h4>
                                    {Array.isArray(record.listSquad) && record.listSquad.length > 0 ? (
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Nome do Estudante</th>
                                                    <th>Email</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {record.listSquad.map((squad: Squad) => (
                                                    <tr key={squad.id}>
                                                        <td>{squad.name}</td>
                                                        <td>{squad.allocatedMentorEmail}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>Sem Squad cadastrados.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ),
                    defaultExpandAllRows: false,
                    expandIcon: ({ expanded }) => (
                        <span>{expanded ? '' :  ' '}</span>
                    )
                }}
            />
            <Footer />
        </>
    );
};

// Envolvendo o componente DetailsCompany em um limite de suspense
const DetailsCompanyWithSuspense = () => (
    <Suspense fallback={<div>Carregando...</div>}>
        <DetailsCompany />
    </Suspense>
);

export default DetailsCompanyWithSuspense;
