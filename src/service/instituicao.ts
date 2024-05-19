import { Instituicao } from "@/models/instituicaoModel";
import { EntityService } from "./entityService/entityService";

export const InstituicaoService = EntityService<Instituicao>("/institution");
