'use client'
import { Input } from "@/components/stringInput"
import { Availability } from "@/models/AvailabilityClassIes"
import { ClassIes, initialValueClassIes } from "@/models/ClassIes"
import { Institution } from "@/models/institution"
import { PropsOption } from "@/models/propsOption"
import { mensagemErro, mensagemSucesso } from "@/models/toastr"
import { apiService } from "@/service/apiService"
import axios from "axios"
import Link from "next/link"
import { ChangeEvent, useEffect, useState } from "react"
import Select, { SingleValue } from "react-select"

export default function RegisterInstitution() {
    const [classIes, setClassIes] = useState<ClassIes>(initialValueClassIes)
    const [institutions, setInstitutions] = useState<Institution[]>([])
    const [availabilities, setAvailabilities] = useState<Availability[]>([])

    useEffect(() => {
        const getInstitutionsAndAvailabilities = async () => {
            const institutions = (await apiService.get(`http://localhost:5293/api/v1/institution`)).data

            const availability = await axios.create({
                baseURL: "http://localhost:5293"
            }).get(`/api/v1/Institution/turmas/disponibilidade`)
            setInstitutions(institutions.institution)
            setAvailabilities(availability.data.listAvailability)
        }
        getInstitutionsAndAvailabilities()
    }, [])

    const sendFormData = async (classIes: ClassIes) => {
        const formData = new FormData()

        if (classIes.csvFile) {
            formData.append('csvFile', classIes.csvFile)
        }
        formData.append('course', classIes.course)
        if (classIes.institutionId) {
            formData.append('InstitutionId', classIes.institutionId)
        }
        formData.append('period', classIes.period)
        formData.append('shift', classIes.shift)
        if (classIes.availabilityId) {
            formData.append('availabilityId', classIes.availabilityId)
        }

        try {

            await axios.post('http://localhost:5293/api/v1/Institution/CadastraTurmaIes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            mensagemSucesso('Class registered successfully!')
            setClassIes(initialValueClassIes)
        } catch (error) {
            console.error('Erro ao registrar Turma:', error)
            mensagemErro('Erro ao registrar Turma')
        }
    }

    const institutionsOptions = institutions.map(institution => ({
        value: institution.id,
        label: institution.name,
    }))
    const availabilityOptions = availabilities.map(availability => ({
        value: availability.id,
        label: `${availability.dayWeek} - ${availability.startTime} - ${availability.scheduleEnd}`,
    }))

    const getValueSelectInstitution = (selectedOption: SingleValue<PropsOption>) => {
        const selectedInstitution = institutions.find(inst => inst.id === selectedOption?.value) || null
        setClassIes({ ...classIes, institutionId: selectedInstitution?.id })
    }
    const getValueSelectAvailability = (selectedOption: SingleValue<PropsOption>) => {
        const selectedAvailability = availabilities.find(disp => disp.id === selectedOption?.value) || null
        setClassIes({ ...classIes, availabilityId: selectedAvailability?.id })
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setClassIes({ ...classIes, csvFile: file })
    }

    const register = async () => {
        sendFormData(classIes)
    }

    return (
        <>

            <div className="main-wrapper">
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="page-header">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="page-title">Adicionar TurmaIes</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link href="/instituicao/turma">Listagem de Turmas/</Link>
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
                                                    <Input
                                                        value={classIes.course}
                                                        onChange={(value: string) => setClassIes({ ...classIes, course: value })} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label>Ano de ingresso<span className="login-danger">*</span></label>
                                                    <Input
                                                        value={classIes.period}
                                                        onChange={(value: string) => setClassIes({ ...classIes, period: value })} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label>Turno<span className="login-danger">*</span></label>
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
                                                        onChange={getValueSelectInstitution}
                                                        options={institutionsOptions}
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
                                                        onChange={getValueSelectAvailability}
                                                        options={availabilityOptions}
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
                                                    <button type="button" className="btn btn-primary" onClick={register}>Register</button>
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