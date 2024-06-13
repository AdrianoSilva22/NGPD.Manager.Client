import { Empresa } from "@/models/empresa";
import { EntityService } from "./entityService/entityService";

export const EmpresaService = EntityService<Empresa>("/Empresa");
export const EmpresaServiceGetById = (empresaId: string) => EntityService<Empresa>(`/api/v1/Empresa/${empresaId}/ListaSquads`);

