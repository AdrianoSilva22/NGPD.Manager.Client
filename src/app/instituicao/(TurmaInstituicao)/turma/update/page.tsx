'use client'
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/SideBar';
import { Input } from '@/components/stringInput';
import { Availability } from '@/models/AvailabilityClassIes';
import { ClassIes, initialValueClassIes } from '@/models/ClassIes';
import { Institution } from '@/models/institution';
import { PropsOption } from '@/models/propsOption';
import { mensagemErro, mensagemSucesso } from '@/models/toastr';
import { ClassIesServiceUpdate } from '@/service/ClassIes';
import { apiService } from '@/service/apiService/apiService';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Select, { SingleValue } from "react-select";

export default function ClassUpdate() {
    const [classIes, setClassIes] = useState<ClassIes>(initialValueClassIes);
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const { updateEntity, getEntityById } = ClassIesServiceUpdate;

    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchClassById = async () => {
            try {
                const classId = searchParams.get('Id') as string;
                const resultfetchClassById = await getEntityById(classId);
                setClassIes(resultfetchClassById.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchClassById();
        fetchInstitutionsAndAvailabilities();
    }, [searchParams]);

    const fetchInstitutionsAndAvailabilities = async () => {
        try {
            const institutions = (await apiService.get(`http://localhost:5293/api/v1/institution`)).data
            const availability = await (await apiService.get((`http://localhost:5293/api/v1/Institution/turmas/disponibilidade`))).data
            setInstitutions(institutions.institution)
            setAvailabilities(availability.listAvailability)
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
            <Header />
            <Sidebar />
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
                                                                onChange={(value: string) => setClassIes({ ...classIes, course: value })} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Periodo <span className="login-danger">*</span>
                                                            </label>
                                                            <Input
                                                                value={classIes.period}
                                                                onChange={(value: string) => setClassIes({ ...classIes, period: value })} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Turno <span className="login-danger">*</span>
                                                            </label>
                                                            <Input
                                                                value={classIes.shift}
                                                                onChange={(value: string) => setClassIes({ ...classIes, shift: value })} />
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
