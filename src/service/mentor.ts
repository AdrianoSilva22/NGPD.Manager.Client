import { Mentor } from "@/models/mentor";
import { EntityService } from "./entityService/entityService";

export const NentorService = EntityService<Mentor>("/Mentor");
