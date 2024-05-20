import { Empresa } from "@/models/empresa";
import { EntityService } from "./entityService/entityService";

export const EmpresaService = EntityService<Empresa>("/empresa");
