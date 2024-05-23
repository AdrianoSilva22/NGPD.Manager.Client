'use client'
import Sidebar from '@/Sidebar/SideBar';
import { globalStateAtomId } from '@/atoms/atoms';
import Header from '@/components/Header/Header';
import { Availability } from '@/models/AvailabilityClassIes';
import { ClassIes, initialValueClassIes } from '@/models/ClassIes';
import { Institution } from '@/models/institution';
import { PropsOption } from '@/models/propsOption';
import { mensagemErro, mensagemSucesso } from '@/models/toastr';
import { ClassIesServiceGetById, ClassIesServiceUpdate } from '@/service/ClassIes';
import { apiService } from '@/service/apiService';
import axios from 'axios';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Select, { SingleValue } from "react-select";

export default function ClassUpdate() {
    const [classIes, setClassIes] = useState<ClassIes>(initialValueClassIes);
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [globalStateId] = useAtom(globalStateAtomId);
    const { getEntityById } = ClassIesServiceGetById;
    const { updateEntity } = ClassIesServiceUpdate;

    useEffect(() => {
        const fetchClassById = async (id: string) => {
            try {
                const response = await getEntityById(id);
                setClassIes(response.data);
            } catch (error) {
                console.error('Error fetching class:', error);
            }
        };

        if (globalStateId) {
            fetchClassById(globalStateId);
        }
        fetchInstitutionsAndAvailabilities();
    }, [globalStateId]);

    const fetchInstitutionsAndAvailabilities = async () => {
        try {
            const institutionsResponse = await apiService.get('http://localhost:5293/api/v1/institution');
            const availabilitiesResponse = await axios.create({ baseURL: 'http://localhost:5293' }).get('/api/v1/Institution/turmas/Disponibilidade');
            setInstitutions(institutionsResponse.data.institution);
            setAvailabilities(availabilitiesResponse.data.listAvailability);
        } catch (error) {
            console.error(error);
        }
    };

    const institutionOptions = institutions.map(institution => ({
        value: institution.id,
        label: institution.name,
    }));

    const availabilityOptions = availabilities.map(availability => ({
        value: availability.id,
        label: `${availability.dayWeek} - ${availability.startTime} - ${availability.scheduleEnd}`,
    }));

    const handleInstitutionSelect = (selectedOption: SingleValue<PropsOption>) => {
        const selectedInstitution = institutions.find(inst => inst.id === selectedOption?.value) || null;
        setClassIes({ ...classIes, institutionId: selectedInstitution?.id });
    };

    const handleAvailabilitySelect = (selectedOption: SingleValue<PropsOption>) => {
        const selectedAvailability = availabilities.find(avail => avail.id === selectedOption?.value) || null;
        setClassIes({ ...classIes, availabilityId: selectedAvailability?.id });
    };

    const handleUpdate = async () => {
        try {
            if (classIes) {
                await updateEntity(classIes);
                setClassIes(initialValueClassIes);
                mensagemSucesso('Turma Atualizada');
            }
        } catch (error) {
            console.error('Erro ao atualizar Turma:', error);
            mensagemErro('Erro ao atualizar Turma');
        }
    };

    return (
        <>
            {classIes ? (
                <div className="main-wrapper">
                    <Header />
                    <Sidebar />
                    <div className="page-wrapper">
                        <div className="content container-fluid">
                            <div className="page-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <span className="page-title">Atualize a Turma</span>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link href="/institution/class">listagem</Link>
                                            </li>
                                            <li className="breadcrumb-item active">Atualize a Turma</li>
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
                                                            <span>Class</span>
                                                        </h5>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Curso <span className="login-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={classIes.course}
                                                                onChange={(e) => setClassIes({ ...classIes, course: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Periodo <span className="login-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={classIes.period}
                                                                onChange={(e) => setClassIes({ ...classIes, period: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Turno <span className="login-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={classIes.shift}
                                                                onChange={(e) => setClassIes({ ...classIes, shift: e.target.value })}
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
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Disponibilidade <span className="login-danger">*</span>
                                                            </label>
                                                            <Select
                                                                className="w-100 local-forms select"
                                                                onChange={handleAvailabilitySelect}
                                                                options={availabilityOptions}
                                                                placeholder="Selecione a disponibilidade"
                                                            />
                                                        </div>
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
