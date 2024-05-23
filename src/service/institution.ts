import { Instituition } from "@/models/institution";
import { EntityService } from "./entityService/entityService";

export const InstituitionServices = EntityService<Instituition>("/institution");
export const InstituitionServiceGetById = EntityService<Instituition>("/institution/RetornaInstitutionId");
