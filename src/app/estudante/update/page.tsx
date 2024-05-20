"use client"

import { Estudante, valorInicialEstudante } from '@/models/estudanteModel';
import { mensagemErro, mensagemSucesso } from '@/models/toastr';
import { EstudanteService } from '@/service/estudante';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SideBar from '../../../Sidebar/SideBar';
import Header from '../../../components/Header/Header';

export default function EstudanteUpdate() {
    const [estudante, setEstudante] = useState<Estudante>(valorInicialEstudante)
    const searchParams = useSearchParams();
    useEffect(() => {
        const estudanteId = searchParams.get('estudanteId') || '';
        const turmaId = searchParams.get('turmaId') || '';
        const estudanteEmail = searchParams.get('estudanteEmail') || '';
        const estudanteName = searchParams.get('estudanteName') || '';

        setEstudante({
            id: estudanteId,
            name: estudanteName,
            email: estudanteEmail,
            turmaId: turmaId
        });
    }, []);

    const { updateEntity } = EstudanteService

    const atualizar = async () => {
        try {
            if (estudante) {
                await updateEntity(estudante)
                setEstudante(valorInicialEstudante)
                mensagemSucesso("Estudante atualizado com sucesso")
            }
        } catch (error) {
            console.log(error);
            mensagemErro('erro ao atualizr')
        }
    }


    return (
        <>
            {estudante ? (

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
                                                                Nome<span className="login-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={estudante.name}
                                                                onChange={(e) => setEstudante({ ...estudante, name: e.target.value })} />

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
                                                                defaultValue={estudante.id}
                                                                onChange={(e) => setEstudante({ ...estudante, id: e.target.value })} />

                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                TurmaId <span className="login-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={estudante.turmaId}
                                                                onChange={(e) => setEstudante({ ...estudante, turmaId: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Emaiç <span className="login-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={estudante.email}
                                                                onChange={(e) => setEstudante({ ...estudante, email: e.target.value })} />
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
