import { Aluno } from "@/models/alunoModel";
import { EntityService } from "./entityService/entityService";

export const AlunoService = EntityService<Aluno>("/Studants");


