import { Badge, CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { OrderContext } from "../contexts/Order.context";
import { ProductCardCart } from "../components/ProductCardCart.component";
import Button from "@mui/material/Button";
import { usePostOrder } from "../hooks/usePostOrder";

export const CartPage = () => {
    const {
        orderDTO: { productsIncluded: productCart },
    } = useContext(OrderContext);

    const { loading, error, setPostOrderDto, postOrder } = usePostOrder();
    const { orderDTO, removeProductOrderDTO } = useContext(OrderContext);

    const handleClickCommand = () => {
      setPostOrderDto(orderDTO)
    }

    return (
        <Box>
            <Typography variant={"h3"} component={"div"}>
                Cart
            </Typography>
            <Typography
                variant="subtitle1"
                color="text.secondary"
                maxWidth={100}
                marginTop={2}
            >
                {productCart?.length + " products"}
            </Typography>
            <Grid container spacing={2} direction={"column"}>
                {productCart.map((product, index) => (
                  <ProductCardCart key={index} product={product}/>
                ))}
            </Grid>
            {!loading &&<Button sx={{ mt: 1.5 }} disabled={productCart.length < 1} size='small' onClick={() => {handleClickCommand()}}>
              Commander
            </Button>}
            {loading && <CircularProgress />}
            {postOrder && <Badge color={"success"}>Order posted</Badge>}
            {error && <Badge color={"error"}>Order failed</Badge>}
        </Box>
    );
};
