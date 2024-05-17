"use client"

import { Instituicao, valorInicialInstituicao } from '@/models/instituicaoModel';
import { mensagemErro, mensagemSucesso } from '@/models/toastr';
import { InstituicaoService } from '@/service/instituicao';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import SideBar from '../../../Sidebar/SideBar';
import Header from '../../../components/Header/Header';

export default function InstituicaoUpdate() {
    const [instituicao, setInstituicao] = useState<Instituicao>(valorInicialInstituicao)
    const searchParams = useSearchParams();
    const instituicaoNome = searchParams.get('instituicaoNome')
    const instituicaoEmail = searchParams.get('instituicaoEmail')

    const { updateEntity } = InstituicaoService

    const atualizar = async () => {
        try {
            if (instituicao) {
                await updateEntity(instituicao.contato, instituicao)
                setInstituicao(valorInicialInstituicao)
                mensagemSucesso("Instituição atualizada com sucesso")
            }
        } catch (error) {
            console.log(error);
            mensagemErro('erro ao atualizr')
        }
    }

    return (
        <>
            {instituicao && instituicaoEmail && instituicaoNome ? (

                <div className="main-wrapper">
                    <Header />
                    <SideBar />
                    <div className="page-wrapper">
                        <div className="content container-fluid">
                            <div className="page-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <span className="page-title">Atualizar Instituição</span>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link href="/turma">Listagem de Instituições</Link>
                                            </li>
                                            <li className="breadcrumb-item active"> Atualizar Instituição</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <form>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h5 className="form-title">
                                                            <span>Department Details</span>
                                                        </h5>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Nome da Instituição <span className="login-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={instituicaoNome}
                                                                onChange={(e) => setInstituicao({ ...instituicao, nome: e.target.value })} />

                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Email da Instituição <span className="login-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={instituicaoEmail}
                                                                onChange={(e) => setInstituicao({ ...instituicao, contato: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="student-submit">
                                                            <button type="button" className="btn btn-primary" onClick={atualizar}>Atualizar</button>
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
            ) : (
                <div>Carregando...</div>)}
        </>
    )
}
