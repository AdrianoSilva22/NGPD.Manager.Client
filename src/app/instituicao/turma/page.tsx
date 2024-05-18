'use client'
import { Estudante } from "@/models/estudanteModel";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { Turma, valorInicialTurma } from "@/models/turmaModel";
import { TurmaService } from "@/service/turma";
import Link from "next/link";
import { useState } from "react";



export default function RegisterInstituicao() {
    const [turma, setTurma] = useState<Turma>(valorInicialTurma);
    const [estudante, setEstudante] = useState<Estudante[]>();
    const { registerEntity } = TurmaService

    const cadastrar = async () => {
        try {
            await registerEntity(turma)
            setTurma(valorInicialTurma);
            mensagemSucesso('Turma cadastrada com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar Turma:', error);
            mensagemErro('Erro ao cadastrar Turma');
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
                                    <h3 className="page-title">Adicionar Instituição</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link href="/instituicao">Listagem de Instituições/</Link>
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
                                                        <label>Curso <span className="login-danger">*</span></label>
                                                        <input type="text" className="form-control" value={turma.curso} onChange={(e) => setTurma({ ...turma, curso: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4">
                                                    <div className="form-group local-forms">
                                                        <label>periodo da Turma <span className="login-danger">*</span></label>
                                                        <input type="text" className="form-control" value={turma.periodo} onChange={(e) => setTurma({ ...turma, periodo: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4">
                                                    <div className="form-group local-forms">
                                                        <label>id_disponibilidade <span className="login-danger">*</span></label>
                                                        <input type="text" className="form-control" value={turma.id_disponibilidade} onChange={(e) => setTurma({ ...turma, id_disponibilidade: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4">
                                                    <div className="form-group local-forms">
                                                        <label>id_instituicao <span className="login-danger">*</span></label>
                                                        <input type="text" className="form-control" value={turma.id_instituicao} onChange={(e) => setTurma({ ...turma, id_instituicao: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4">
                                                    <div className="form-group local-forms">
                                                        <label>id_instituicao <span className="login-danger">*</span></label>
                                                        {/* <input type="text" className="form-control" value={estudante} onChange={(e) => setTurma({ ...turma, listStudants: e.target.value })} /> */}
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
