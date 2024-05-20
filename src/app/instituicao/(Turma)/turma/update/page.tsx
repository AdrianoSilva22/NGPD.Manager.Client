"use client"

import Sidebar from '@/Sidebar/SideBar';
import Header from '@/components/Header/Header';
import { Disponibilidade } from '@/models/disponibilidadeTurma';
import { Instituicao } from '@/models/instituicaoModel';
import { PropsOption } from '@/models/propsOption';
import { mensagemErro, mensagemSucesso } from '@/models/toastr';
import { Turma, valorInicialTurma } from '@/models/turmaModel';
import { apiService } from '@/service/apiService';
import { TurmaServiceUpdate } from '@/service/turma';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Select, { SingleValue } from "react-select";

export default function TurmaUpdate() {
    const [turma, setTurma] = useState<Turma>(valorInicialTurma)
    const [instituicoes, setInstituicoes] = useState<Instituicao[]>([])
    const [disponibilidades, setDisponibilidades] = useState<Disponibilidade[]>([])
    const searchParams = useSearchParams();
    const { updateEntity } = TurmaServiceUpdate

    useEffect(() => {
        const Curso = searchParams.get('curso') || '';
        const Turno = searchParams.get('turno') || '';
        const Periodoo = searchParams.get('periodo') || '';
        const Id = searchParams.get('Id') || '';

        setTurma({
            Turno: Turno,
            id: Id,
            InstitutionId: '',
            Curso: Curso,
            DisponibilidadeId: '',
            Periodo: Periodoo,
            CsvFile: null
        });
        getInstituicoesAndDisponibilidade()
    }, [])

    useEffect(() => {
        console.log(turma);
    }, [turma]);

    const getInstituicoesAndDisponibilidade = async () => {
        const instituicoes = (await apiService.get(`http://localhost:5293/api/v1/institution`)).data
        const disponibilidade = await axios.create({
            baseURL: "http://localhost:5293"
        }).get(`/api/v1/Institution/turmas/disponibilidade`)
        setInstituicoes(instituicoes.instituicao)
        setDisponibilidades(disponibilidade.data.listDisponibilidade)
    }
    
const instituicoesOptions = instituicoes.map(instituicao => ({
    value: instituicao.id,
    label: instituicao.name,
}))
const disponibilidadeOptions = disponibilidades.map(disponibilidade => ({
    value: disponibilidade.id,
    label: `${disponibilidade.diaSemana} - ${disponibilidade.horario_inicio} - ${disponibilidade.horario_fim}`,
}))

const getValueSelectInstituicao = (selectedOption: SingleValue<PropsOption>) => {
    const selectedInstituicao = instituicoes.find(inst => inst.id === selectedOption?.value) || null
    setTurma({ ...turma, InstitutionId: selectedInstituicao?.id })
}
const getValueSelectDisponibilidade = (selectedOption: SingleValue<PropsOption>) => {
    const selectedDisponibilidade = disponibilidades.find(disp => disp.id === selectedOption?.value) || null
    setTurma({ ...turma, DisponibilidadeId: selectedDisponibilidade?.id })
}

const atualizar = async () => {
    try {
        if (turma) {
            await updateEntity(turma)
            setTurma(valorInicialTurma)
            mensagemSucesso("Turma atualizada com sucesso")
        }
    } catch (error) {
        console.log(error);
        mensagemErro('erro ao atualizr')
    }
}


return (
    <>
        {turma ? (

            <div className="main-wrapper">
                <Header />
                <Sidebar />
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="page-header">
                            <div className="row align-items-center">
                                <div className="col">
                                    <span className="page-title">Atualizar Turma</span>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link href="/instituicao/turma">Listagem de Turmas</Link>
                                        </li>
                                        <li className="breadcrumb-item active"> Atualizar Turma</li>
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
                                                        <span>Turma</span>
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
                                                            defaultValue={turma.Curso}
                                                            onChange={(e) => setTurma({ ...turma, Curso: e.target.value })} />

                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            Período <span className="login-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            defaultValue={turma.Periodo}
                                                            onChange={(e) => setTurma({ ...turma, Periodo: e.target.value })} />

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
                                                            defaultValue={turma.id}
                                                            onChange={(e) => setTurma({ ...turma, id: e.target.value })} />

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
                                                            defaultValue={turma.Turno}
                                                            onChange={(e) => setTurma({ ...turma, Turno: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            Instituição <span className="login-danger">*</span>
                                                        </label>

                                                        <Select
                                                            className="w-100 local-forms  select"
                                                            onChange={getValueSelectInstituicao}
                                                            options={instituicoesOptions}
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
                                                            className="w-100 local-forms  select"
                                                            onChange={getValueSelectDisponibilidade}
                                                            options={disponibilidadeOptions}
                                                            placeholder="Selecione a Disponibilidade"
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
