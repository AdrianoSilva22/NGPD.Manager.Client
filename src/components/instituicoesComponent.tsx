
import { Instituicao } from "@/models/instituicaoModel";
import { mensagemErro, mensagemSucesso } from "@/models/toastr";
import { InstituicaoService } from "@/service/instituicao";
import { useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { VscArchive } from "react-icons/vsc";

interface Prop {
    instituicoes: Instituicao[]
}

export function Instituicoes({ instituicoes }: Prop) {
    const { deleteEntity, updateEntity } = InstituicaoService

    // // const onPageChange = (page: any) => {
    // //     setCurrentPage(page);
    // // };


    const [instituicoesState, setInstituicoesState] = useState<Instituicao[]>(instituicoes)
    const [search, setSearch] = useState('')


    // useEffect(() => {
    //     if (!instituicoesCacheResult.isFetching) {
    //         setInstituicoes(instituicoesCacheResult.entitiesCache.instituicoes)
    //     }
    // }, [instituicoesCacheResult.isFetching]);

    const filterInstituicoes = search.length > 0 ? instituicoesState.filter((instituicao) => instituicao.email.includes(search)) : []

    const handleDeleteClick = async (instituicao: Instituicao) => {
        try {
            await deleteEntity(instituicao.email);
            const filtered = instituicoes.filter(e => e.email !== instituicao.email);
            setInstituicoesState(filtered)
            mensagemSucesso("Empresa deletada com sucesso!")
        } catch (error) {
            console.log(error);
            
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

            {/* <input
                type="text"
                onChange={(event) => setSearch(event.target.value)}
                value={search}
            /> */}

            <ul className="card">
                <li className="titulos">
                    <span>Nome</span>
                    <span>Email</span>
                </li>

                {/* {instituicoesCacheResult.isFetching && <p className="loading">Carregando...</p>} */}

                {search.length > 0 ? (
                    filterInstituicoes.length > 0 && (
                        filterInstituicoes.map((instituicao: Instituicao) => (
                            <li key={instituicao.email} className="card-item">
                                <span className="nome">{instituicao.nome}</span>
                                <span className="contact">{instituicao.email}</span>
                                <button onClick={() => handleDeleteClick(instituicao)}><VscArchive /></button>
                                <button onClick={() => { }}><AiTwotoneEdit /></button>
                            </li>
                        ))
                    )
                ) : instituicoes.length > 0 && (
                    instituicoes.map((instituicao: Instituicao) => (
                        <li key={instituicao.email} className="card-item">
                            <span className="nome">{instituicao.nome}</span>
                            <span className="contact">{instituicao.email}</span>
                            <button onClick={() => handleDeleteClick(instituicao)}><VscArchive /></button>
                            <button onClick={() => { }}><AiTwotoneEdit /></button>
                        </li>
                    ))
                )}

                {/* <Pagination
                    items={instituicoes.length}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                /> */}
            </ul>

        </div>
    )
}