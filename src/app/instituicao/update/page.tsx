"use client"

import { globalStateAtomId } from '@/atoms/atoms'
import { EmailInput } from '@/components/emailInput'
import { Input } from '@/components/stringInput'
import { Institution, initialvalueInstitution } from '@/models/institution'
import { mensagemErro, mensagemSucesso } from '@/models/toastr'
import { InstituitionServiceGetById, InstituitionServices } from '@/service/institution'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import SideBar from '../../../Sidebar/SideBar'
import Header from '../../../components/Header/Header'

export default function InstitutionUpdate() {
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
            <Header />
            <SideBar />
            {institution ? (

                <div className="main-wrapper">
                    <div className="page-wrapper">
                        <div className="content container-fluid">
                            <div className="page-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <span className="page-title">Atualizar </span>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link href="/turma">Listagem de Instituições</Link>
                                            </li>
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
                                                            <span>Atualizar Instituição</span>
                                                        </h5>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Nome da Instituição <span className="login-danger">*</span>
                                                            </label>
                                                            <Input
                                                                value={institution.name}
                                                                onChange={(value: string) => setInstitution({ ...institution, name: value })} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Email da Instituição <span className="login-danger">*</span>
                                                            </label>
                                                            <EmailInput
                                                                value={institution.contact}
                                                                onChange={(value: string) => setInstitution({ ...institution, contact: value })}
                                                            />
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