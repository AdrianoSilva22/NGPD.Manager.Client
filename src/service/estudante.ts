import { Estudante } from "@/models/estudanteModel";
import { EntityService } from "./entityService/entityService";

export const EstudanteService = EntityService<Estudante>("/studant");


