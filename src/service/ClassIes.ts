import { ClassIes } from "@/models/ClassIes";
import { EntityService } from "./entityService/entityService";

export const ClassIesServiceRegister = EntityService<ClassIes>("/Institution/CadastraTurmaIes");
export const ClassIesServiceDelete = EntityService<ClassIes>("/Institution/DeleteTurmaIes");
export const ClassIesServiceUpdate = EntityService<ClassIes>("/Institution/UpdateTurmaIes");
export const ClassIesServiceGetById = EntityService<ClassIes>("/Institution/turmaIes");
