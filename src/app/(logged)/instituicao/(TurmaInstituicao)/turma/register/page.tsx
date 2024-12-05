'use client';
import { EmailInput } from '@/components/emailInput';
import { Input } from '@/components/stringInput';
import { ClassIes, initialValueClassIes } from '@/models/ClassIes';
import { mensagemErro, mensagemSucesso } from '@/models/toastr';
import { apiService } from '@/service/apiService/apiService';
import { ClassIesServiceRegister } from '@/service/ClassIes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Select, { SingleValue, MultiValue } from 'react-select';
import { Student } from '@/models/student';

export default function EmpresaRegister() {
    const [classies, setClassies] = useState<ClassIes>(initialValueClassIes);
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const [iesOptions, setIesOptions] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        fetchStudents();
        fetchIesOptions();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await apiService.get('/Aluno?PageSize=50&PageNumber=0&Sort=asc');
            const studentsData = response.data;
            setStudents(studentsData.list.map((item: any) => ({
                id: item.id,
                name: item.name,
                email: item.email,
            })));
        } catch (error) {
            console.error('Erro ao buscar estudantes:', error);
        }
    };

    const fetchIesOptions = async () => {
        try {
            const response = await apiService.get('/Ies?PageSize=15&PageNumber=0&Sort=asc');
            const iesData = response.data;
            setIesOptions(iesData.list.map((item: any) => ({
                value: item.id,
                label: item.name,
            })));
        } catch (error) {
            console.error('Erro ao buscar IES:', error);
        }
    };

    const cadastrar = async () => {
        try {
            const selectedStudentDetails = selectedStudents.map(id => {
                const student = students.find(student => student.id === id);
                return student || { id, name: '', email: '' };
            });
            await apiService.post('/Turma', { name: classies.name, instituicaoId: classies.instituticaoid, listStudant: selectedStudentDetails });
            setClassies(initialValueClassIes);
            setSelectedStudents([]);
            mensagemSucesso('Turma cadastrada com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar Empresa:', error);
            mensagemErro('Erro ao cadastrar Empresa');
        }
    };

    const studentOptions = students.map(student => ({
        value: student.id,
        label: student.name,
    }));

    const handleStudentSelect = (selectedOptions: MultiValue<{ value: string; label: string }>) => {
        setSelectedStudents(selectedOptions.map(option => option.value));
    };

    const handleIesSelect = (selectedIes: SingleValue<{ value: string; label: string }>) => {
        setClassies({ ...classies, instituticaoid: selectedIes?.value || '' });
    };

    return (
        <div className="main-wrapper">
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Adicionar Turma</h3>
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
                                    <form>
                                        <div className="row">
                                            <div className="col-12">
                                                <h5 className="form-title">
                                                    <span>Turma</span>
                                                </h5>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label>Nome da Turma <span className="login-danger">*</span></label>
                                                    <Input
                                                        value={classies.name}
                                                        onChange={(value: string) => setClassies({ ...classies, name: value })} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label>IES <span className="login-danger">*</span></label>
                                                    <Select
                                                        className="w-100 local-forms select"
                                                        onChange={handleIesSelect}
                                                        options={iesOptions}
                                                        placeholder="Selecione a IES"
                                                        value={iesOptions.find(option => option.value === classies.instituticaoid) || { label: '', value: '' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label>Estudantes</label>
                                                    <Select
                                                        className="w-100 local-forms select"
                                                        isMulti
                                                        onChange={handleStudentSelect}
                                                        options={studentOptions}
                                                        placeholder="Selecione os Estudantes"
                                                        value={studentOptions.filter(option => selectedStudents.includes(option.value)) || []}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="student-submit">
                                                    <button type="button" className="btn btn-primary" onClick={cadastrar}>Cadastrar</button>
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
    );
}
