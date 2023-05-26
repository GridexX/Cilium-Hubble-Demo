import {
    Box,
    Button,
    Chip,
    SelectChangeEvent,
    Skeleton,
    Typography,
    Select,
    InputLabel,
    MenuItem,
    Grid,
    CircularProgress,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useGetProduct } from "../hooks/useGetProduct.hook";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { WarningOutlined } from "@mui/icons-material";
import { OrderContext } from "../contexts/Order.context";

export const ProductDetailPage = () => {
    //Retrieve the product Id from the URL after the /product/ path
    const path = useLocation().pathname;

    const [productId, setProductId] = useState<string>("");

    useEffect(() => {
        const setProduct = (id: string) => {
            setProductId(id);
        };
        if (path && path.length > 0) {
            const id = path.split("/")[2];
            setProduct(id);
        }
    }, [path]);

    const { product, error, loading } = useGetProduct(productId);

    const isProductUndefined = product === undefined;

    const [amount, setAmount] = useState<string>("");

    const { addProductOrderDTO } = useContext(OrderContext);

    const handleChangeAmount = (event: SelectChangeEvent) => {
        // Parse String to Number
        setAmount(event.target.value);

    };

    const handleAddToOrder = () => {
        const quantity = parseInt(amount);
        console.log(quantity)
        console.log(product)
        if( !isNaN(quantity) && product !== undefined) {
            addProductOrderDTO({
                quantity,
                productId: product.id
            })
        }
    }

    return (
        <Box>
            {
              error && <Typography variant={"caption"} component={"div"} color="error">
                {error.message} {error.name}
                </Typography>
            }
            <Typography variant={"h3"} component={"div"} maxWidth={400}>
                {isProductUndefined ? <Skeleton /> : product?.name}
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary" maxWidth={100}>
                {isProductUndefined ? <Skeleton /> : product?.price + "€"}
            </Typography>
            <Typography variant={"h4"} marginTop={4}>
                Description
            </Typography>
            <Typography variant="body2" sx={{ mb: 3.5 }}>
                {isProductUndefined ? <Skeleton /> : product?.description}
            </Typography>

            <Grid direction={"column"} container spacing={2}>
                <Grid item>
                    {isProductUndefined && <Skeleton width={100} height={30} />}
                    {!isProductUndefined && product?.quantity < 1 && (
                        <Chip
                            icon={<WarningOutlined />}
                            label="En rupture de stock"
                            color="error"
                        />
                    )}
                    {!isProductUndefined && product?.quantity > 0 && (
                        <Chip label="En stock" color="success" />
                    )}
                </Grid>
                <Grid item>
                    <FormControl sx={{ width: 100 }} variant={"standard"}>
                        <InputLabel id="demo-simple-select-label">
                            Quantité
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={amount}
                            label="Quantité"
                            onChange={handleChangeAmount}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    {!isProductUndefined && (
                        <>

                            <Button
                                size="small"
                                color="primary"
                                sx={{ marginLeft: 2 }}
                                onClick={() => handleAddToOrder()}
                            >
                                Add to cart
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                                sx={{ marginLeft: 2 }}
                                href={`/product/edit/${product.id}`}
                            >
                                Edit
                            </Button>
                        </>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};
