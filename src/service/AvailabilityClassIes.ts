import { Availability } from "@/models/AvailabilityClassIes";
import { EntityService } from "./entityService/entityService";

export const AvailabilityService = EntityService<Availability>("/turmas/disponibilidade");


