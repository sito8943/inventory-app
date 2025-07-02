import {useQuery, UseQueryResult} from "@tanstack/react-query";

// providers
import {useCache, useManager} from "providers";

// types
import {UseFetchPropsType} from "./types.ts";
import {CategoryDto, CommonCategoryDto, FilterCategoryDto, QueryResult,} from "lib";
import {Tables} from "../../db/types";

export const CategoriesQueryKeys = {
    all: () => ({
        queryKey: ["categories"],
    }),
    list: () => ({queryKey: [...CategoriesQueryKeys.all().queryKey, "list"]}),
    common: () => ({
        queryKey: [...CategoriesQueryKeys.all().queryKey, "common"],
    }),
};

export function useCategoriesList(
    props: UseFetchPropsType<FilterCategoryDto>,
): UseQueryResult<QueryResult<CategoryDto>> {
    const {filters = {deleted: false}} = props;

    const manager = useManager();
    const {loadCache, updateCache} = useCache();

    return useQuery({
        ...CategoriesQueryKeys.list(),
        queryFn: async () => {
            try {
                const result = await manager.Categories.get(filters);
                updateCache(Tables.Categories, result.items);
                return result;
            } catch (error) {
                console.warn("API failed, loading categories from cache", error);
                const cached = await loadCache(Tables.Categories);
                if (!cached || !Array.isArray(cached)) throw new Error("No cached categories available");
                return {items: cached, total: cached?.length};
            }
        },
    });
}

export function useCategoriesCommon(): UseQueryResult<CommonCategoryDto[]> {
    const manager = useManager();
    const {loadCache, updateCache} = useCache();

    return useQuery({
        ...CategoriesQueryKeys.common(),
        queryFn: async () => {
            try {
                const result = await manager.Categories.commonGet({deleted: false});
                updateCache(Tables.Categories, result.items);
                return result;
            } catch (error) {
                console.warn("API failed, loading categories from cache", error);
                const cached = await loadCache(Tables.Categories) as CommonCategoryDto[];
                if (!cached || !Array.isArray(cached)) throw new Error("No cached categories available");
                return cached.map(({id, name}) => ({id, name}));
            }
        },
    });
}
