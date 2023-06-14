import { Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import { Order } from "../hooks/common";
import OrderProgressComponent from "./OrderProgress.component";

type OrderCardProps = {
    order?: Order;
};

export const OrderCard = ({ order }: OrderCardProps) => {
    const istOrderUndefined = typeof order === "undefined";

    // Use the reduce function to calculate the total quantity of the order by adding the quantity of each product
    const totalQuantity = order?.productsIncluded.reduce(
        (acc, product) => acc + product.quantity,
        0
    );
    const totalPrice = order?.productsIncluded.reduce(
        (acc, product) => acc + product.quantity * product.product.price,
        0
    );




    return (
        <Grid item xs={10}>
            <Card>
                <CardContent>
                    <Grid
                        container
                        spacing={2}
                        direction={"row"}
                        justifyContent="space-between"
                        alignContent={"center"}
                    >
                        <Grid item>
                            <Typography
                                variant="h5"
                                component="div"
                                maxWidth={200}
                            >
                                {istOrderUndefined ? (
                                    <Skeleton />
                                ) : (
                                    `Order`
                                )}
                            </Typography>
                        
                            <Typography
                                variant="caption"
                                component="div"
                                color="text.secondary"
                                maxWidth={400}
                                minWidth={200}
                            >
                                {istOrderUndefined ? (
                                    <Skeleton />
                                ) : (
                                    `#${order?.id}`
                                )}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                maxWidth={200}
                                minWidth={200}
                            >
                                {istOrderUndefined ? (
                                    <Skeleton />
                                ) : (
                                    `Date: ${order?.date.toDateString()}`
                                )}
                            </Typography>
                            </Grid>
                            <Grid item>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                maxWidth={200}
                            >
                                {istOrderUndefined ? (
                                    <Skeleton />
                                ) : (
                                    `Total produits: ${totalQuantity}`
                                )}
                            </Typography>                           
                            <Typography
                                variant="subtitle1"
                                component="div"
                                maxWidth={200}
                            >
                                {istOrderUndefined ? (
                                    <Skeleton />
                                ) : (
                                    `Total : ${totalPrice}€`
                                )}
                            </Typography>                           
                        </Grid>
                    </Grid>
                    {istOrderUndefined ? (
                        <Skeleton width={400} height={50} />
                    ) : (
                        <OrderProgressComponent orderStatus={order?.status} />
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
};
