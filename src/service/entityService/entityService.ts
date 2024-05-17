
import { apiService } from "../apiService";

export const EntityService = <T>(url: string) => {
    
    const registerEntity = (entity: T) => {
        return apiService.post(`${url}`, entity);
    };

    const updateEntity = (email: string, entity: T) => {
        return apiService.put(`${url}/update ${email}`, entity);
    };

    const getTotalEntities = () => {
        return apiService.get(`${url}`);
    };

    const deleteEntity = (email: string) => {
        return apiService.delete(`${url}?email=${email}`);
    };

    return {
        registerEntity,
        updateEntity,
        getTotalEntities,
        deleteEntity,
    };
}