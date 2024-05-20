'use client'
import { Estudante, valorInicialEstudante } from "@/models/estudanteModel";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { EstudanteService } from "@/service/estudante";
import Link from "next/link";
import { useState } from "react";



export default function RegisterInstituicao() {
    const [estudante, setEstudante] = useState<Estudante>(valorInicialEstudante);
    const { registerEntity } = EstudanteService

    const cadastrar = async () => {
        try {
            await registerEntity(estudante)
            setEstudante(valorInicialEstudante);
            mensagemSucesso('Estudante cadastrado com sucesso!');
        } catch (error) {
            mensagemErro('Erro ao cadastrar Estudante');
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
                                    <h3 className="page-title">Adicionar Estudante</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link href="/estudante">Listagem de Estudantes/</Link>
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
                                                        <label>Nome<span className="login-danger">*</span></label>
                                                        <input type="text" className="form-control" value={estudante.name} onChange={(e) => setEstudante({ ...estudante, name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4">
                                                    <div className="form-group local-forms">
                                                        <label>Email<span className="login-danger">*</span></label>
                                                        <input type="text" className="form-control" value={estudante.email} onChange={(e) => setEstudante({ ...estudante, email: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4">
                                                    <div className="form-group local-forms">
                                                        <label>Id Turma<span className="login-danger">*</span></label>
                                                        <input type="text" className="form-control" value={estudante.turmaId} onChange={(e) => setEstudante({ ...estudante, turmaId: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="student-submit">
                                                        <button type="button" className="btn btn-primary" onClick={cadastrar}>Cadastrar</button>
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
        </>
    )
}
