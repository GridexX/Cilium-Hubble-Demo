import axios, { AxiosError } from "axios";
import { DELAY_REFETCH_MS, ORDERS_URL } from "../config/constants";
import { useQuery, useQueryClient } from "react-query";
import { Order, OrderDto } from "./common";
import { useState } from "react";

type ReturnObject = {
    loading: boolean;
    orders?: Order[];
    error: AxiosError | null;
};

export const useGetOrders = (): ReturnObject => {
    const getOrders = async (): Promise<OrderDto[]> => {
        const route = ORDERS_URL;
        const content = await axios.get(route).then((res) => {
            return res.data;
        });
        return content;
    };

    const [orders, setOrders] = useState<Order[] | undefined>(undefined);

    const queryClient = useQueryClient();

    const { isLoading, error } = useQuery<OrderDto[], AxiosError>(
        ["get_orders", ORDERS_URL],
        getOrders,
        {
            enabled: ORDERS_URL.length > 0,
            onSuccess: (data) => {
                setTimeout(() => {
                    queryClient.invalidateQueries({
                        queryKey: ["get_orders", ORDERS_URL],
                    });
                }, DELAY_REFETCH_MS);
                setOrders(
                    data.map((order) => {
                        return {
                            ...order,
                            date: new Date(order.date),
                        };
                    })
                );
            },
        }
    );

    return {
        loading: isLoading,
        orders: orders,
        error,
    };
};
