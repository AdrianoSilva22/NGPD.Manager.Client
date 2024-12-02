'use client'
import { useState, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';
import axios from 'axios';

const horarios = Array.from({ length: 29 }, (_, i) => {
    const hora = Math.floor(i / 2) + 8;
    const minuto = i % 2 === 0 ? '00' : '30';
    return `${hora.toString().padStart(2, '0')}:${minuto}`;
});

export default function Calendario() {
    const [agenda, setAgenda] = useState<{ [key: string]: { hora: string; titulo: string; descricao: string }[] }>({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<{ dia: string; hora: string } | null>(null);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [empresaNome, setEmpresaNome] = useState('');

    useEffect(() => {
        const fetchEmpresaNome = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const empresaId = urlParams.get('Id');
            if (empresaId) {    
                try {
                    const response = await axios.get(`http://localhost:5189/api/Empresa/${empresaId}`);
                    if (response.data && response.data.nome) {
                        setEmpresaNome(response.data.nome);
                    } else {
                        setEmpresaNome('Nome da empresa não encontrado');
                    }
                } catch (error) {
                    console.error('Erro ao buscar nome da empresa:', error);
                }
            }
        };

        fetchEmpresaNome();
    }, []);

    const handleSlotClick = (dia: string, hora: string) => {
        setSelectedSlot({ dia, hora });
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if (selectedSlot) {
            const { dia, hora } = selectedSlot;
            const novoAgendamento = { hora, titulo, descricao };
            setAgenda((prevAgenda) => {
                const agendaDia = prevAgenda[dia] || [];
                const novoHorario = agendaDia.some((item) => item.hora === hora)
                    ? agendaDia.filter((item) => item.hora !== hora)
                    : [...agendaDia, novoAgendamento];

                return {
                    ...prevAgenda,
                    [dia]: novoHorario,
                };
            });

            try {
                const urlParams = new URLSearchParams(window.location.search);
                const empresaId = urlParams.get('Id');
                const disponibilidadeId = 'your-disponibilidade-id'; // Substitua pelo valor real
                await axios.post(`http://localhost:5189/api/Empresa/${empresaId}/assign-disponibilidade/${disponibilidadeId}`, {
                    titulo,
                    descricao,
                    dia,
                    hora,
                });
            } catch (error) {
                console.error('Erro ao salvar agendamento:', error);
            }
        }
        setIsModalVisible(false);
        setTitulo('');
        setDescricao('');
        setSelectedSlot(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setTitulo('');
        setDescricao('');
        setSelectedSlot(null);
    };

    const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

    const handleUpdate = async () => {
        try {
            const selectedData = Object.entries(agenda).flatMap(([dia, slots]) =>
                slots.map((slot) => ({ ...slot, dia }))
            );
            const urlParams = new URLSearchParams(window.location.search);
            const empresaId = urlParams.get('Id');

            const body = {
                totalCount: selectedData.length,
                totalPages: 1,
                pageSize: selectedData.length,
                currentPage: 1,
                listAvailability: selectedData,
            };

            const url = `http://localhost:5293/api/v1/Empresa/AtualizarDisponibilidades?empresaId=${empresaId}`;
            const response = await axios.put(url, body);
            if (response.status === 200) {
                console.log('Update successful');
            } else {
                console.error('Update failed', response.statusText);
            }
        } catch (error) {
            console.error('Update error', error);
        }
    };

    return (
        <div className="container">
            <div className="content container-fluid">
                <div className="page-header">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="page-sub-header">
                                <h3 className="page-title">Empresa: {empresaNome}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className="page-title">
                    Agendamento de Horários
                </h3>

                <table className="calendar-table">
                    <thead>
                        <tr>
                            <th>Horários</th>
                            {diasSemana.map((dia) => (
                                <th key={dia}>{dia}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {horarios.map((hora) => (
                            <tr key={hora}>
                                <td>{hora}</td>
                                {diasSemana.map((dia) => (
                                    <td
                                        key={dia}
                                        className={`slot ${agenda[dia]?.some((item) => item.hora === hora) ? 'selected' : ''}`}
                                        onClick={() => handleSlotClick(dia, hora)}
                                    >
                                        {agenda[dia]?.some((item) => item.hora === hora) ? 'Reservado' : ''}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal
                    title="Confirma Disponibilidade?"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="Salvar"
                    cancelText="Cancelar"
                >
                    <Input
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <Input.TextArea
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        style={{ marginTop: '10px' }}
                    />
                </Modal>
                <Button className="btn btn-primary" onClick={handleUpdate} style={{ marginTop: '20px' }}>
                    Atualizar Disponibilidades
                </Button>
                <style jsx>{`
                    .container {
                        padding: 20px;
                    }
                    .calendar-table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: center;
                    }
                    .slot {
                        cursor: pointer;
                        background-color: #f9f9f9;
                    }
                    .slot.selected {
                        background-color: #4caf50;
                        color: white;
                    }
                `}</style>
            </div>
        </div>
    );
}
