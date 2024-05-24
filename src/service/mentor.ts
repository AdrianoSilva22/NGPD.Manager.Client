import { Mentor } from "@/models/mentor";
import { EntityService } from "./entityService/entityService";

export const MentorService = EntityService<Mentor>("/Mentor");
