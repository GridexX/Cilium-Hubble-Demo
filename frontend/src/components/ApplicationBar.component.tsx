import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { AppBar } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function ApplicationBar() {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "#801A80" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <ShoppingBag />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 0.05 }}
                        >
                            <Typography variant="h5">
                                <Link to={"/"}>PolyShop</Link>
                            </Typography>
                        </Typography>
                        <Typography variant="h6" component="div" margin={2}>
                            <Link to={"/orders"}>Orders</Link>
                        </Typography>
                        <Typography variant="h6" component="div" margin={2}>
                            <Link to={"/cart"}>Cart</Link>
                        </Typography>
                        {/* <Button color="inherit">Login</Button> */}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
