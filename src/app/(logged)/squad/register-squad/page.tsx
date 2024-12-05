'use client'

import { useEffect, useState } from "react";
import Select from "react-select";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService/apiService";
import Link from "next/link";

export default function RegisterSquad() {
    const [squadData, setSquadData] = useState({ name: '', turmaID: '',  });
    const [turmas, setTurmas] = useState([]);
    const [selectedTurma, setSelectedTurma] = useState(null);

    useEffect(() => {
        const fetchTurmas = async () => {
            try {
                const response = await apiService.get('http://localhost:5189/api/Turma?PageSize=50&PageNumber=0&Sort=asc');
                console.log("Response da API:", response.data); // Verificar a estrutura dos dados

                // Acessar o array `list` e mapear as turmas para o formato esperado
                const turmasData = response.data.list.map((turma: any) => ({
                    value: turma.id,
                    label: turma.name, // Certifique-se de usar `name` conforme a estrutura da API
                }));

                setTurmas(turmasData);
            } catch (error) {
                console.error("Erro ao buscar turmas:", error);
                mensagemErro("Erro ao buscar turmas. Verifique sua conexão.");
            }
        };

        fetchTurmas();
    }, []);

    const handleTurmaChange = (selectedOption: any) => {
        setSelectedTurma(selectedOption);
        setSquadData({ ...squadData, turmaID: selectedOption?.value || '' });
    };

    const cadastrarSquad = async () => {
        try {
            await apiService.post('http://localhost:5189/api/Squad', squadData);
            mensagemSucesso('Cadastro realizado com sucesso!');
        } catch (error: any) {
            console.error('Erro ao cadastrar Squad:', error);
            mensagemErro(error.response?.data?.detail || 'Erro desconhecido');
        }
    };

    return (
        <>
            <div className="main-wrapper">
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="page-header">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="page-title">Adicionar Squad</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link href="/squad">Listagem de Squad/</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label>Nome do Squad <span className="login-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={squadData.name}
                                                        onChange={(e) => setSquadData({ ...squadData, name: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label>Turma <span className="login-danger">*</span></label>
                                                    <Select
                                                        className="w-100 local-forms select"
                                                        options={turmas}
                                                        onChange={handleTurmaChange}
                                                        placeholder="Selecione a Turma"
                                                        value={selectedTurma}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    {/* <label>Módulo <span className="login-danger">*</span></label> */}
                                                    {/* <select
                                                        className="form-control"
                                                        value={squadData.module}
                                                        onChange={(e) => setSquadData({ ...squadData, module: e.target.value })}
                                                    >
                                                        <option value="">Selecione um módulo</option>
                                                        <option value="Kick off">Kick off</option>
                                                        <option value="Grow up">Grow up</option>
                                                        <option value="Rise Up">Rise Up</option>
                                                    </select> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="student-submit">
                                                <button type="button" className="btn btn-primary" onClick={cadastrarSquad}>Cadastrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
