'use client'
import { Disponibilidade } from "@/models/disponibilidadeTurma"
import { Instituicao } from "@/models/instituicaoModel"
import { PropsOption } from "@/models/propsOption"
import { mensagemErro, mensagemSucesso } from "@/models/toastr"
import { Turma, valorInicialTurma } from "@/models/turmaModel"
import { apiService } from "@/service/apiService"
import axios from "axios"
import Link from "next/link"
import { ChangeEvent, useEffect, useState } from "react"
import Select, { SingleValue } from "react-select"

export default function RegisterInstituicao() {
    const [turma, setTurma] = useState<Turma>(valorInicialTurma)
    const [instituicoes, setInstituicoes] = useState<Instituicao[]>([])
    const [disponibilidades, setDisponibilidades] = useState<Disponibilidade[]>([])

    useEffect(() => {
        const getInstituicoesAndDisponibilidade = async () => {
            const instituicoes = (await apiService.get(`http://localhost:5293/api/v1/institution`)).data
            const disponibilidade = await axios.create({
                baseURL: "http://localhost:5293"
            }).get(`/api/v1/Institution/turmas/disponibilidade`)
            setInstituicoes(instituicoes.instituicao)
            setDisponibilidades(disponibilidade.data.listDisponibilidade)
        }
        getInstituicoesAndDisponibilidade()
    }, [])

    const sendFormData = async (turma: Turma) => {
        const formData = new FormData()
    
        if (turma.CsvFile ) {
            formData.append('CsvFile', turma.CsvFile)
        }
        formData.append('Curso', turma.Curso)
        if (turma.InstitutionId) {
            formData.append('InstitutionId', turma.InstitutionId)
        }
        formData.append('Periodo', turma.Periodo)
        formData.append('Turno', turma.Turno)
        if (turma.DisponibilidadeId) {
            formData.append('DisponibilidadeId', turma.DisponibilidadeId)
        }
        
        try {
            
            await axios.post('http://localhost:5293/api/v1/Institution/CadastraTurmaIes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            mensagemSucesso('Turma cadastrada com sucesso!')
            setTurma(valorInicialTurma)
        } catch (error) {
            console.error('Erro ao cadastrar Turma:', error)
            mensagemErro('Erro ao cadastrar Turma')
        }
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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setTurma({ ...turma, CsvFile: file })
    }

    const cadastrar = async () => {
        sendFormData(turma)
    }
   
    return (
        <>

            <div className="main-wrapper">
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="page-header">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="page-title">Adicionar Instituição</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link href="/instituicao">Listagem de Instituições/</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label>Curso <span className="login-danger">*</span></label>
                                                    <input type="text" className="form-control" value={turma.Curso} onChange={(e) => setTurma({ ...turma, Curso: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label>Periodo<span className="login-danger">*</span></label>
                                                    <input type="text" className="form-control" value={turma.Periodo} onChange={(e) => setTurma({ ...turma, Periodo: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label>Turno <span className="login-danger">*</span></label>
                                                    <input type="text" className="form-control" value={turma.Turno} onChange={(e) => setTurma({ ...turma, Turno: e.target.value })} />
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
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group students-up-files">
                                                    <label>Anexe os Estudantes</label>
                                                    <div className="uplod">
                                                        <label className="file-upload image-upbtn mb-0">
                                                            Escolha o Arquivo.csv <input type="file" onChange={handleFileChange} />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="student-submit">
                                                    <button type="button" className="btn btn-primary" onClick={cadastrar}>Cadastrar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
