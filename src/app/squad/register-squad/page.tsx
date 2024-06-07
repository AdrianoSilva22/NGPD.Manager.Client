'use client'

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/SideBar";
import { Squad, initialValueSquad } from "@/models/squad";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { apiService } from "@/service/apiService/apiService";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterSquad() {
    const [squadData, setSquadData] = useState<Squad>(initialValueSquad);
    const searchParams = useSearchParams();

    useEffect(() => {
        
        console.log(squadData);
    
     
    }, [squadData]);
    
    useEffect(() => {
        const classIesId = searchParams.get('classIesId');
        if (classIesId) {
            setSquadData(prevData => ({ ...prevData, institutionClasseId: classIesId }));
        }
    }, [searchParams]);

    const cadastrarSquad = async () => {
        try {
            await apiService.post('http://localhost:5293/api/v1/Squad', {
                ...squadData,
                qtd: squadData.qtd || 0,
            });
            mensagemSucesso('Cadastro realizado com sucesso!');
        } catch (error: any) {
            console.error('Erro ao cadastrar Squad:', error);
            mensagemErro(error.response.data.detail);
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
                                    <h3 className="page-title">Adicionar Squad</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link href="/squad">Listagem de Squad/</Link>
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
                                                    <label>Modulo<span className="login-danger">*</span></label>
                                                    <select
                                                        className="form-control"
                                                        value={squadData.classModule}
                                                        onChange={(e) => setSquadData({ ...squadData, classModule: e.target.value })}
                                                    >
                                                        <option >Selecione um módulo</option>
                                                        <option value="Kick off">Kick off</option>
                                                        <option value="Grow up">Grow up</option>
                                                        <option value="Rise Up">Rise Up</option>
                                                        <option value="Final Up">Final Up</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label >Quantidade de Squad <span className="login-danger">*</span></label>
                                                    <select
                                                        className="form-control"
                                                        value={squadData.qtd}
                                                        onChange={(e) => setSquadData({ ...squadData, qtd: e.target.value })}
                                                    >
                                                        <option >Selecione a quantidade</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group local-forms">
                                                <label >Nome do Squad <span className="login-danger">*</span></label>
                                                <input type="text" className="form-control" value={squadData.nameSquad} onChange={(e) => setSquadData({ ...squadData, nameSquad: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="student-submit">
                                                <button type="button" className="btn btn-primary" onClick={cadastrarSquad}>Cadastrar</button>
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
    );
}
