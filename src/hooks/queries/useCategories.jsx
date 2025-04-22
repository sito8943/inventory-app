// providers
import {useManager} from "../../providers/ManagerProvider";
import {useQuery} from "@tanstack/react-query";

export const CategoriesQueryKeys = {
    all: {
        queryKey: ["categories"],
    },
    list: () => ({queryKey: [...CategoriesQueryKeys.all.queryKey, "list"]}),
    details: (id) => ({queryKey: [...CategoriesQueryKeys.all.queryKey, id]}),
};

export function useCategoriesList(props) {
    const {filters = []} = props;

    const manager = useManager();

    return useQuery({
        ...CategoriesQueryKeys.list(),
        queryFn: () =>
            manager.Categories.get(
                [{deletedAt: null}, ...filters],
            ),
    });
}

export function useCategoriesCommon() {
    const manager = useManager();
    return useQuery({
        ...CategoriesQueryKeys.list(),
        queryFn: () =>
            manager.Categories.get({deletedAt: null}, "name as value,id")
    })
}


