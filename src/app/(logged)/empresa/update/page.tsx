"use client";

import { EmailInput } from '@/components/emailInput';
import { Input } from '@/components/stringInput';
import { Empresa, initialValueEmpresa } from '@/models/empresa';
import { mensagemErro, mensagemSucesso } from '@/models/toastr';
import { EmpresaService } from '@/service/empresa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EmpresaUpdate() {
    const [empresa, setEmpresa] = useState<Empresa>(initialValueEmpresa);
    const router = useRouter();
    const { getEntityById, updateEntity } = EmpresaService;

    useEffect(() => {
        const fetchEmpresaById = async () => {
            try {
                const { searchParams } = new URL(window.location.href);
                const empresaId = searchParams.get('Id'); // Obtendo o ID da URL
                if (empresaId) {
                    const result = await getEntityById(empresaId);
                    setEmpresa(result.data);
                }
            } catch (error) {
                console.error(error);
                mensagemErro("Erro ao buscar empresa.");
            }
        };

        fetchEmpresaById();
    }, [router]);

    const atualizar = async () => {
        try {
            if (empresa) {
                await updateEntity(empresa);
                setEmpresa(initialValueEmpresa);
                mensagemSucesso("Empresa atualizada com sucesso");
            }
        } catch (error) {
            console.error("Erro ao atualizar empresa:", error);
            mensagemErro('Erro ao atualizar');
        }
    };

    return (
        <>
            {empresa ? (
                <div className="main-wrapper">
                    <div className="page-wrapper">
                        <div className="content container-fluid">
                            <div className="page-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <span className="page-title">Atualizar</span>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link href="/empresa">Listagem de Empresas</Link>
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
                                                            <span>Atualizar Empresa</span>
                                                        </h5>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Nome da Empresa <span className="login-danger">*</span>
                                                            </label>
                                                            <Input
                                                                value={empresa.name}
                                                                onChange={(value: string) => setEmpresa({ ...empresa, name: value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <div className="form-group local-forms">
                                                            <label>
                                                                Email da Empresa <span className="login-danger">*</span>
                                                            </label>
                                                            <EmailInput
                                                                value={empresa.email}
                                                                onChange={(value: string) => setEmpresa({ ...empresa, email: value })}
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
                <div>Carregando...</div>
            )}
        </>
    );
}
