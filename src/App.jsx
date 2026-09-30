import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
} from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Container,
    Button,
    Stack,
    Divider,
} from "@mui/material";

import {
    FaBook,
    FaLayerGroup,
    FaHeart,
    FaInfoCircle,
} from "react-icons/fa";

import Livros from "./pages/Livros";
import Categorias from "./pages/Categorias";
import Favoritos from "./pages/Favoritos";
import Sobre from "./pages/Sobre";

import "./index.css";


function App() {

    return (

        <BrowserRouter>

            <Box
                sx={{
                    minHeight: "100vh",

                    bgcolor:
                        "background.default",

                    display: "flex",

                    flexDirection: "column",
                }}
            >

                {/* =====================================
                    NAVBAR
                ===================================== */}

                <AppBar
                    position="sticky"

                    elevation={0}

                    sx={{
                        bgcolor:
                            "rgba(18,16,15,0.96)",

                        backdropFilter:
                            "blur(14px)",

                        borderBottom:
                            "1px solid rgba(215,168,110,0.15)",
                    }}
                >

                    <Container maxWidth="xl">

                        <Toolbar
                            disableGutters

                            sx={{
                                minHeight: 78,

                                justifyContent:
                                    "space-between",

                                gap: 3,

                                "@media (max-width:600px)":
                                {
                                    flexDirection:
                                        "column",

                                    py: 2,
                                },
                            }}
                        >

                            {/* LOGO */}

                            <Typography
                                component={NavLink}
                                to="/"

                                sx={{
                                    textDecoration:
                                        "none",

                                    color:
                                        "#F5F1E8",

                                    fontSize:
                                        "28px",

                                    fontWeight:
                                        900,

                                    letterSpacing:
                                        "-1px",

                                    display:
                                        "flex",

                                    alignItems:
                                        "center",

                                    gap: 1,
                                }}
                            >

                                <FaBook
                                    size={25}
                                    color="#D7A86E"
                                />

                                <Box
                                    component="span"
                                    sx={{
                                        color:
                                            "secondary.main",
                                    }}
                                >
                                    BOOK
                                </Box>

                                <Box
                                    component="span"
                                    sx={{
                                        color:
                                            "#F5F1E8",
                                    }}
                                >
                                    FLIX
                                </Box>

                            </Typography>


                            {/* MENU */}

                            <Stack
                                direction="row"
                                spacing={1}

                                sx={{
                                    flexWrap:
                                        "wrap",

                                    justifyContent:
                                        "center",
                                }}
                            >

                                <MenuButton
                                    to="/"
                                    icon={<FaBook />}
                                    label="Livros"
                                />

                                <MenuButton
                                    to="/categorias"
                                    icon={
                                        <FaLayerGroup />
                                    }
                                    label="Categorias"
                                />

                                <MenuButton
                                    to="/favoritos"
                                    icon={
                                        <FaHeart />
                                    }
                                    label="Favoritos"
                                />

                                <MenuButton
                                    to="/sobre"
                                    icon={
                                        <FaInfoCircle />
                                    }
                                    label="Sobre"
                                />

                            </Stack>

                        </Toolbar>

                    </Container>

                </AppBar>


                {/* =====================================
                    PÁGINAS
                ===================================== */}

                <Box
                    component="main"
                    sx={{
                        flex: 1,
                    }}
                >

                    <Routes>

                        <Route
                            path="/"
                            element={<Livros />}
                        />

                        <Route
                            path="/categorias"
                            element={
                                <Categorias />
                            }
                        />

                        <Route
                            path="/favoritos"
                            element={
                                <Favoritos />
                            }
                        />

                        <Route
                            path="/sobre"
                            element={
                                <Sobre />
                            }
                        />

                    </Routes>

                </Box>


                {/* =====================================
                    FOOTER
                ===================================== */}

                <Box
                    component="footer"

                    sx={{
                        py: 6,

                        px: 3,

                        textAlign: "center",

                        borderTop:
                            "1px solid rgba(215,168,110,0.15)",

                        background:
                            "linear-gradient(180deg, #12100F, #0D0B0A)",
                    }}
                >

                    <Typography
                        variant="h5"

                        fontWeight={900}

                        sx={{
                            display:
                                "flex",

                            alignItems:
                                "center",

                            justifyContent:
                                "center",

                            gap: 1,
                        }}
                    >

                        <FaBook
                            size={21}
                            color="#D7A86E"
                        />

                        <Box
                            component="span"
                            sx={{
                                color:
                                    "secondary.main",
                            }}
                        >
                            BOOK
                        </Box>

                        <Box
                            component="span"
                            sx={{
                                color:
                                    "#F5F1E8",
                            }}
                        >
                            FLIX
                        </Box>

                    </Typography>


                    <Typography
                        sx={{
                            color:
                                "text.secondary",

                            mt: 1,

                            mb: 3,
                        }}
                    >
                        Descubra novas histórias,
                        autores e mundos.
                    </Typography>


                    <Stack
                        direction="row"

                        justifyContent="center"

                        flexWrap="wrap"

                        gap={1}
                    >

                        <FooterLink
                            to="/"
                            label="Livros"
                        />

                        <FooterLink
                            to="/categorias"
                            label="Categorias"
                        />

                        <FooterLink
                            to="/favoritos"
                            label="Favoritos"
                        />

                        <FooterLink
                            to="/sobre"
                            label="Sobre"
                        />

                    </Stack>


                    <Divider
                        sx={{
                            maxWidth: 700,

                            mx: "auto",

                            my: 3,

                            borderColor:
                                "rgba(255,255,255,0.1)",
                        }}
                    />


                    <Typography
                        variant="caption"

                        sx={{
                            color: "#666",
                        }}
                    >
                        © 2026 BOOKFLIX —
                        Todos os direitos reservados.
                    </Typography>

                </Box>

            </Box>

        </BrowserRouter>
    );
}


/* =====================================
   BOTÃO DO MENU
===================================== */

function MenuButton({
    to,
    icon,
    label,
}) {

    return (

        <Button
            component={NavLink}
            to={to}

            startIcon={icon}

            sx={{
                color: "#BDB5AC",

                fontWeight: 700,

                borderRadius: 2,

                "&:hover": {
                    color: "#F5F1E8",

                    bgcolor:
                        "rgba(255,255,255,0.05)",
                },

                "&.active": {
                    color: "#F5F1E8",

                    bgcolor:
                        "rgba(215,168,110,0.10)",

                    "& svg": {
                        color:
                            "secondary.main",
                    },
                },
            }}
        >
            {label}
        </Button>

    );
}


/* =====================================
   LINKS DO FOOTER
===================================== */

function FooterLink({
    to,
    label,
}) {

    return (

        <Button
            component={NavLink}
            to={to}

            size="small"

            sx={{
                color: "#888",

                "&:hover": {
                    color:
                        "secondary.main",

                    bgcolor:
                        "transparent",
                },

                "&.active": {
                    color:
                        "secondary.main",
                },
            }}
        >
            {label}
        </Button>

    );
}


export default App;