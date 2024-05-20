import { useQuery } from "react-query";

export default function saveRequestInCach(requestDescription: string, getTotalEntities: Function ) {

    const { data: entitiesCache, isFetching } = useQuery(requestDescription, async () => {
        const response = await getTotalEntities()
        return response.data
    },
        {
            staleTime: 1000 * 60,
        })

    return {
        entitiesCache,
        isFetching
    }
}

