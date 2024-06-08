'use client'
import Header from "@/components/Header/Header"
import Sidebar from "@/components/Sidebar/SideBar"
import { PeriodoInput } from "@/components/periodoInput"
import { Input } from "@/components/stringInput"
import { ClassIes, initialValueClassIes } from "@/models/ClassIes"
import { Institution } from "@/models/institution"
import { PropsOption } from "@/models/propsOption"
import { mensagemErro, mensagemSucesso } from "@/models/toastr"
import { apiService } from "@/service/apiService/apiService"
import axios from "axios"
import Cookies from 'js-cookie'
import Link from "next/link"
import { ChangeEvent, useEffect, useState } from "react"
import Select, { SingleValue } from "react-select"

export default function InstitutionRegister() {

    const [classIes, setClassIes] = useState<ClassIes>(initialValueClassIes)
    const [institutions, setInstitutions] = useState<Institution[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const getInstitutions = async () => {
            try {
                const institutions = (await apiService.get(`http://localhost:5293/api/v1/institution`)).data
                setInstitutions(institutions.institution)
            } catch (error) {
                console.error('Error fetching institutions:', error);
                mensagemErro('Erro ao buscar instituições');
            }
        }
        getInstitutions()
    }, [])

    const sendFormData = async (classIes: ClassIes) => {
        const formData = new FormData();

        if (classIes.csvFile) {
            formData.append('csvFile', classIes.csvFile);
        }
        formData.append('course', classIes.course);
        if (classIes.institutionId) {
            formData.append('InstitutionId', classIes.institutionId)
        }
        formData.append('period', classIes.period)
        formData.append('shift', classIes.shift)
        formData.append('availabilities', JSON.stringify(classIes.availabilities));

        try {
            const token = Cookies.get('tokenUserInfo');
            if (!token) {
                mensagemErro('Token de autenticação não encontrado');
                return;
            }
            
            setLoading(true);
            await axios.post('http://localhost:5293/api/v1/Institution/TurmaIes/CadastraTurmaIes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            })
            mensagemSucesso('Cadastrado com Sucesso')
            setClassIes(initialValueClassIes)
        } catch (error) {
            console.error('Erro ao registrar Turma:', error);
            mensagemErro('Erro ao registrar Turma');
        } finally {
            setLoading(false);
        }
    };

    const institutionsOptions = institutions.map(institution => ({
        value: institution.id,
        label: institution.name,
    }))

    const getValueSelectInstitution = (selectedOption: SingleValue<PropsOption>) => {
        const selectedInstitution = institutions.find(inst => inst.id === selectedOption?.value) || null
        setClassIes({ ...classIes, institutionId: selectedInstitution?.id })
    }
 
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0] || null;
            setClassIes({ ...classIes, csvFile: file });
        } catch (error) {
            console.error('Erro ao selecionar arquivo:', error);
            mensagemErro('Erro ao selecionar arquivo');
        }
    };

    const register = async () => {
        await sendFormData(classIes);
    };

    return (
        <>
            <Header />
            <Sidebar />
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
                                                    <PeriodoInput
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
                                                    <button type="button" className="btn btn-primary" onClick={register} disabled={loading}>
                                                        {loading ? 'Registrando...' : 'Registrar'}
                                                    </button>
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
