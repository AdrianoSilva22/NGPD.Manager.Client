"use client"

import { globalStateAtomId } from '@/atoms/atoms'
import { EmailInput } from '@/components/emailInput'
import { Input } from '@/components/stringInput'
import { ClassIes } from '@/models/ClassIes'
import { PropsOption } from '@/models/propsOption'
import { Student, initialvalueStudent } from '@/models/student'
import { mensagemErro, mensagemSucesso } from '@/models/toastr'
import { apiService } from '@/service/apiService/apiService'
import { StudentServices } from '@/service/student'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Select, { SingleValue } from "react-select"

export default function StudentUpdate() {
    const [student, setStudent] = useState<Student>(initialvalueStudent)
    const [globalStateId,] = useAtom(globalStateAtomId)
    const { updateEntity, getEntityById } = StudentServices
    const [listClassIes, setListClassIes] = useState<ClassIes[]>([])
    
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchEmpresaById = async () => {
            try {
                const empresaId = searchParams.get('Id') as string;
                const resultfetchEmpresaById = await getEntityById(empresaId);
                setStudent(resultfetchEmpresaById.data);
            } catch (error) {
                console.error(error);
            } 
        };

        fetchEmpresaById()
        fetchListClassIes()
    }, [searchParams]);

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
        if (selectedTurma) {
            setStudent({ ...student, contact: selectedTurma?.id })
        }
    }


    const atualizar = async () => {
        try {
            if (student) {
                await updateEntity(student)
                setStudent(initialvalueStudent)
                mensagemSucesso("Estudante atualizado com sucesso")
            }
        } catch (error) {
            console.log(error);
            mensagemErro('Erro ao atualizar estudante')
        }
    }

    return (
        <div></div>
        // <>
        //     {student ? (
        //         <div className="main-wrapper">
        //             <div className="page-wrapper">
        //                 <div className="content container-fluid">
        //                     <div className="page-header">
        //                         <div className="row align-items-center">
        //                             <div className="col">
        //                                 <span className="page-title">Atualizar Estudante</span>
        //                                 <ul className="breadcrumb">
        //                                     <li className="breadcrumb-item">
        //                                         <Link href="/turma">Listagem de Estudantes</Link>
        //                                     </li>
        //                                     <li className="breadcrumb-item active"> Atualizar Estudante</li>
        //                                 </ul>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div className="row">
        //                         <div className="col-sm-12">
        //                             <div className="card">
        //                                 <div className="card-body">
        //                                     <form>
        //                                         <div className="row">
        //                                             <div className="col-12">
        //                                                 <h5 className="form-title">
        //                                                     <span>Detalhes do Estudante</span>
        //                                                 </h5>
        //                                             </div>
        //                                             <div className="col-12 col-sm-4">
        //                                                 <div className="form-group local-forms">
        //                                                     <label>
        //                                                         Nome <span className="login-danger">*</span>
        //                                                     </label>
        //                                                     <Input
        //                                                         value={student.name}
        //                                                         onChange={(value: string) => setStudent({ ...student, name: value })} />

        //                                                 </div>
        //                                             </div>
        //                                             <div className="col-12 col-sm-4">
        //                                                 <div className="form-group local-forms">
        //                                                     <label>
        //                                                         Turma <span className="login-danger">*</span>
        //                                                     </label>

        //                                                     <Select
        //                                                         className="w-100 local-forms select"
        //                                                         onChange={getValueSelectTurma}
        //                                                         options={turmaOptions}
        //                                                         placeholder="Selecione uma Turma"
        //                                                     />
        //                                                 </div>
        //                                             </div>
        //                                             <div className="col-12 col-sm-4">
        //                                                 <div className="form-group local-forms">
        //                                                     <label>
        //                                                         Email <span className="login-danger">*</span>
        //                                                     </label>
        //                                                     <EmailInput
        //                                                         value={student.contact}
        //                                                         onChange={(value: string) => setStudent({ ...student, contact: value })}
        //                                                     />

        //                                                 </div>
        //                                             </div>
        //                                             <div className="col-12">
        //                                                 <div className="student-submit">
        //                                                     <button type="button" className="btn btn-primary" onClick={atualizar}>Atualizar</button>
        //                                                 </div>
        //                                             </div>
        //                                         </div>
        //                                     </form>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     ) : (
        //         <div>Carregando...</div>
        //     )}
        // </>
    )
}
