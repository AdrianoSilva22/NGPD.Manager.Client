'use client'

import { Squad, initialValueSquad } from "@/models/squad";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterSquad() {
    const [squadData, setSquadData] = useState<Squad>(initialValueSquad);
    const searchParams = useSearchParams();

    useEffect(() => {
        const classIesId = searchParams.get('classIesId');
        if (classIesId) {
            setSquadData(prevData => ({ ...prevData, classIesId }));
        }
    }, [searchParams]);

    const cadastrarSquadCompleto = async () => {
        try {
            await axios.post('http://localhost:5293/api/v1/Squad/squadCompleto', {
                ...squadData,
            });
            mensagemSucesso('Cadastro realizado com sucesso!');
        } catch (error) {
            mensagemErro('Erro ao cadastrar Squad');
        }
    };

    return (
        <div className="main-wrapper">
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Adicionar Turma Completa</h3>
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
                                                <label >Turma Ies <span className="login-danger">*</span></label>
                                                <input readOnly type="text" className="form-control" value={squadData.classIesId} onChange={(e) => setSquadData({ ...squadData, classIesId: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                        <div className="form-group local-forms">
        <label>ClassSquad <span className="login-danger">*</span></label>
    <select 
        className="form-control" 
        value={squadData.classSquad} 
        onChange={(e) => setSquadData({ ...squadData, classSquad: e.target.value })}
    >
        
        <option value="Kick off">Kick off</option>
        <option value="Grow up">Grow up</option>
        <option value="Rise Up">Rise Up</option>
        <option value="Final Up">Final Up</option>
    </select>
</div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group local-forms">
                                                {/* Outros campos podem ser adicionados aqui */}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="student-submit">
                                                <button type="button" className="btn btn-primary" onClick={cadastrarSquadCompleto}>Cadastrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
