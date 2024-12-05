'use client';

import { Suspense } from "react"; // Importando Suspense do React
import { Student, initialvalueStudent } from "@/models/student";
import { ClassIes } from "@/models/ClassIes";
import { PropsOption } from "@/models/propsOption";
import { EmailInput } from "@/components/emailInput";
import { Input } from "@/components/stringInput";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { StudentServices } from "@/service/student";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Footer } from "antd/es/layout/layout";
import { apiService } from "@/service/apiService/apiService";

const StudentUpdate = () => {
    const [student, setStudent] = useState<Student>(initialvalueStudent);
    const [loading, setLoading] = useState(true);
    const [listClassIes, setListClassIes] = useState<ClassIes[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchStudentById = async () => {
            try {
                const { searchParams } = new URL(window.location.href);
                const studentId = searchParams.get('Id');
                if (studentId) {
                    const response = await StudentServices.getEntityById(studentId);
                    setStudent(response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar estudante:', error);
                mensagemErro('Erro ao buscar estudante.');
            } finally {
                setLoading(false);
            }
        };

        const fetchListClassIes = async () => {
            try {
                const response = await apiService.get(`http://localhost:5293/api/v1/Institution/RetornaTurmaIesAll`);
                setListClassIes(response.data.listClassIes);
            } catch (error) {
                console.error('Erro ao buscar turmas:', error);
                mensagemErro('Erro ao buscar turmas.');
            }
        };

        fetchStudentById();
        fetchListClassIes();
    }, [router]);

    const turmaOptions = listClassIes.map(classIes => ({
        value: classIes.id,
        // label: `${classIes.course} - ${classIes.period} - ${classIes.shift}`,
    }));

    const getValueSelectTurma = (selectedOption: SingleValue<PropsOption>) => {
        const selectedTurma = listClassIes.find(classIes => classIes.id === selectedOption?.value) || null;
        if (selectedTurma) {
            setStudent({ ...student, email: selectedTurma.id });
        }
    };

    const atualizar = async () => {
        try {
            if (student) {
                await StudentServices.updateEntity(student);
                setStudent(initialvalueStudent);
                mensagemSucesso("Estudante atualizado com sucesso");
                window.location.href = '/turma'; // Redireciona após atualização
            }
        } catch (error) {
            console.log("Erro ao atualizar estudante:", error);
            mensagemErro('Erro ao atualizar estudante');
        }
    };

    if (loading) {
        return <div className="text-center">Carregando...</div>;
    }

    return (
        <>
            <h6 style={{ float: 'right' }} className="breadcrumb-item">
                <Link href="/turma">Estudantes/</Link>
            </h6>
            <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Atualizar Estudante</h4>
            <form>
                <div className="row">
                    <div className="col-12">
                        <h5 className="form-title">
                            <span>Detalhes do Estudante</span>
                        </h5>
                    </div>
                    <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                            <label>
                                Nome <span className="login-danger">*</span>
                            </label>
                            <Input
                                value={student.name}
                                onChange={(value: string) => setStudent({ ...student, name: value })}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                            <label>
                                Turma <span className="login-danger">*</span>
                            </label>
                            <Select
                                className="w-100 local-forms select"
                                // onChange={getValueSelectTurma}
                                options={turmaOptions}
                                placeholder="Selecione  uma Turma"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                            <label>
                                Email <span className="login-danger">*</span>
                            </label>
                            <EmailInput
                                value={student.email}
                                onChange={(value: string) => setStudent({ ...student, email: value })}
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
            <Footer />
        </>
    );
};

// Envolvendo o componente StudentUpdate em um limite de suspense
const StudentUpdateWithSuspense = () => (
    <Suspense fallback={<div>Carregando...</div>}>
        <StudentUpdate />
    </Suspense>
);

export default StudentUpdateWithSuspense;
