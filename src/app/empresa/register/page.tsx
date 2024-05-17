'use client'
import { Empresa, valorInicialEmpresa } from "@/models/EmpresaModel"
import { mensagemErro, mensagemSucesso } from "@/models/toastr"
import { EmpresaService } from "@/service/empresa"
import '@/styles/register-empresa.css'
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function Register() {
    const router = useRouter()
    const [empresa, setEmpresa] = useState<Empresa>(valorInicialEmpresa)
    const { registerEntity } = EmpresaService;

    const cadastrar = async () => {
        try {
            await registerEntity(empresa)
            setEmpresa(valorInicialEmpresa)
            mensagemSucesso('Empresa Cadastrada Com Sucesso!')
        } catch (e: any) {
            mensagemErro('Error ao cadastrar Empresa')
        }
    }

    return (
        <div className="main-div">
            <div className="secondary-div">
                <div className="left-div">
                    <h1 id='titulo'>Cadastro</h1>

                    <input
                        id='InputRegister'
                        placeholder="CNPJ"
                        type="text"
                        name="cnpj"
                        value={empresa.cnpj}
                        onChange={(e) => setEmpresa({ ...empresa, cnpj: e.target.value })}
                    />

                    <input
                        id='InputRegister'
                        placeholder="Razão Social"
                        type="text"
                        name="companyName"
                        value={empresa.company}
                        onChange={(e) => setEmpresa({ ...empresa, company: e.target.value })}
                    />

                    <input
                        id='InputRegister'
                        placeholder="Contato"
                        type="text"
                        name="contact"
                        value={empresa.contact}
                        onChange={(e) => setEmpresa({ ...empresa, contact: e.target.value })}
                    />

                    <button
                        type="button"
                        onClick={cadastrar}>
                        CADASTRAR
                    </button>

                    <button type="button">
                        <a href="/empresa">
                            Voltar
                        </a>
                    </button>
                </div>
            </div>
        </div>
    )
}
