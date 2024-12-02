import { Institution } from "@/models/institution";
import { EntityService } from "./entityService/entityService";

export const InstituitionServices = EntityService<Institution>("/Ies");
export const InstituitionServiceGetById = EntityService<Institution>("/institution/RetornaInstitutionId");
