import {
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { ProductOrderDTO } from "../hooks/common";
import { Link } from "react-router-dom";

type Props = {
    product: ProductOrderDTO;
};

export const ProductCardCart = ({ product }: Props) => {
    return (
        <Grid item xs={4}>
            <Card>
                <CardContent>
                    <Link to={"/product/" + product.productId}>
                        <Typography
                            color="black"
                            variant="h5"
                            component="div"
                            maxWidth={200}
                        >
                            {product.productId}
                        </Typography>
                    </Link>
                    <Typography
                        sx={{ mb: 1.5 }}
                        color="text.secondary"
                        maxWidth={100}
                    >
                        {"Quantité : "+product.quantity}
                    </Typography>
                </CardContent>
                <CardActions >
                    <Button size="small" href={`/product/${product.productId}`}>
                        Voir plus
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};
