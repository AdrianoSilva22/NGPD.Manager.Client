
import { Empresa } from "@/models/empresa";
import { Student } from "@/models/estudanteModel";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { EmpresaService } from "@/service/empresa";
import saveRequestInCach from "@/utils/saveRequestInCache";
import { useEffect, useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { VscArchive } from "react-icons/vsc";

export function Students() {
    const [students, setStudents] = useState<Student[]>([])
    const empresasCacheResult = saveRequestInCach("empresas")


    useEffect(() => {
        if (!empresasCacheResult.isFetching) {
            students(empresasCacheResult.empresasCache)
        }      
    }, [empresasCacheResult.isFetching]);

    const { deleteEntity } = EmpresaService

    const handleDeleteClick = async (empresa: Empresa) => {
        try {
            await deleteEntity(empresa.cnpj);
            const index = empresas.indexOf(empresa)
            const updatedEmpresas = empresas.splice(index, 1);

            // var filtered = empresas.filter(e => e.cnpj !== empresa.cnpj);
            setEmpresas(updatedEmpresas)
            mensagemSucesso("Empresa deletada com sucesso!")
        } catch (error) {
            mensagemErro('Erro ao excluir empresa');
        }
    };

    return (
        <div className="card-container">

            <ul className="card">
                <li className="titulos">
                    <span>CNPJ</span>
                    <span>Contact</span>
                    <span>Company</span>
                </li>

                {empresasCacheResult.isFetching && <p className="loading">Carregando...</p>}

                {
                    empresas && (
                        empresas.map((empresa: Empresa) => (
                            <li key={empresa.cnpj} className="card-item">
                                <span className="cnpj">{empresa.cnpj}</span>
                                <span className="contact">{empresa.contact}</span>
                                <span className="company">{empresa.company}</span>
                                <button onClick={() => handleDeleteClick(empresa)}><VscArchive /></button>
                                <AiTwotoneEdit />
                            </li>
                        ))
                    )
                }
            </ul>

        </div>
    )
}