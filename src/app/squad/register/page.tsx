'use client'
import Sidebar from "@/Sidebar/SideBar"
import Header from "@/components/Header/Header"
import { Input } from "@/components/stringInput"
import { PropsOption } from "@/models/propsOption"
import { Squad, initialValueSquad } from "@/models/squad"
import { mensagemErro, mensagemSucesso } from "@/models/toastr"
import axios from "axios"
import Link from "next/link"
import { ChangeEvent, useEffect, useState } from "react"
import Select, { SingleValue } from "react-select"

export default function SquadRegister() {
    const [squad, setSquad] = useState<Squad>(initialValueSquad)

    const sendFormData = async (squad: Squad) => {
        const formData = new FormData()

        if (squad.studants && squad.classSquad && squad.nameSquad) {
            if (squad.studants !== null) {
                formData.append('studants', squad.studants)
            }
            formData.append('nameSquad', squad.nameSquad)
            formData.append('classSquad', squad.classSquad)
        }

        try {

            await axios.post('http://localhost:5293/api/v1/Squad', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            mensagemSucesso('squad cadastrado com sucesso!')
            setSquad(initialValueSquad)
        } catch (error) {
            console.error('Erro ao cadastrar squad:', error)
            mensagemErro('Erro ao cadastrar squad')
        }
    }

    const classThemesOptions = [
        { value: "KickOff", label: 'KickOff' },
        { value: "RiseUp", label: 'RiseUp' },
        { value: "GrowUp", label: 'GrowUp' },
    ];
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setSquad({ ...squad, studants: file })
    }

    const getValueSelectTurmaTema = (selectedTemaOption: SingleValue<PropsOption>) => {
        setSquad({ ...squad, classSquad: selectedTemaOption?.value })
    }

    const cadastrar = async () => {
        sendFormData(squad)
    }

    useEffect(() => {
        console.log(squad);

    }, [squad]);

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
                                            <Link href="/squad">Listagem de Squads/</Link>
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
                                                    <label>Nome Squad <span className="login-danger">*</span></label>
                                                    <Input
                                                        value={squad.nameSquad}
                                                        onChange={(value: string) => setSquad({ ...squad, nameSquad: value })} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="form-group local-forms">
                                                    <label>
                                                        Tema Turma <span className="login-danger">*</span>
                                                    </label>

                                                    <Select
                                                        className="w-100 local-forms  select"
                                                        onChange={getValueSelectTurmaTema}
                                                        options={classThemesOptions}
                                                        placeholder="Selecione o Tema"
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
