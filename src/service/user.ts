import { User } from "@/models/user";
import { EntityService } from "./entityService/entityService";

export const UserServices = EntityService<User>("/Conta");