'use client'
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/SideBar';
import { EmailInput } from '@/components/emailInput';
import { Input } from '@/components/stringInput';
import { OutputRoles } from '@/models/outPutRoles';
import { PropsOption } from '@/models/propsOption';
import { mensagemErro, mensagemSucesso } from '@/models/toastr';
import { User, initialValueUser } from '@/models/user';
import { apiService } from '@/service/apiService/apiService';
import { UserServices } from '@/service/user';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Select, { SingleValue } from "react-select";

export default function ClassUpdate() {
    const [user, setUser] = useState<User>(initialValueUser);
    const [roles, setRoles] = useState<OutputRoles[]>([]);
    const { registerEntity } = UserServices
    useEffect(() => {
        fetchRoles()
    }, []);

    const fetchRoles = async () => {
        try {
            const roles = (await apiService.get(`http://localhost:5293/api/v1/User/Role`)).data
            setRoles(roles.outPutRoles)
        } catch (error) {
            console.error(error);
        }
    };

    const institutionOptions = roles.map(role => ({
        value: role.id,
        label: role.role,
    }));

    const handleInstitutionSelect = (selectedOption: SingleValue<PropsOption>) => {
        const selectedRole = roles.find(rol => rol.id === selectedOption?.value) || null;
        setUser({ ...user, roleId: selectedRole?.id });
    };


    const registerUser = async () => {
        try {
            if (user) {
                await registerEntity(user);
                setUser(initialValueUser);
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
            {user ? (
                <div className="main-wrapper">
                    <div className="page-wrapper">
                        <div className="content container-fluid">
                            <div className="page-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <span className="page-title">Registrar Funcionário</span>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link href="/institution/turma"></Link>
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
                                                            <span>Funcionário</span>
                                                        </h5>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                name <span className="login-danger">*</span>
                                                            </label>
                                                            <Input
                                                                value={user.name}
                                                                onChange={(value: string) => setUser({ ...user, name: value })} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Email <span className="login-danger">*</span>
                                                            </label>
                                                            <EmailInput
                                                                value={user.contact}
                                                                onChange={(value: string) => setUser({ ...user, contact: value })} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Cargo <span className="login-danger">*</span>
                                                            </label>
                                                            <Select
                                                                className="w-100 local-forms select"
                                                                onChange={handleInstitutionSelect}
                                                                options={institutionOptions}
                                                                placeholder="Selecione um Cargo"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="student-submit">
                                                            <button type="button" className="btn btn-primary" onClick={registerUser}>Registrar</button>
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
