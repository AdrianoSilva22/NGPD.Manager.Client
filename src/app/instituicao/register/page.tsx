'use client'
import { Instituicao, valorInicialInstituicao } from "@/models/instituicaoModel";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { InstituicaoService } from "@/service/instituicao";
import Link from "next/link";
import { useState } from "react";



export default function RegisterInstituicao() {
    const [instituicao, setInstituicao] = useState<Instituicao>(valorInicialInstituicao);
    const { registerEntity } = InstituicaoService

    const cadastrar = async () => {
        try {
            await registerEntity(instituicao)
            setInstituicao(valorInicialInstituicao);
            mensagemSucesso('Instituição cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            mensagemErro('Erro ao cadastrar Instituição');
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
                                            <Link href="/turma">Listagem de Instituições/</Link>
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
                                                        <label>Contato <span className="login-danger">*</span></label>
                                                        <input type="text" className="form-control" value={instituicao.contato} onChange={(e) => setInstituicao({ ...instituicao, contato: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4">
                                                    <div className="form-group local-forms">
                                                        <label>Nome da Instituição <span className="login-danger">*</span></label>
                                                        <input type="text" className="form-control" value={instituicao.name} onChange={(e) => setInstituicao({ ...instituicao, name: e.target.value })} />
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