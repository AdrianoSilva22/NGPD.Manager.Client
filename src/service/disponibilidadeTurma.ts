import { Disponibilidade } from "@/models/disponibilidadeTurma";
import { EntityService } from "./entityService/entityService";

export const DisponibilidadeService = EntityService<Disponibilidade>("/turmas/disponibilidade");


