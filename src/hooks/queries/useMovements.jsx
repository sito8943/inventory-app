// providers
import {useManager} from "../../providers/ManagerProvider";
import {useQuery} from "@tanstack/react-query";

export const MovementsQueryKeys = {
    all: {
        queryKey: ["movements"],
    },
    list: () => ({queryKey: [...MovementsQueryKeys.all.queryKey, "list"]}),
};

export function useMovementsList(props) {
    const {filters = []} = props;

    const manager = useManager();

    return useQuery({
        ...MovementsQueryKeys.list(),
        queryFn: () =>
            manager.Movements.get(
                [{deletedAt: null}, ...filters],
            ),
    });
}

export function useMovementsCommon() {
    const manager = useManager();
    return useQuery({
        ...MovementsQueryKeys.list(),
        queryFn: () =>
            manager.Movements.get({deletedAt: null}, "name as value,id")
    })
}
