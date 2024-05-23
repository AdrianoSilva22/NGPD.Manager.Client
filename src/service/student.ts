import { Student } from "@/models/student";
import { EntityService } from "./entityService/entityService";

export const StudentServices = EntityService<Student>("/studant");