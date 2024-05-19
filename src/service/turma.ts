import { Turma } from "@/models/turmaModel";
import { EntityService } from "./entityService/entityService";

export const TurmaServiceRegister = EntityService<Turma>("/Institution/CadastraTurmaIes");
export const TurmaServiceDelete = EntityService<Turma>("/Institution/DeleteTurmaIes");
export const TurmaServiceUpdate = EntityService<Turma>("/Institution/UpdateTurmaIes");
