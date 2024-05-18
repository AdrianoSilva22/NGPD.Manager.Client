import { Turma } from "@/models/turmaModel";
import { EntityService } from "./entityService/entityService";

export const TurmaService = EntityService<Turma>("/instituicao/CadastraTurmaIes");
