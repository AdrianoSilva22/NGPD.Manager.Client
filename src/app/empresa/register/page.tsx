'use client'
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/SideBar";
import { EmailInput } from "@/components/emailInput";
import { Input } from "@/components/stringInput";
import { Empresa, initialValueEmpresa } from "@/models/empresa";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { EmpresaService } from "@/service/empresa";
import Link from "next/link";
import { useState } from "react";

export default function EmpresaRegister() {
    const [empresa, setEmpresa] = useState<Empresa>(initialValueEmpresa);
    const { registerEntity } = EmpresaService

    const cadastrar = async () => {
        try {
            await registerEntity(empresa)
            setEmpresa(initialValueEmpresa);
            mensagemSucesso('Empresa cadastrada com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar Empresa:', error);
            mensagemErro('Erro ao cadastrar Empresa');
        }
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
                                    <h3 className="page-title">Adicionar Empresa</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link href="/empresa">Listagem de Empresas/</Link>
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
                                                    <label>Nome da Empresa <span className="login-danger">*</span></label>
                                                    <Input
                                                        value={empresa.name}
                                                        onChange={(value: string) => setEmpresa({ ...empresa, name: value })} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label>Email <span className="login-danger">*</span></label>
                                                    <EmailInput
                                                        value={empresa.contact}
                                                        onChange={(value: string) => setEmpresa({ ...empresa, contact: value })}
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
