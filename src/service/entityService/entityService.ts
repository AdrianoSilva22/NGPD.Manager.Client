
import { apiService } from "../apiService/apiService"

export const EntityService = <T>(url: string) => {

    const registerEntity = (entity: T) => {
        return apiService.post<T>(`${url}`, entity)
    }

    const updateEntity = (entity: T) => {
        return apiService.put<T>(`${url}`, entity)
    }

    const updateAlocationEntity = async (squadId: string, mentorId: string) => {
        const updateAlocationUrl = `${url}`; 

        const entity = {
            id: squadId,
            email: mentorId
        };

        try {
            return await apiService.put<T>(updateAlocationUrl, entity);
        } catch (error) {
            throw new Error(`Erro ao atualizar alocação: ${error}`);
        }
    };

    const getTotalEntities = () => {
        return apiService.get(`${url}`)
    }

    const getEntityById = (id: string) => {
        return apiService.get(`${url}/${id}`)
    }

    const deleteEntity = (id: string) => {
        return apiService.delete(`${url}/${id}`)
    }

    return {
        registerEntity,
        updateEntity,
        getTotalEntities,
        deleteEntity,
        getEntityById,
        updateAlocationEntity
    }
}