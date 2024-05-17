'use client'
import { Empresas } from "@/components/empresasComponent";
import { Empresa } from "@/models/EmpresaModel";
import { EmpresaService } from "@/service/empresa";
import storeRequestInCach from "@/utils/saveRequestInCache";
import { useRouter } from "next/navigation";
import { useState } from 'react';

export default function ListaEmpresas() {
    const { getTotalEntities } = EmpresaService
    const router = useRouter();
    const [, setShowBackButton] = useState<boolean>(false);
    const [empresas, setEmpresas] = useState<Empresa[]>([])

    const storeRequestInCachEmpresas = storeRequestInCach("empresas", getTotalEntities)
    return (
        <div>
        
            <Empresas />
            <button
                id="button-register"
                type="button"
                onClick={() => { router.push('/empresa/register') }}>
                Registrar
            </button>

        </div>
    );
}