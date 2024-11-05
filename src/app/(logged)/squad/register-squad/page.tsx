'use client'

import { Squad, initialValueSquad } from "@/models/squad";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService/apiService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RegisterSquad() {
    const [squadData, setSquadData] = useState<Squad>(initialValueSquad);

    useEffect(() => {
        // Obter o parâmetro classIesId da URL usando window.location
        const urlParams = new URLSearchParams(window.location.search);
        const classIesId = urlParams.get('classIesId');
        if (classIesId) {
            setSquadData(prevData => ({ ...prevData, institutionClasseId: classIesId }));
        }
    }, []);

    const cadastrarSquad = async () => {
        try {
            await apiService.post('http://localhost:5293/api/v1/Squad', {
                ...squadData,
                qtd: squadData.mentorId || 0,
            });
            mensagemSucesso('Cadastro realizado com sucesso!');
        } catch (error: any) {
            console.error('Erro ao cadastrar Squad:', error);
            mensagemErro(error.response.data.detail);
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
                                                    <label>Modulo<span className="login-danger">*</span></label>
                                                    <select
                                                        className="form-control"
                                                        value={squadData.empresaId}
                                                        onChange={(e) => setSquadData({ ...squadData, empresaId: e.target.value })}
                                                    >
                                                        <option>Selecione um módulo</option>
                                                        <option value="Kick off">Kick off</option>
                                                        <option value="Grow up">Grow up</option>
                                                        <option value="Rise Up">Rise Up</option>
                                                        <option value="Final Up">Final Up</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label>Quantidade de Squad <span className="login-danger">*</span></label>
                                                    <select
                                                        className="form-control"
                                                        value={squadData.mentorId}
                                                        onChange={(e) => setSquadData({ ...squadData, mentorId: e.target.value })}
                                                    >
                                                        <option>Selecione a quantidade</option>
                                                        {[...Array(8)].map((_, i) => (
                                                            <option key={i} value={i + 1}>{i + 1}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group local-forms">
                                                <label>Nome do Squad <span className="login-danger">*</span></label>
                                                <input type="text" className="form-control" value={squadData.name} onChange={(e) => setSquadData({ ...squadData, name: e.target.value })} />
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
