import axios, { AxiosError } from "axios";
import { CATALOG_URL, DELAY_REFETCH_MS } from "../config/constants";
import { useQuery, useQueryClient } from "react-query";
import { ProductCatalog } from "./common";

export const useGetCatalog = () => {
    const getCatalog = async (): Promise<ProductCatalog[]> => {
        const route = CATALOG_URL;
        const content = await axios.get(route).then((res) => {
            return res.data;
        });
        return content;
    };

    const queryClient = useQueryClient();

    const { isLoading, data, error } = useQuery<ProductCatalog[], AxiosError>(
        ["catalog", CATALOG_URL],
        getCatalog,
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchInterval: 900000,
            enabled: (CATALOG_URL?.length ?? 0) > 0,
            onSuccess: () => {
                setTimeout(() => {
                    queryClient.invalidateQueries({
                        queryKey: ["catalog", CATALOG_URL],
                    });
                }, DELAY_REFETCH_MS);
            },
        }
    );

    return {
        loading: isLoading,
        products: data,
        error,
    };
};
