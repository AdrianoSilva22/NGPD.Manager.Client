'use client'
import { Instituicao, valorInicialInstituicao } from "@/models/instituicaoModel";
import { InstituicaoService } from "@/service/instituicao";
import Link from "next/link";
import { useState } from "react";



const AddInstituicao = () => {
    const [instituicao, setInstituicao] = useState<Instituicao>(valorInicialInstituicao);

    const cadastrar = async () => {
        try {
            await InstituicaoService.registerEntity(instituicao);
            setInstituicao(valorInicialInstituicao);
            // mensagemSucesso('Aluno Cadastrado Com Sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            // mensagemErro('');
        }
    };

    return (
        <>
            <div className="main-wrapper">
                {/* Conteúdo do formulário */}
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="page-header">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="page-title">Adicionar Instituicao</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link href="/Instituicao">Instituicao</Link>
                                        </li>
                                        <li className="breadcrumb-item active">Adicionar Instituicao</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form onSubmit={(e) => { e.preventDefault(); cadastrar(); }}>
                                            <div className="row">
                                                <div className="col-12 col-sm-4">
                                                    <div className="form-group local-forms">
                                                        <label>Email <span className="login-danger">*</span></label>
                                                        <input type="text" className="form-control" value={instituicao.contato} onChange={(e) => setInstituicao({ ...instituicao, contato: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4">
                                                    <div className="form-group local-forms">
                                                        <label>Nome do Instituicao <span className="login-danger">*</span></label>
                                                        <input type="text" className="form-control" value={instituicao.nome} onChange={(e) => setInstituicao({ ...instituicao, nome: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="student-submit">
                                                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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

export default AddInstituicao;
