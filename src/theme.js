import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",

        primary: {
            main: "#8D6E63",
        },

        secondary: {
            main: "#D7A86E",
        },

        background: {
            default: "#12100F",
            paper: "#1E1917",
        },

        text: {
            primary: "#F5F1E8",
            secondary: "#BDB5AC",
        },
    },

    typography: {
        fontFamily: [
            "Roboto",
            "Arial",
            "Helvetica",
            "sans-serif",
        ].join(","),

        h1: {
            fontWeight: 900,
        },

        h2: {
            fontWeight: 900,
        },

        h3: {
            fontWeight: 800,
        },

        h4: {
            fontWeight: 800,
        },

        button: {
            fontWeight: 700,
        },
    },

    shape: {
        borderRadius: 14,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 10,
                    padding: "10px 18px",
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage:
                        "linear-gradient(145deg, #26201D, #191513)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",

                    "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow:
                            "0 12px 30px rgba(0, 0, 0, 0.35)",
                    },
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage:
                        "linear-gradient(90deg, #1A1513, #251D19)",
                    boxShadow:
                        "0 2px 15px rgba(0, 0, 0, 0.35)",
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                variant: "outlined",
            },

            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 10,
                    },
                },
            },
        },
    },
});

export default theme;