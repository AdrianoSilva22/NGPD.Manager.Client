import { Mentor } from "@/models/mentorModel";
import { EntityService } from "./entityService/entityService";

export const NentorService = EntityService<Mentor>("/Mentor");
