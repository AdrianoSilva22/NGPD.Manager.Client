"use client"

import { Instituicao, valorInicialInstituicao } from '@/models/instituicaoModel';
import { mensagemErro, mensagemSucesso } from '@/models/toastr';
import { InstituicaoService } from '@/service/instituicao';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SideBar from '../../../Sidebar/SideBar';
import Header from '../../../components/Header/Header';

export default function InstituicaoUpdate() {
    const [instituicao, setInstituicao] = useState<Instituicao>(valorInicialInstituicao)
    // const searchParams = useSearchParams();
    const { getEntityById } = InstituicaoService

    useEffect(() => {
        const getInstituicaoById = async (id: string) => {
            try {
                const resultGetInstituicaoById: any = await getEntityById(instituicao.id)
                setInstituicao(resultGetInstituicaoById)
            } catch (error) {

            }
        }


        // const instituicaoId = searchParams.get('instituicaoId') || '';
        // const instituicaoNome = searchParams.get('instituicaoName') || '';
        // const instituicaoContato = searchParams.get('instituicaoContato') || '';

        // setInstituicao({
        //     id: instituicaoId,
        //     name: instituicaoNome,
        //     contato: instituicaoContato,
        // });
    }, []);

    const { updateEntity } = InstituicaoService

    const atualizar = async () => {
        try {
            if (instituicao) {
                await updateEntity(instituicao)
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
            {instituicao ? (

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
                                                                defaultValue={instituicao.name}
                                                                onChange={(e) => setInstituicao({ ...instituicao, name: e.target.value })} />

                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Id <span className="login-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={instituicao.id}
                                                                onChange={(e) => setInstituicao({ ...instituicao, id: e.target.value })} />

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
                                                                defaultValue={instituicao.contato}
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