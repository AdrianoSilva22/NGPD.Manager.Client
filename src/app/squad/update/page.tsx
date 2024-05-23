"use client"

import { globalStateAtomId } from '@/atoms/atoms';
import { Institution, initialvalueInstitution } from '@/models/institution';
import { mensagemErro, mensagemSucesso } from '@/models/toastr';
import { InstituitionServiceGetById, InstituitionServices } from '@/service/institution';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SideBar from '../../../Sidebar/SideBar';
import Header from '../../../components/Header/Header';

export default function InstituicaoUpdate() {
    const [institution, setInstitution] = useState<Institution>(initialvalueInstitution)
    const [globalStateId,] = useAtom(globalStateAtomId)
    const { getEntityById } = InstituitionServiceGetById
    const { updateEntity } = InstituitionServices
  
    useEffect(() => {
        const getInstitutionById = async (id: string) => {
            try {
                const resultGetInstitutionById = await getEntityById(id)
                setInstitution(resultGetInstitutionById.data)
            } catch (error) {
                console.error(error)
            }
        }
        if (globalStateId != null) {
            getInstitutionById(globalStateId)
        }
    }, []);


    const atualizar = async () => {
        try {
            if (institution) {
                await updateEntity(institution)
                setInstitution(initialvalueInstitution)
                mensagemSucesso("Instituição atualizada com sucesso")
            }
        } catch (error) {
            console.log(error);
            mensagemErro('erro ao atualizr')
        }
    }

    return (
        <>
            {institution ? (

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
                                                                defaultValue={institution.name}
                                                                onChange={(e) => setInstitution({ ...institution, name: e.target.value })} />

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
                                                                defaultValue={institution.contact}
                                                                onChange={(e) => setInstitution({ ...institution, contact: e.target.value })} />
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