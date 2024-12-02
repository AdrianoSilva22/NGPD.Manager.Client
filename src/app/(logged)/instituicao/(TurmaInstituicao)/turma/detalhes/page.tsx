'use client';
import { ClassIes } from "@/models/ClassIes";
import { Institution } from "@/models/institution";
import { Student } from "@/models/student";
import { ClassIesServiceGetById } from "@/service/ClassIes";
import "@/styles/pagination.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Table, Tooltip } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useEffect, useState } from "react";

export default function ClassesPagination() {
    const [listClassIes, setListClassIes] = useState<ClassIes | null>(null);
    const [loading, setLoading] = useState(true);
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
    const [expandedSection, setExpandedSection] = useState<'institution' | 'students'>('institution');
    const { getEntityById } = ClassIesServiceGetById;

    useEffect(() => {
        const fetchClassById = async () => {
            try {
                const classIesId = new URL(window.location.href).searchParams.get('Id') as string;
                const response = await getEntityById(classIesId);
                setListClassIes(response.data);
            } catch (error) {
                console.error('Error fetching class:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClassById();
    }, []);

    const handleExpand = (id: string, section: 'institution' | 'students') => {
        if (expandedRowKeys.includes(id) && expandedSection === section) {
            setExpandedRowKeys([]);
            setExpandedSection('institution');
        } else {
            setExpandedRowKeys([id]);
            setExpandedSection(section);
        }
    };

    const columns = [
        {
            title: 'Curso',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Turno',
            dataIndex: 'shift',
            key: 'shift',
        },
        {
            title: 'Ano de Ingresso',
            dataIndex: 'period',
            key: 'period',
        },
        {
            title: 'Instituição',
            dataIndex: 'institution',
            key: 'institution',
            render: (institution: Institution | null, record: ClassIes) => (
                <Tooltip title="Mostrar Instituição">
                    <span
                        style={{ cursor: 'pointer', color: '#1890ff' }}
                        onClick={() => handleExpand(record.id, 'institution')}
                    >
                        {expandedRowKeys.includes(record.id) && expandedSection === 'institution' ? <UpOutlined /> : <DownOutlined />}
                        Detalhes da Instituição
                    </span>
                </Tooltip>
            ),
        },
        {
            title: 'Estudantes',
            dataIndex: 'listStudant',
            key: 'listStudant',
            render: (listStudant: Student[], record: ClassIes) => (
                <Tooltip title="Mostrar Estudantes">
                    <span
                        style={{ cursor: 'pointer', color: '#1890ff' }}
                        onClick={() => handleExpand(record.id, 'students')}
                    >
                        {expandedRowKeys.includes(record.id) && expandedSection === 'students' ? <UpOutlined /> : <DownOutlined />}
                        Mostrar Estudantes
                    </span>
                </Tooltip>
            ),
        }
    ];

    return (
        <>
            <div className="main-wrapper">
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="card-body">
                            {loading ? (
                                <div className="text-center">Carregando...</div>
                            ) : (
                                <>
                                    <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Detalhes da Turma</h4>
                                    <Table
                                        columns={columns}
                                        pagination={false}
                                        dataSource={listClassIes ? [listClassIes] : []}
                                        rowKey={(record) => record.id}
                                        expandable={{
                                            expandedRowKeys: expandedRowKeys,
                                            expandedRowRender: (record) => (
                                                <div style={{ margin: '20px 0' }}>
                                                    {expandedSection === 'institution' && record.institution && (
                                                        <div>
                                                            <h4>Instituição</h4>
                                                            <table className="table table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Nome da Instituição</th>
                                                                        <th>Email</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr key={record.institution.id}>
                                                                        <td>{record.institution.name}</td>
                                                                        <td>{record.institution.email}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )}
                                                    {expandedSection === 'students' && (
                                                        <div>
                                                            <h4>Estudantes</h4>
                                                            {Array.isArray(record.listStudant) && record.listStudant.length > 0 ? (
                                                                <table className="table table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Nome do Estudante</th>
                                                                            <th>Email</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {record.listStudant.map((student: Student) => (
                                                                            <tr key={student.id}>
                                                                                <td>{student.name}</td>
                                                                                <td>{student.contact}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            ) : (
                                                                <p>Sem estudantes cadastrados.</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ),
                                            defaultExpandAllRows: false,
                                            expandIcon: ({ expanded }) => (
                                                <span>
                                                    {expanded ? '' :  ' '}
                                                </span>
                                            )
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
