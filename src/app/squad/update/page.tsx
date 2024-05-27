"use client";

import { globalStateAtomId } from '@/atoms/atoms';
import { Mentor } from '@/models/mentor';
import { PropsOption } from '@/models/propsOption';
import { Squad, initialValueSquad } from '@/models/squad';
import { mensagemErro, mensagemSucesso } from '@/models/toastr';
import { apiService } from '@/service/apiService';
import { SquadServiceUpdateMentor, SquadServices } from '@/service/squad';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Select, { SingleValue } from "react-select";
import SideBar from '../../../Sidebar/SideBar';
import Header from '../../../components/Header/Header';

export default function SquadUpdate() {
    const [squad, setSquad] = useState<Squad>(initialValueSquad);
    const [mentores, setMentores] = useState<Mentor[]>([]);
    const [globalStateId] = useAtom(globalStateAtomId);
    const { getEntityById } = SquadServices;
    const { updateAlocationEntity } = SquadServiceUpdateMentor;

    useEffect(() => {
        setSquad((prevSquad) => ({ ...prevSquad, squadId: globalStateId }));
        fetchMentores();
    }, []);

    const fetchMentores = async () => {
        try {
            const responseMentores = (await apiService.get(`http://localhost:5293/api/v1/Mentor`)).data;
            setMentores(responseMentores.mentor);
        } catch (error) {
            console.error('Erro ao buscar mentores:', error);
        }
    };

    const mentoresOptions = mentores.map(mentor => ({
        value: mentor.id,
        label: mentor.name,
    }));

    const getValueSelectMentor = (selectedOption: SingleValue<PropsOption>) => {
        const selectedMentor = mentores.find(mentor => mentor.id === selectedOption?.value) || null;
        if (selectedMentor) {
            setSquad((prevSquad) => ({ ...prevSquad, mentorId: selectedMentor.id }));
        }
    };

    const atualizar = async () => {
        try {
            if (squad) {
                await updateAlocationEntity(squad.squadId, squad.mentorId);
                setSquad(initialValueSquad);
                mensagemSucesso("Instituição atualizada com sucesso");
            }
        } catch (error) {
            console.error('Erro ao atualizar instituição:', error);
            mensagemErro('Erro ao atualizar');
        }
    };

    return (
        <>
            {squad ? (
                <div className="main-wrapper">
                    <Header />
                    <SideBar />
                    <div className="page-wrapper">
                        <div className="content container-fluid">
                            <div className="page-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <span className="page-title">Alocação</span>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link href="/squad">Listagem de Squads</Link>
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
                                                            <span>Alocação de Mentor</span>
                                                        </h5>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Mentor <span className="login-danger">*</span>
                                                            </label>

                                                            <Select
                                                                className="w-100 local-forms select"
                                                                onChange={getValueSelectMentor}
                                                                options={mentoresOptions}
                                                                placeholder="Selecione um mentor"
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
                <div>Carregando...</div>
            )}
        </>
    );
}
