import { useState } from "react";
import { Order, PostOrderDTO } from "./common";
import { ORDERS_URL } from "../config/constants";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { redirect } from "react-router";

export const usePostOrder = () => {
    const [postOrderDto, setPostOrderDto] = useState<PostOrderDTO | undefined>(
        undefined
    );

    const postOrder = async (): Promise<Order> => {
        const route = ORDERS_URL;

        return axios.post(route, postOrderDto).then((res) => res.data);
    };

    const { isLoading, data, error } = useQuery<Order, AxiosError>(
        ["post_order", ORDERS_URL, postOrderDto?.clientName],
        postOrder,
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchInterval: 900000,
            enabled: typeof postOrderDto !== "undefined",
            onSuccess: () => {
                setPostOrderDto(undefined);
                return redirect(`/orders`);
            },
        }
    );

    return {
        loading: isLoading,
        postOrder: data,
        error,
        setPostOrderDto,
    };
};
