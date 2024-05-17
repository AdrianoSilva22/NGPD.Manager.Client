
import { Empresa } from "@/models/EmpresaModel";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { EmpresaService } from "@/service/empresa";
import saveRequestInCach from "@/utils/saveRequestInCache";
import { useEffect, useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { VscArchive } from "react-icons/vsc";

export function Empresas() {
    const { deleteEntity, getTotalEntities, updateEntity } = EmpresaService

    const [empresas, setEmpresas] = useState<Empresa[]>([])
    const [search, setSearch] = useState('')

    const empresasCacheResult = saveRequestInCach("empresas", getTotalEntities)

    useEffect(() => {
        if (!empresasCacheResult.isFetching) {
            setEmpresas(empresasCacheResult.entitiesCache)
        }
    }, [empresasCacheResult.isFetching]);
    
    const filterEmpresas = search.length > 0 ? empresas.filter((empresa) => empresa.company.includes(search)): []

    const handleDeleteClick = async (empresa: Empresa) => {
        try {
            await deleteEntity(empresa.cnpj);
            const filtered = empresas.filter(e => e.cnpj !== empresa.cnpj);
            setEmpresas(filtered)
            mensagemSucesso("Empresa deletada com sucesso!")
        } catch (error) {
            mensagemErro('Erro ao excluir empresa');
        }
    };

    // const handleUpdateClick = async (empresa: Empresa) => {
    //     try {
    //         await updateEntity(empresa.cnpj, empresa);
    //         const filtered = empresas.filter(e => e.cnpj === empresa.cnpj);
    //         setEmpresas(filtered)
    //         mensagemSucesso("Empresa deletada com sucesso!")
    //     } catch (error) {
    //         mensagemErro('Erro ao excluir empresa');
    //     }
    // };


    return (
        <div className="card-container">

            <input
                type="text"
                onChange={(event) => setSearch(event.target.value)}
                value={search}
            />

            <ul className="card">
                <li className="titulos">
                    <span>CNPJ</span>
                    <span>Contact</span>
                    <span>Company</span>
                </li>

                {empresasCacheResult.isFetching && <p className="loading">Carregando...</p>}

                {search.length > 0 ? (
                    filterEmpresas && (
                        filterEmpresas.map((empresa: Empresa) => (
                            <li key={empresa.cnpj} className="card-item">
                                <span className="cnpj">{empresa.cnpj}</span>
                                <span className="contact">{empresa.contact}</span>
                                <span className="company">{empresa.company}</span>
                                <button onClick={() => handleDeleteClick(empresa)}><VscArchive /></button>
                                <button onClick={() => { }}><AiTwotoneEdit /></button>
                            </li>
                        ))
                    )
                ) : empresas && (
                    empresas.map((empresa: Empresa) => (
                        <li key={empresa.cnpj} className="card-item">
                            <span className="cnpj">{empresa.cnpj}</span>
                            <span className="contact">{empresa.contact}</span>
                            <span className="company">{empresa.company}</span>
                            <button onClick={() => handleDeleteClick(empresa)}><VscArchive /></button>
                            <button onClick={() => { }}><AiTwotoneEdit /></button>
                        </li>
                    ))
                )}
            </ul>

        </div>
    )
}