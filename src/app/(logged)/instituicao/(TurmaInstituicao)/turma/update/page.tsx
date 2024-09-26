'use client'
import { Input } from '@/components/stringInput';

import { ClassIes, initialValueClassIes } from '@/models/ClassIes';
import { Institution } from '@/models/institution';
import { PropsOption } from '@/models/propsOption';
import { mensagemErro, mensagemSucesso } from '@/models/toastr';

import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Select, { SingleValue } from "react-select";

export default function ClassUpdate() {
    const [classIes, setClassIes] = useState<ClassIes>(initialValueClassIes);
    const [institutions, setInstitutions] = useState<Institution[]>([]);

   

    const searchParams = useSearchParams();
    const id = searchParams.get('id') || '';

    useEffect(() => {
       
        const fetchTurmaIes = async () => {
            try {
                const response = await axios.get<ClassIes>(`http://localhost:5293/api/v1/Institution/TurmaIes/${id}`);
                setClassIes(response.data);
            } catch (error) {
                console.error("Erro ao buscar as informações da TurmaIes:", error);
            }
        };

        fetchTurmaIes();
    }, [id]);

    useEffect(() => {
       
        const fetchInstitutions = async () => {
            try {
                const response = await axios.get<Institution[]>('http://localhost:5293/api/v1/Institution');
                setInstitutions(response.data);
            } catch (error) {
                console.error("Erro ao buscar as instituições:", error);
            }
        };

        fetchInstitutions();
    }, []);

    const institutionOptions = institutions.map(institution => ({
        value: institution.id,
        label: institution.name,
    }));

    const handleInstitutionSelect = (selectedOption: SingleValue<PropsOption>) => {
        const selectedInstitution = institutions.find(inst => inst.id === selectedOption?.value) || null;
        setClassIes({ ...classIes, institutionId: selectedInstitution?.id });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5293/api/v1/Institution/TurmaIes/UpdateTurmaIes`, classIes);
            console.log("TurmaIes atualizada com sucesso!");
            mensagemSucesso('Turma atualizada com sucesso!');
        } catch (error) {
            console.error("Erro ao atualizar a TurmaIes:", error);
            mensagemErro('Erro ao atualizar a turma.');
        }
    };

    return (
        <>
            {classIes ? (
                <div className="main-wrapper">
                    <div className="page-wrapper">
                        <div className="content container-fluid">
                            <div className="page-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <span className="page-title">Atualizar</span>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link href="/institution/turma">Listagem de Turmas/</Link>
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
                                                            <span>Atualizar Turma</span>
                                                        </h5>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Curso <span className="login-danger">*</span>
                                                            </label>
                                                            <Input
                                                                value={classIes.course}
                                                                onChange={(value: string) => setClassIes({ ...classIes, course: value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Periodo <span className="login-danger">*</span>
                                                            </label>
                                                            <Input
                                                                value={classIes.period}
                                                                onChange={(value: string) => setClassIes({ ...classIes, period: value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Turno <span className="login-danger">*</span>
                                                            </label>
                                                            <Input
                                                                value={classIes.shift}
                                                                onChange={(value: string) => setClassIes({ ...classIes, shift: value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Instituição <span className="login-danger">*</span>
                                                            </label>
                                                            <Select
                                                                className="w-100 local-forms select"
                                                                onChange={handleInstitutionSelect}
                                                                options={institutionOptions}
                                                                placeholder="Selecione uma Instituição"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms"></div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="student-submit">
                                                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
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
                <div>Loading...</div>
            )}
        </>
    );
}
