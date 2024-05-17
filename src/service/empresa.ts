import { Empresa } from "@/models/EmpresaModel";
import { EntityService } from "./entityService/entityService";

export const EmpresaService = EntityService<Empresa>("/empresa");
