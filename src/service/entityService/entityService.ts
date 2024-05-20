
import { apiService } from "../apiService";

export const EntityService = <T>(url: string) => {

    const registerEntity = (entity: T) => {
        return apiService.post(`${url}`, entity);
    };

    const updateEntity = (entity: T) => {
        return apiService.put(`${url}`, entity);
    };

    const getTotalEntities = () => {
        return apiService.get(`${url}`);
    };

    const getEntityById = (id: string) => {
        return apiService.get(`${url}/${id}`);
    };

    const deleteEntity = (id: string) => {
        return apiService.delete(`${url}?id=${id}`);
    };

    return {
        registerEntity,
        updateEntity,
        getTotalEntities,
        deleteEntity,
        getEntityById,
    };
}