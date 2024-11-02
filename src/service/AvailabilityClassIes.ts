import { Availability } from "@/models/Availability";
import { EntityService } from "./entityService/entityService";

export const AvailabilityService = EntityService<Availability>("/turmas/disponibilidade");


