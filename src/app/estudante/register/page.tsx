'use client'
import { ClassIes } from "@/models/ClassIes";
import { PropsOption } from "@/models/propsOption";
import { Student, initialvalueStudent } from "@/models/student";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService";
import { StudentServices } from "@/service/student";
import Link from "next/link";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";


export default function RegisterStudent() {
    const [student, setStudent] = useState<Student>(initialvalueStudent)
    const [listClassIes, setListClassIes] = useState<ClassIes[]>([])
    const { registerEntity } = StudentServices

        useEffect(() => {
            fetchListClassIes()
        }, [])

        const fetchListClassIes = async () => {
            const responseListClassIes = (await apiService.get(`http://localhost:5293/api/v1/Institution/RetornaTurmaIesAll`)).data
            setListClassIes(responseListClassIes.listClassIes)
        }
        
    const turmaOptions = listClassIes.map(classIes => ({
        value: classIes.id,
        label: `${classIes.course} - ${classIes.period} - ${classIes.shift}`,
    }))

    const getValueSelectTurma = (selectedOption: SingleValue<PropsOption>) => {
        const selectedTurma = listClassIes.find(classIes => classIes.id === selectedOption?.value) || null
        if(selectedTurma){
            setStudent({ ...student, turmaId: selectedTurma?.id })
        }
    }

    const cadastrar = async () => {
        try {
            await registerEntity(student)
            setStudent(initialvalueStudent)
            mensagemSucesso('Estudante cadastrado com sucesso!')
        } catch (error) {
            console.error('Erro ao cadastrar Estudante:', error)
            mensagemErro('Erro ao cadastrar Estudante')
        }
    }

    return (
        <>
            <div className="main-wrapper">
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="page-header">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="page-title">Adicionar Estudante</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link href="/turma">Listagem de Estudantes/</Link>
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
                                                    <label>Nome <span className="login-danger">*</span></label>
                                                    <input type="text" className="form-control" value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label>Email <span className="login-danger">*</span></label>
                                                    <input type="text" className="form-control" value={student.contact} onChange={(e) => setStudent({ ...student, contact: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label>
                                                        Turma <span className="login-danger">*</span>
                                                    </label>

                                                    <Select
                                                        className="w-100 local-forms select"
                                                        onChange={getValueSelectTurma}
                                                        options={turmaOptions}
                                                        placeholder="Selecione uma Turma"
                                                    />
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
