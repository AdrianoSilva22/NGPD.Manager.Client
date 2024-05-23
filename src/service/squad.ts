import { Squad } from "@/models/squad";
import { EntityService } from "./entityService/entityService";

export const SquadServices = EntityService<Squad>("/Squad");
